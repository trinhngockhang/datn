import { Row, Col, Modal, Button } from "antd";
import { getAuthen, postAuthen } from "../../util/request";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../other/Container";
import moment from "moment";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";

export default function ShopInfoContent({ shopId }) {
  const [shop, setShop] = useState(null);
  const userState = useSelector(state => state.userReducer);

  useEffect(() => {
    getDataProduct();
  }, [shopId]);

  const handleFollow = async () => {
    await postAuthen("/shop/follow", { id: shopId });
    await getDataProduct();
  };

  const handleUnFollow = async () => {
    await postAuthen("/shop/unfollow", { id: shopId });
    await getDataProduct();
  };

  const getDataProduct = async () => {
    const res = await getAuthen("/shop/" + shopId);
    setShop(res.data.data);
  };


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentRate, setContentRate] = useState();
  const [rating, setRating] = useState(0);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    const res = await postAuthen('/shop/review', {
        id: shopId,
        content: contentRate,
        rate: rating
    });
    if(res.status == 400){
        alert(res.data.message);
    }  getDataProduct();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Row gutter={30}>
        <Col span={8} md={8}>
          <Row gutter={12} style={{ padding: "1rem" }} className="heading-logo">
            <Col span={7} md={7}>
              <img className="heading-shop-img" src={shop?.image}></img>
              
              { userState.user? shop?.followed ? (
                <Button
                  style={{ marginTop: "0.2rem" }}
                  onClick={handleUnFollow}
                >
                  {" "}
                  Bỏ theo dõi{" "}
                </Button>
              ) : (
                <Button style={{ marginTop: "0.2rem" }} onClick={handleFollow}>
                  {" "}
                  +Theo dõi{" "}
                </Button>
              ): <></> }
            </Col>

            <Col span={12} md={12}>
              <a href={`/shop/info/${shopId}`}>
                <h3>{shop?.name}</h3>{" "}
              </a>

              <p>Hoạt động</p>
              <br />
            </Col>
          </Row>
        </Col>
        <Modal
          title="Đánh giá"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div style={{ textAlign: "center" }}>
            <StarRatings
              rating={rating}
              starRatedColor="red"
              changeRating={setRating}
              numberOfStars={5}
              name="rating"
            />
            <textarea
              style={{ width: "80%" }}
              onChange={(e) => setContentRate(e.target.value)}
            />
          </div>
        </Modal>
        <Col span={16} md={16}>
          <Row gutter={[16, 40]}>
            <Col span={12} md={12}>
              <p>
                {" "}
                <i className="icon_house" /> Sản phẩm: {shop?.total_item}
              </p>
              <br />
              <p>
                {" "}
                <i className="social_rss_square" /> Số người theo dõi:{" "}
                {shop?.total_follow}
              </p>
            </Col>
            <Col span={12} md={12}>
              <p>
                {" "}
                <i className="icon_star" /> Đánh giá: {shop?.total_rate}
              </p>
              <br />
              <p>
                <i className="icon_tag" /> Tham gia:{" "}
                {moment(shop?.created_at).format("DD-MM-YYYY")}
              </p>
            </Col>
            <Col span={12} md={12}>
             {
                userState.user? 
                <Button type="primary" onClick={showModal}>
                {" "}
                Đánh giá{" "}
              </Button>: <></>
             } 
              
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
