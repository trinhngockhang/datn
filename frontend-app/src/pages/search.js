import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Card, Row, Tabs, Col, Avatar } from "antd";
import Link from "next/link";
import LayoutOne from "../components/layouts/LayoutOne";
import { useEffect, useState } from "react";
import Container from "../components/other/Container";
import { getAuthen } from "../util/request";
import OrderList from "../components/product/OrderList";
import Product from "../components/product/Product";
const { Meta } = Card;
const { TabPane } = Tabs;
export default function Order() {
  const router = useRouter();
  const keyword = router?.query?.q;
  const [data, setData] = useState();
  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    const res = await getAuthen("/item/search?key=" + keyword);
    console.log(res.data.data);
    setData(res.data.data.map((a) => a._source));
  };
  return (
    <LayoutOne title="Tìm kiếm">
      <Container>
        <div className="order-content">
            <h3>Kết quả tìm kiếm cho: {keyword}</h3>
            <br/>
          <Row gutter={[16, 16]}>
            {data ? (
              data.map((item) => (
                <>
                  <Col span={6}>
                  <Link
                        href={process.env.PUBLIC_URL + `/product/[slug]`}
                        as={process.env.PUBLIC_URL + `/product/${item.id}`}
                    >
                    <Card
                      style={{ width: 300 }}
                      cover={
                        <img
                          alt={item.name}
                          src={item.images[0]}
                        />
                      }
                    >
                        <p>Name: {item.name}</p>
                        <p>Category: {item.categoryName}</p>
                        <p>Shop name: {item.shopName}</p>
                    </Card>
                    </Link>
                  </Col>
                </>
              ))
            ) : (
                <Col span={6}>
                <h3>Không tìm thấy sản phẩm</h3>
                </Col>
            )}
          </Row>
        </div>
      </Container>
    </LayoutOne>
  );
}
