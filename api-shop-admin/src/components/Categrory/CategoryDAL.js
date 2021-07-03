import * as dbUtil from '../../util/databaseUtil';

export const getCategory = async () => {
  const sql = 'SELECT * FROM category where active= 1';
  const camps = await dbUtil.query(sql);
  return camps;
};

export const getListSubCategory = async (id) => {
  const sql = 'SELECT * FROM sub_category where category_id = ?';
  const camps = await dbUtil.query(sql, [id]);
  return camps;
};
