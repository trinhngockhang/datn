import * as dbUtil from '../../util/databaseUtil';

export const getShop = async () => {
  const sql = 'SELECT * FROM shop';
  const shops = await dbUtil.query(sql);
  for(let i = 0; i < shops.length; i++){
    const orderSql = 'SELECT COUNT(id) as count FROM `order` where shop_id = ?';
    const res = await dbUtil.queryOne(orderSql, [shops[i].id]);
    shops[i].total_sale = res.count;
  }
  console.log(shops);
  return shops;
};


export const updateAds = async (id) => {
  const sql = 'SELECT * from shop where shop.id =?';
  const shop = await dbUtil.queryOne(sql, [id]);
  let newStatus = 1;
  if(shop.advertise == 1) newStatus = 2;
  const newSql = 'UPDATE shop set advertise = ? where id = ?';
  await dbUtil.execute(newSql, [newStatus, id]); 
}