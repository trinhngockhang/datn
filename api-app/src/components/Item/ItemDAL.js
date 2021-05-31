import * as dbUtil from "../../util/databaseUtil";

export const getItemDetail = async (id) => {
  const sql = `SELECT V.name, IMV.value, IM.price, I.name as itemName 
    from item I
    INNER JOIN item_model IM ON I.id = IM.item_id
    LEFT JOIN item_model_varian IMV ON  IM.id = IMV.item_model_id
    LEFT JOIN varian V ON IMV.varian_id = V.id 
    WHERE
    I.id = ?`;
  const res = await dbUtil.query(sql, [id]);
  const imageSql = "SELECT * FROM image where item_id = ?";
  const images = await dbUtil.query(imageSql, [id]);
  const item = res[0];
  const varians = {};
  res.forEach((i) => {
    if (!varians[i.name]) {
      varians[i.name] = [i.value];
    } else {
      if (!varians[i.name].includes(i.value)) varians[i.name].push(i.value);
    }
  });
  const final = [];
  for (const key in varians) {
    if (Object.hasOwnProperty.call(varians, key)) {
      final.push({ name: key, options: varians[key] });
    }
  }
  return {
    ...item,
    name: item.itemName,
    varians: final,
    thumbImage: images.map((i) => i.url),
    images: images.map((i) => i.url),
    price: item.price ? item.price : res[0]?.price ? res[0].price : 0,
  };
};

export const getItem = async ({ limit, sort, filters }) => {
  const params = [];
  let sql = `SELECT * FROM item I
    WHERE 1 = 1`;
  let countSql = `SELECT count(I.id) from item I
    WHERE 1 = 1
    `;

  let conditionSql = "";

  if (filters) {
    if (filters.category) {
      console.log(filters.category)
      conditionSql += " AND I.category_id = ?";
      params.push(filters.category);
    }
    if (filters.shop_id) {
      conditionSql += " AND I.shop_id = ?";
      params.push(filters.shop_id);
    }
  }
  sql += conditionSql;
  countSql += conditionSql;
  const countParams = [...params];
  // pagination

  const [result, countItem] = await Promise.all([
    dbUtil.query(sql, params),
    dbUtil.query(countSql, countParams),
  ]);

  const finalResult = await Promise.all(
    result.map((item) => {
      return new Promise(async (resole, reject) => {
        const sql = `SELECT V.name, IMV.value, IM.price 
          
          from item I
          INNER JOIN item_model IM ON I.id = IM.item_id
          LEFT JOIN item_model_varian IMV ON  IM.id = IMV.item_model_id
          LEFT JOIN varian V ON IMV.varian_id = V.id
          WHERE
          I.id = ?
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
          thumbImage: [item.default_image, item.default_image],
          images: [item.default_image],
          price: item.price ? item.price : res[0]?.price ? res[0].price : 0,
        });
      });
    })
  );
  return {
    data: finalResult,
    total: countItem[0].count,
  };
};
