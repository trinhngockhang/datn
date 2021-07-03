import * as dbUtil from '../../util/databaseUtil';
import redisUtil from '../../util/redisUtil';

export const getCategory = async () => {
  const campInRedis = await redisUtil.getAsync('CATEGORY');
  console.log('CAM', campInRedis);
  if(campInRedis) return JSON.parse(campInRedis);
  else {
    const sql = 'SELECT * FROM category where active= 1';
    const camps = await dbUtil.query(sql);
    await redisUtil.setAsync('CATEGORY', JSON.stringify(camps));
    return camps;
  }
  
};

export const getPopularCategory = async () => {
  const sql = 'SELECT * FROM category where popular = 1';
  const camps = await dbUtil.query(sql);
  return camps;
};

export const getShopCategory = async (shopId) => {
  const sql = `SELECT DISTINCT C.* FROM category C, item I
  WHERE C.id IN (
    SELECT A.category_id from item A where A.shop_id = ?
  )
  `;
  const category = await dbUtil.query(sql, [shopId]);
  console.log(category);
  return category;
};
