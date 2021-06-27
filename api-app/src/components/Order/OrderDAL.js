import * as dbUtil from "../../util/databaseUtil";
import uuidv4 from "uuid/v4";

export const createOrder = async (body, userId) => {
  const firstItem = body[0];
  const shopId = firstItem.shop_id;
  let totalValue = 0;
  const transaction = await dbUtil.beginTransaction();
  try {
    const listItemModelIds = body.map((i) => i.itemModelId);
    const listItemSql = "SELECT * FROM item_model WHERE id IN (?)";

    // Kiem tra so luong mat hang
    const listItemModel = await dbUtil.execute(
      listItemSql,
      [listItemModelIds],
      transaction
    );
    const orderItem = [];
    listItemModel.forEach((element) => {
      const found = body.find((e) => e.itemModelId == element.id);

      if (found.cartQuantity > element.inventory) {
        throw Promise.reject("Không đủ số lượng mặt hàng: " + found.name);
      }
      totalValue += Number(found.price);
    });

    // Tao order
    const orderId = uuidv4();
    const createOrderSql =
      "INSERT INTO `order` (id, user_id, shop_id, total_value) VALUES (?,?,?, ?)";
    const order = await dbUtil.execute(
      createOrderSql,
      [orderId, userId, shopId, totalValue],
      transaction
    );
    body.forEach((item) => {
      orderItem.push([
        orderId,
        item.itemModelId,
        item.cartQuantity,
        item.price,
      ]);
    });
    const orderItemSql =
      "INSERT INTO order_item(order_id, item_model_id, quantity, unit_price) VALUES ?";
    await dbUtil.execute(orderItemSql, [orderItem], transaction);

    for (let i = 0; i < body.length; i++) {
      const sql =
        "UPDATE item_model set inventory = inventory - ? where id = ?";
      await dbUtil.execute(
        sql,
        [body[i].cartQuantity, body[i].itemModelId],
        transaction
      );
    }

    await dbUtil.commitTransaction(transaction);
  } catch (e) {
    console.log("vao day", e);
    await dbUtil.rollbackTransaction(transaction);
    return e;
  }
};

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

export const getOrders = async (id, status) => {
  const orderParam = [id];
  let getOrderSql =
    "SELECT o.*, s.name as shopName from `order` o, shop s where user_id = ? and o.shop_id = s.id";
  if (status && status != 0) {
    getOrderSql += " AND status = ?";
    orderParam.push(status);
  }
  const orders = await dbUtil.query(getOrderSql, orderParam);
  for (const order of orders) {
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
  return orders;
};
