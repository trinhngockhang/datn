import { useRouter } from "next/router";
import { Row, Col, Carousel } from "antd";

import { getAuthen } from "../../../util/request";
import { useEffect, useState } from "react";
import LayoutOne from "../../../components/layouts/LayoutOne";
import Container from "../../../components/other/Container";
import { Button } from "antd/lib/radio";
import ShopLayout from "../../../components/shop/ShopLayout";
import { useSelector } from "react-redux";
import useProductData from "../../../common/useProductData";
import ShopContent from "../../../components/shop/ShopInfo";
import ShopInfoContent from "../../../components/shop/ShopInfo";

export default function shopInfo() {
  const router = useRouter();
  const [data, setData] = useState({ name: "loading..." });

  const { slug } = router.query;
  // const globalState = useSelector((state) => state.globalReducer);
  const subCategory = useSelector(state =>state?.shopReducer.subCategory);
  const dataProduct = useProductData(
    [],
    subCategory,
    { shop_id: slug}
  );

  return (
    <LayoutOne title={slug} clearSpaceTop>
      <div className="product-detail-one">
        <div className="product-detail-one-top-shop" style={{marginTop: '3rem'}}>
          <Container>
            {/* <Row >
              <Col span={24} md={24}>
              <div className="header-shop">
                <Row style={{width:'100%'}}>
                    <div className="heading-shop-container">
                    </div>
                </Row>
              </div>
              </Col>
              <Col span={24} md={12}>
              </Col>
            </Row> */}
           <ShopInfoContent shopId={slug}/>
          </Container>
          <br />
          <Container style={{ marginTop: "3rem" }}>
            <Row gutter={30}>
              <Col className="gutter-row" span={24} sm={16}>
                <Carousel autoplay>
                  {[
                    "https://photos2.vitaminspy.com/datn/slide1.jpg",
                    "https://photos2.vitaminspy.com/datn/slide3.jpg",
                    "https://photos2.vitaminspy.com/datn/slide2.jpg",
                  ].map((slide) => (
                    <>
                      <img
                        src={slide}
                        style={{ width: "100%", height: "100%" }}
                      ></img>
                    </>
                  ))}
                </Carousel>{" "}
              </Col>
              <Col
                className="gutter-row"
                span={24}
                sm={8}
                style={{ paddingLeft: "0.8rem" }}
              >
                <img
                  style={{ width: "100%", height: "100%" }}
                  src="https://photos2.vitaminspy.com/datn/dcff148edf2a3918a8ac974d4b75cb20.png.jpeg"
                ></img>
              </Col>
            </Row>
          </Container>
          <br/>
          <ShopLayout
            shopId={slug}
            fiveColumn
            shopSidebarResponsive={{ xs: 24, lg: 4 }}
            shopContentResponsive={{ xs: 24, lg: 20 }}
            productResponsive={{ xs: 12, sm: 8, md: 6 }}
            productPerPage={15}
            data={Array.isArray(dataProduct) ? [...dataProduct] : []}
          ></ShopLayout>
        </div>
      </div>
      <br/>
    </LayoutOne>
  );
}
