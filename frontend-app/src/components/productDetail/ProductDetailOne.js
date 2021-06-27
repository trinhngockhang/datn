import { Row, Col, Breadcrumb } from "antd";
import React from "react";

import Container from "../other/Container";
import ProductDetailContentOne from "./productDetailContent/ProductDetailContentOne";
import ProductDetailTabOne from "./productDetailTab/ProductDetailTabOne";
import ProductDetailImageOne from "./productDetailImage/ProductDetailImageOne";
import ShopInfoContent from "../shop/ShopInfo";

function ProductDetailLayoutOne({ data, setData }) {
  console.log('data: ', data);
  return (
    <div className="product-detail-one" id="product-detail-one-bottom">
      <div className="product-detail-one-top">
        <Container>
          <div id="product-detail">
            <Breadcrumb className="product-detail-breadcrumb" separator=">">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Product</Breadcrumb.Item>
              <Breadcrumb.Item>{data.name}</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={70}>
              <Col span={24} md={12}>
                <ProductDetailImageOne imageData={data.images} />
              </Col>
              <Col span={24} md={12}>
                <ProductDetailContentOne
                  data={data}
                  setData={setData}
                  quantityControllerNoRound
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <Container >
        <div id="product-shop-info">
        <Row gutter={70}>
          <Col span={24} md={24}>
            <ShopInfoContent shopId={data.shop_id}/>
          </Col>
        </Row>
        </div>
      </Container>

      <div className="product-detail-one-bottom">
        <ProductDetailTabOne data={data}/>
      </div>
    </div>
  );
}

export default React.memo(ProductDetailLayoutOne);
