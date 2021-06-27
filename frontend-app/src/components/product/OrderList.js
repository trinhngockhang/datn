import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Badge, Tabs, Tag, Button } from "antd";
import { List, Avatar, Modal } from "antd";
import Link from "next/link";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { postAuthen } from "../../util/request";

const { TabPane } = Tabs;
export default function OrderList({ orders }) {
  console.log(orders);
  const newOrder = [...orders];

  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentRate, setContentRate] = useState();
  const [rating, setRating] = useState(0);
  const showModal = () => {
    console.log("UP ");
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const res = await postAuthen('/item/review', {
        id: selectedItem.item_id,
        content: contentRate,
        rate: rating
    });
    if(res.status == 400){
        alert(res.data.message);
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const getStatus = (status) => {
    if (status == 1) return <Tag color="orange">Đang chờ</Tag>;
    if (status == 2) return <Tag color="cyan">Đang giao</Tag>;
    if (status == 3) return <Tag color="green">Hoàn thành</Tag>;
  };
  return (
    <div>
      {newOrder && Array.isArray(newOrder) && (
        <>
          {newOrder.map((order) => {
            let newProducts = [...order.products];
            newProducts = newProducts ? newProducts : [];
            newProducts.unshift({});
            newProducts.push({});
            return (
              <>
                <Modal
                  title="Đánh giá"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                    <div style={{textAlign:'center'}}>
                  <StarRatings
                    rating={rating}
                    starRatedColor="red"
                    changeRating={setRating}
                    numberOfStars={5}
                    name="rating"
                  />
                  <textarea style={{width: '80%'}} onChange={e => setContentRate(e.target.value)}/>
                  </div>
                </Modal>
                <List
                  itemLayout="horizontal"
                  dataSource={newProducts}
                  renderItem={(item, index) => {
                    if (index == 0)
                      return (
                        <List.Item>
                          <div>
                            <i className="icon_bag_alt" />
                            <span
                              style={{
                                fontWeight: "600",
                                marginLeft: "0.5rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              {order.shopName}
                            </span>
                            <Link
                              href={
                                process.env.PUBLIC_URL + `/shop/info/[slug]`
                              }
                              as={
                                process.env.PUBLIC_URL +
                                `/shop/info/${order.shop_id}`
                              }
                            >
                              <Button>Xem shop</Button>
                            </Link>
                          </div>
                          <div style={{ float: "right" }}>
                            {getStatus(order.status)}
                          </div>
                        </List.Item>
                      );
                    if (index == newProducts.length - 1)
                      return (
                        <List.Item>
                          <span>Tổng cộng: {order.total_value} vnđ</span>
                        </List.Item>
                      );
                    else
                      return (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar shape="square" src={item.default_image} />
                            }
                            title={
                              <>
                                <Link
                                  href={
                                    process.env.PUBLIC_URL + `/product/[slug]`
                                  }
                                  as={
                                    process.env.PUBLIC_URL +
                                    `/product/${item.item_id}`
                                  }
                                >
                                  <a>{item.name}</a>
                                </Link>

                                <p>x{item.number_item}</p>
                                <Button
                                  type="primary"
                                  onClick={() => {
                                    setSelectedItem(item);
                                    showModal();
                                  }}
                                >
                                  Đánh giá
                                </Button>
                                <span
                                  style={{ float: "right", marginTop: "-1rem" }}
                                >
                                  Đơn giá: {item.price}
                                </span>
                              </>
                            }
                            // description={
                            //   <>
                            //     <p>{item.short_description}</p>
                            //   </>
                            // }
                          />
                        </List.Item>
                      );
                  }}
                />
                <br />
              </>
            );
          })}
        </>
      )}
    </div>
  );
}
