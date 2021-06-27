import { Tabs } from "antd";

import Container from "../../other/Container";
import ProductDetailReviewItem from "../elements/ProductDetailReviewItem";

const { TabPane } = Tabs;

export default function ProductDetailTabOne({data}) {
  console.log(data);
  return (
    <div className="product-detail-tab-one">
      <Container>
        <div id="description-product">
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Mô tả" key="1">
            <div className="product-detail-tab-item -description">
             {data.description}
            </div>
          </TabPane>
          <TabPane tab={`Nhận xét(${data.reviews?.length})`} key="2">
            <div className="product-detail-tab-item -review">
              {data?.reviews?.map(review => <ProductDetailReviewItem review={review}/>)}
              
            </div>
          </TabPane>
         
        </Tabs>
        </div>
      </Container>
    </div>
  );
}
