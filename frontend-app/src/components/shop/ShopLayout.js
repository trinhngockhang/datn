import React from "react";
import { Row, Col } from "antd";

import ShopSidebar from "./ShopSidebar";
import ShopContent from "./ShopContent";
import ShopQuickView from "./ShopQuickView";
import Container from "../other/Container";

function ShopLayout({
  shopSidebarResponsive,
  shopId,
  shopContentResponsive,
  productResponsive,
  fiveColumn,
  data,
  productPerPage,
  productStyle,
  containerType,
}) {
  
  
  return (
    <div className="shop-layout">
      <Container type={containerType}>
        <Row gutter={30}>
          <Col className="gutter-row" {...shopSidebarResponsive}>
            <ShopSidebar shopId={shopId}/>
          </Col>
          <Col className="gutter-row" {...shopContentResponsive}>
            <ShopContent
              shopId
              productStyle={productStyle}
              productPerPage={productPerPage}
              fiveColumn={fiveColumn}
              productResponsive={productResponsive}
              data={data}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default React.memo(ShopLayout);

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch('http://localhost:3003/items');
  const posts = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}