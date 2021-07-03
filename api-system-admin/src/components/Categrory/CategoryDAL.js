import * as dbUtil from '../../util/databaseUtil';
import redisUtil from '../../util/redisUtil';

export const getCategory = async () => {
  const sql = 'SELECT * FROM category';
  const camps = await dbUtil.query(sql);
  return camps;
};

export const getListSubCategory = async (id) => {
  const sql = 'SELECT * FROM sub_category where category_id = ?';
  const camps = await dbUtil.query(sql, [id]);
  return camps;
};

export const setStatusCategory = async (id) => {
  const sql = 'SELECT * from category where id = ?';
  const category = await dbUtil.queryOne(sql, [id]);
  let newCategoryStatus = 2;
  if(category.active == 2) newCategoryStatus = 1;

  const newSql = 'UPDATE category set active = ? where id = ?';
  await redisUtil.delAsync('CATEGORY');
  await dbUtil.execute(newSql, [newCategoryStatus, id]);
}

export const createCategory = async (body) => {
  const sub = body.sub.split(',').filter(a => a).map(x => x.trim());
  const sql = 'INSERT INTO category(name, image_url) VALUES (?,?)';
  const category = await dbUtil.execute(sql, [body.name, body.image[0]]);
  const id = category.insertId;
  console.log(id);
  const arr = [];

  sub.forEach(element => {
    arr.push([id, element])
  });

  const subSql = 'INSERT INTO sub_category(category_id, name) VALUES ?';
  await dbUtil.execute(subSql, [arr]);
  await redisUtil.delAsync('CATEGORY');
}

export const updateCategory = async (id, body) => {
  console.log(body);
  if(!body.name && !body.image) return;

  if(body.name){
    const sql = 'UPDATE category set name = ? where id = ?';
    await dbUtil.execute(sql, [body.name, id]);
  }

  if(body.image){
    const sql = 'UPDATE category set image_url = ? where id = ?';
    await dbUtil.execute(sql, [body.image, id]);
  }
  await redisUtil.delAsync('CATEGORY');
}