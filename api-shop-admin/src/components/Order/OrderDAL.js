import * as dbUtil from "../../util/databaseUtil";
import { capitalize } from "lodash";
import uuidv4 from "uuid/v4";

export const getOrder = async ({ limit, sorts, filters }, shop_id) => {
  const params = [shop_id];
  let sql =
    "SELECT O.*, u.name as user_name from `order` O, user U  WHERE shop_id = ? AND U.id = O.user_id";
  let countSql = "SELECT count(O.id) from `order` O WHERE shop_id = ?";

  const countParams = [...params];
  // pagination

  const [result, countItem] = await Promise.all([
    dbUtil.query(sql, params),
    dbUtil.query(countSql, countParams),
  ]);
  for (const order of result) {
    const sql =
      "SELECT IM.*, I.default_image, I.short_description, OI.quantity as number_item, I.name from item_model IM, order_item OI, item I, `order` o where o.id = OI.order_id AND OI.item_model_id = IM.id AND I.id = IM.item_id AND o.id = ?";
    const items = await dbUtil.query(sql, [order.id]);
    if (items)
      for (const item of items) {
        const sql =
          "SELECT value from item_model_varian where item_model_id = ?";
        const varian = await dbUtil.query(sql, [item.id]);
        if (varian && varian.length > 0) {
          let varianName = " (" + varian.map((v) => v.value).join(", ") + ")";
          item.name = item.name + varianName;
        }
      }
    order["products"] = items;
  }
  return {
    data: result,
    total: countItem[0].count,
  };
};

export const updateOrder = async ({ id }) => {
  const orderSql = "SELECT * from `order` where id = ?";
  const order = await dbUtil.queryOne(orderSql, [id]);
  let newStatus = 1;
  console.log(order.status);
  if (order.status == 1) newStatus = 2;
  else if (order.status == 2) newStatus = 3;
  else newStatus = 3;

  const sql = "UPDATE `order` SET status = ? where id =?";
  await dbUtil.execute(sql, [newStatus, id]);
};

export const getStatistic = async (id) => {
  const itemSql = `select count(item.id) as count, item.category_id, c.name from item, category c
    where c.id = item.category_id
    AND item.shop_id = ?
    group by item.category_id`;

  const itemCate = await dbUtil.query(itemSql, [id]);

  const itemList = {};
  const itemLabel = [];
  const itemData = [];
  itemCate.forEach((element) => {
    itemLabel.push(element.name);
    itemData.push(element.count);
  });
  itemList.labels = itemLabel;
  itemList.datasets = [
    {
      label: "Phân bố sản phẩm",
      data: itemData,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
    },
  ];

  const orderSql =
    "select COUNT(`order`.id) as count, DAY(created_at) as day, MONTH(created_at) as month, YEAR(created_at) as year from `order` WHERE shop_id = ? GROUP BY YEAR(created_at), MONTH(created_at), DAY(created_at)";
  const orders = await dbUtil.query(orderSql, [id]);
  const orderList = {};
  const orderLabel = [];
  const orderData = [];
  orders.forEach((element) => {
    const label = element.day + "/" + element.month + "/" + element.year;
    orderLabel.push(label);
    orderData.push(element.count);
  });
  orderList.labels = orderLabel;
  orderList.datasets = [{
    label: "Số đơn hàng",
    data: orderData,
    backgroundColor: [
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(75, 192, 192, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
  }];
  console.log(itemList);
  console.log(orderList);
  return { items: itemList, orders: orderList };
};
