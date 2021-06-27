import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Tabs } from "antd";

import LayoutOne from "../components/layouts/LayoutOne";
import { useEffect, useState } from "react";
import Container from "../components/other/Container";
import { getAuthen } from "../util/request";
import OrderList from "../components/product/OrderList";

const { TabPane } = Tabs;
export default function Order() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [key, setKey] = useState(0);
  function callback(key) {
    setKey(key);
  }

  useEffect(() => {
    fetchOrder();
  }, [key]);
  const fetchOrder = async () => {
    const res = await getAuthen("/order", { params: {
        status: key
    }});
    setOrders(res.data.data);
  };
  return (
    <LayoutOne title="Lịch sử order">
      <Container>
        <div className="order-content">
        <Tabs defaultActiveKey="0" onChange={callback}>
          <TabPane tab="Tất cả" key="0">
            <OrderList orders={orders} />
          </TabPane>
          <TabPane tab="Đang chờ" key="1">
            <OrderList orders={orders} />
          </TabPane>
          <TabPane tab="Đang giao" key="2">
            <OrderList orders={orders} />
          </TabPane>
          <TabPane tab="Hoàn thành" key="3">
            <OrderList orders={orders} />
          </TabPane>
        </Tabs>
        </div>
      </Container>
    </LayoutOne>
  );
}
