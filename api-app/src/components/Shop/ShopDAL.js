import * as dbUtil from "../../util/databaseUtil";
import uuidv4 from "uuid/v4";

export const getShopInfo = async (id, userId) => {
  const sql = "SELECT * from shop WHERE id = ?";
  const totalProductSql = 'SELECT id from item where shop_id = ?';
  const totalUserFollowSql = 'SELECT shop_id from follow_shop where shop_id = ?';
  const totalProduct = await dbUtil.query(totalProductSql, [id]);
  const totalUserFollow = await dbUtil.query(totalUserFollowSql, [id]);

  
  const shop = await dbUtil.queryOne(sql, [id]);
  shop['total_item'] = totalProduct.length;
  shop['total_follow'] = totalUserFollow.length;
  if(userId){
    const sql = 'SELECT shop_id from follow_shop where shop_id = ? AND user_id = ?';
    const res = await dbUtil.query(sql, [id, userId]);
    if(res.length > 0) shop['followed'] = true;
  }
  return shop;
};


export const followShop = async (userId, shopId) => {
    const sql = 'INSERT IGNORE INTO follow_shop(shop_id, user_id) VALUES (?, ?)';
    await dbUtil.execute(sql, [shopId, userId]);
}

export const unfollowShop = async (userId, shopId) => {
    const sql = 'DELETE FROM follow_shop WHERE shop_id = ? and user_id = ?';
    await dbUtil.execute(sql, [shopId, userId]);
}

export const reviewShop = async (body, userId) => {
  const transaction = await dbUtil.beginTransaction();
  try {
    const checkRateSql = 'SELECT * from review_shop WHERE user_id = ? AND shop_id = ? ';
    const checkRate = await dbUtil.query(checkRateSql, [userId, body.id]);
    console.log(checkRate);
    if(checkRate.length > 0) return Promise.reject("Bạn đã đánh giá shop này!");
    
    const insertSql = 'INSERT INTO review_shop (shop_id, user_id, rate, content) VALUES (?,?,?,?)';
    await dbUtil.execute(insertSql, [body.id, userId, body.rate, body.content], transaction);

    const itemRatingSql = 'SELECT rate from review_shop where shop_id = ?';
    const itemRating = await dbUtil.execute(itemRatingSql, [body.id], transaction);
    console.log('item rating', itemRating);
    let totalScore = 0;
    if(itemRating){
      itemRating.forEach(i => totalScore += i.rate)
    };
    const rate = totalScore/ itemRating.length;

    const updateItemSql = 'UPDATE shop set total_rate = ? where id =?';
    await dbUtil.execute(updateItemSql, [rate, body.id], transaction);
    await dbUtil.commitTransaction(transaction);
  } catch(e){
    console.log(e);
    dbUtil.rollbackTransaction(transaction);
    return e;
  }
}