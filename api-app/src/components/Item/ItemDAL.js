import * as dbUtil from "../../util/databaseUtil";

export const getItemModelByVarian = async (body) => {
  try {
    const { varians, id } = body;
    const params = [];
    let queryVarian = '';
    const keys = Object.keys(varians);
    keys.forEach((key, index) => {
      if(index > 0) queryVarian += ' OR ';
      queryVarian += ' (IMV.varian_id = ? AND IMV.value = ?) ';
      params.push(key);
      params.push(varians[key]);
    })
    let sql = `SELECT IMV.* from item_model_varian IMV
    WHERE 
    (${queryVarian})
    AND IMV.item_model_id IN (
      SELECT id FROM item_model where item_id = ?
    )`;
    params.push(id);
    const res = await dbUtil.query(sql, params);
    const varianIdsObj = {};
    let finalId = '';
    res.forEach((i) => {
      if (!varianIdsObj[i.item_model_id]) {
        varianIdsObj[i.item_model_id] = [i.value];
      } else {
        if (!varianIdsObj[i.item_model_id].includes(i.value)) varianIdsObj[i.item_model_id].push(i.value);
        if(varianIdsObj[i.item_model_id].length == keys.length) finalId = i.item_model_id;
      }
    });
    if(res.length == 1) finalId = res[0].item_model_id;
    console.log(finalId);
    const itemModelSql = 'SELECT * from item_model WHERE id = ?';
    const itemModel = await dbUtil.queryOne(itemModelSql, [finalId]);
    console.log(itemModel);
    return itemModel;
  } catch(e){
    console.log(e);
  }
  
};

export const getItemDetail = async (id) => {
  const sql = `SELECT V.name, I.id, I.short_description, I.description, V.id as varian_id, IMV.value, IM.price, I.name as itemName, I.shop_id
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
  const varianIdsObj = {};
  if(res.length > 1) 
  res.forEach((i) => {
    varianIdsObj[i.name] = i.varian_id;
    if (!varians[i.name]) {
      varians[i.name] = [i.value];
    } else {
      if (!varians[i.name].includes(i.value)) varians[i.name].push(i.value);
    }
  });
  const final = [];
  for (const key in varians) {
    if (Object.hasOwnProperty.call(varians, key)) {
      final.push({ name: key, options: varians[key], id: varianIdsObj[key] });
    }
  }
  if(final.length == 0){
    const itemModelSql = 'SELECT id from item_model where item_id = ?';
    const itemModel = await dbUtil.queryOne(itemModelSql, [id]);
    item['itemModelId'] = itemModel.id;
  }
  const reviews = await getItemReview(id);
  return {
    ...item,
    name: item.itemName,
    reviews,
    varians: final,
    thumbImage: images.map((i) => i.url),
    images: images.map((i) => i.url),
    price: item.price ? item.price : res[0]?.price ? res[0].price : 0,
  };
};

export const getItem = async ({ limit, sort, filters }, userId) => {
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
      if(!filters.id_exist){
        conditionSql += " AND I.shop_id = ?";
        params.push(filters.shop_id);
      }
      
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

export const reviewItem = async (body, userId) => {
  const transaction = await dbUtil.beginTransaction();
  try {
    const checkRateSql = 'SELECT * from review_item WHERE user_id = ? AND item_id = ? ';
    const checkRate = await dbUtil.query(checkRateSql, [userId, body.id]);
    console.log(checkRate);
    if(checkRate.length > 0) return Promise.reject("Bạn đã đánh giá sản phẩm này!");
    
    const insertSql = 'INSERT INTO review_item(item_id, user_id, rate, content) VALUES (?,?,?,?)';
    await dbUtil.execute(insertSql, [body.id, userId, body.rate, body.content], transaction);

    const itemRatingSql = 'SELECT rate from review_item where item_id = ?';
    const itemRating = await dbUtil.execute(itemRatingSql, [body.id], transaction);
    console.log('item rating', itemRating);
    let totalScore = 0;
    if(itemRating){
      itemRating.forEach(i => totalScore += i.rate)
    };
    const rate = totalScore/ itemRating.length;

    const updateItemSql = 'UPDATE item set total_rate = ? where id =?';
    await dbUtil.execute(updateItemSql, [rate, body.id], transaction);
    await dbUtil.commitTransaction(transaction);
  } catch(e){
    console.log(e);
    dbUtil.rollbackTransaction(transaction);
    return e;
  }
}

export const getItemReview = async (id) => {
  const sql = 'SELECT *, u.name, u.avatar FROM review_item RV, user u where item_id = ? AND RV.user_id = u.id ';
  const reviews = await dbUtil.query(sql, [id]);
  return reviews;
}