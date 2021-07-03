import * as dbUtil from "../../util/databaseUtil";
import { capitalize } from "lodash";
import uuidv4 from "uuid/v4";
var q = "items";

var open = require("amqplib").connect("amqp://localhost");

export const getMyName = async (id) => {
    const sql = 'SELECt name from shop where id = ?';
    const a = await dbUtil.queryOne(sql, [id]);
    return a.name;
}
export const getItem = async ({ limit, sorts, filters }, shop_id) => {
  const params = [shop_id];
  let sql = `SELECT item.*, C.name as categoryName FROM item, category C
  WHERE shop_id = ?
  AND item.category_id = C.id`;
  let countSql = `SELECT count(I.id) from item I
  WHERE shop_id = ?
  `;

  const countParams = [...params];
  // pagination

  const [result, countItem] = await Promise.all([
    dbUtil.query(sql, params),
    dbUtil.query(countSql, countParams),
  ]);

  const finalResult = await Promise.all(
    result.map((item) => {
      return new Promise(async (resole, reject) => {
        const sql = `SELECT V.name, IMV.value, C.name as categoryName from varian V, item_model IM, item_model_varian IMV, item I, category C
        WHERE I.id = IM.item_id
        AND IM.id = IMV.item_model_id
        AND C.id = i.category_id
        AND IMV.varian_id = V.id
        AND I.id = ?
        `;
        const res = await dbUtil.query(sql, [item.id]);
        const varians = {};
        res.forEach((i) => {
          if (!varians[i.name]) {
            varians[i.name] = [i.value];
          } else {
            if (!varians[i.name].includes(i.value))
              varians[i.name].push(i.value);
          }
        });
        const final = [];
        for (const key in varians) {
          if (Object.hasOwnProperty.call(varians, key)) {
            final.push({ name: key, options: varians[key] });
          }
        }
        resole({
          ...item,
          varians: final,
        });
      });
    })
  );

  console.log(finalResult);
  return {
    data: finalResult,
    total: countItem[0].count,
  };
};

export const createItem = async (item, shop_id) => {
  console.log(item);
  const transaction = await dbUtil.beginTransaction();
  try {
    let varianObj = {};
    const itemRes = await createItemTable(item, shop_id);
    await createImage(item.images, itemRes);
    if (item.varians && item.varians.length > 0) {
      const varianArr = await Promise.all(
        item.varians.map((varian) => createVarian(varian.varianname))
      );

      varianArr.forEach((element) => {
        console.log(element);
        varianObj[element.name] = element.id;
      });
      await Promise.all(
        item.varianObj.map((varian) =>
          createItemModel(varian, itemRes, varianObj)
        )
      );
    } else {
      const id = uuidv4();
      const itemModelSql =
        "INSERT INTO item_model(id, sku, inventory, price, item_id) VALUES(?,?,?,?, ?)";
      const res = await dbUtil.execute(itemModelSql, [
        id,
        item.id,
        item.inventory,
        item.defaultPrice,
        itemRes,
      ]);
    }
    // import to RABITMQ
    const categorySql = ' SELECT name from category where id = ?';
    const cateRes = await dbUtil.queryOne(categorySql, [item.category]);
    const categoryName = cateRes.name;

    const shopSql = ' SELECT name from shop where id = ?';
    const shopRes = await dbUtil.queryOne(shopSql, [shop_id]);
    const shopName = shopRes.name;


    open
      .then(function (conn) {
        return conn.createChannel();
      })
      .then(function (ch) {
        return ch.assertQueue(q).then(function (ok) {
          return ch.sendToQueue(q, Buffer.from(JSON.stringify({...item, categoryName: categoryName, shopName, shop_id, id: itemRes })));
        });
      })
      .catch(console.warn);

    await dbUtil.commitTransaction(transaction);
  } catch (e) {
    console.log(e);
    dbUtil.rollbackTransaction(transaction);
  }
};

const createImage = async (images, item_id) => {
  const arr = images.map((i) => {
    return [i, item_id];
  });
  const sql = "INSERT INTO image(url, item_id) VALUES ?";
  const res = await dbUtil.execute(sql, [arr]);
  console.log(res);
};

const createItemModel = async (varianObj, item_id, varianList) => {
  const varianNameArr = Object.keys(varianList);
  const keys = Object.keys(varianObj);
  const id = uuidv4();
  const itemModelSql =
    "INSERT INTO item_model(id, sku, inventory, price, item_id) VALUES(?,?,?,?, ?)";
  const res = await dbUtil.execute(itemModelSql, [
    id,
    varianObj.sku,
    varianObj.inventory,
    varianObj.price,
    item_id,
  ]);
  const varianItemModel = [];
  for (let i = 0; i < keys.length; i++) {
    if (varianNameArr.includes(capitalize(keys[i]))) {
      varianItemModel.push([
        id,
        varianList[capitalize(keys[i])],
        varianObj[keys[i]],
      ]);
    }
  }
  console.log(varianItemModel);

  const insertItemModelVarian =
    "INSERT INTO item_model_varian(item_model_id, varian_id, value) VALUES ?";

  await dbUtil.execute(insertItemModelVarian, [varianItemModel]);
};

const createItemTable = async (item, shop_id) => {
  const id = uuidv4();
  const sql =
    "INSERT INTO item(id, name, shop_id, sku, default_image, category_id, sub_category_id) VALUES(?, ?,?,?, ?, ?, ?)";
  const defaultImg =
    item.images && item.images.length > 0 ? item.images[0] : null;
  const itemRes = await dbUtil.execute(sql, [
    id,
    item.name,
    shop_id,
    item.id,
    defaultImg,
    item.category,
    item.sub_category_id,
  ]);
  console.log(itemRes);
  return id;
};

const createVarian = async (name) => {
  const finalName = capitalize(name);
  const sql = "SELECT * from varian where name = ?";
  const res = await dbUtil.queryOne(sql, finalName);
  if (res) {
    console.log(res);
    return { id: res.id, name: finalName };
  } else {
    const createSql = "INSERT INTO varian(name) values(?)";
    const res = await dbUtil.execute(createSql, finalName);
    return { id: res.insertId, name: finalName };
  }
};


export const updateProfile = async (body, id) => {
    console.log(body);
    const { name } = body;
    const sql = 'UPDATE shop set name = ? where id = ?';
    await dbUtil.execute(sql, [name, id]);
}

export const updateAvatar = async (body, id) => {
    console.log(body);
    const { name } = body;
    const sql = 'UPDATE shop set image = ? where id = ?';
    await dbUtil.execute(sql, [name, id]);
}

export const updateAdvertise = async (body, id) => {
    console.log(body);
    const { name } = body;
    const sql = 'UPDATE shop set image_advertise = ? where id = ?';
    await dbUtil.execute(sql, [name, id]);
}

export const updateItem = async (body) => {
    const sql = 'UPDATE item set name =?, description = ?, short_description =? WHERE id = ?';
    await dbUtil.execute(sql, [body.name, body.description, body.short_description, body.id]);
}