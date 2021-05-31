import * as dbUtil from '../../util/databaseUtil';

export const getCategory = async () => {
  const sql = 'SELECT * FROM category';
  const camps = await dbUtil.query(sql);
  return camps;
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
