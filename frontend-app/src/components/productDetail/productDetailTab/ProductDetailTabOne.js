import { Tabs } from "antd";

import Container from "../../other/Container";
import ProductDetailReviewItem from "../elements/ProductDetailReviewItem";

const { TabPane } = Tabs;

export default function ProductDetailTabOne() {
  return (
    <div className="product-detail-tab-one">
      <Container>
        <Tabs defaultActiveKey="1" centered>
          <TabPane tab="Description" key="1">
            <div className="product-detail-tab-item -description">
              <p className="tab-des--bold">
              Chất liệu cao cấp mang lại cảm giác dễ chịu vô cùng, tự tin xuống phố đi làm.

Mang hơi hướng thời thượng và phong cách mới cùng nhiều set đồ khác nhau.
              </p>
              <h5 className="tab-title">Thông tin sản phẩm</h5>
              <p className="tab-des">
              Áo thun nữ thiết kế GUMAC  được thiết kế với chất liệu êm ái, nhẹ nhàng, thoáng mát không gây cảm giác khó chịu khi mặc. Kiểu dáng mang đến nét duyên dáng, thanh lịch cho bạn gái.
Thiết kế tôn lên những đường nét quyến rũ, cuốn hút, là lựa chọn không thể bỏ qua của các bạn nữ cho các buổi đi chơi, dã ngoại cuối tuần.
Nhờ vào thiết kế thanh lịch sản phẩm hứa hẹn sẽ cùng bạn tỏa sáng trên mọi bước chân bạn qua, dù là chốn văn phòng, góc phố cuối tuần hay trong những bữa tiệc sang trọng, bạn sẽ tỏa sáng theo cách riêng của mình.
Màu sắc tươi sáng, nổi bật lôi cuốn đầy mê hoặc cho nàng thêm xinh xắn rạng ngời mỗi khi diện sản phẩm
              </p>
              <h5 className="tab-title">Lời nhắn</h5>
              <p className="tab-des">
              Chọn sản phẩm tốt, chọn cuộc sống thanh lịch mà vẫn thật thoải mái, chọn GU cho riêng mình mà siêu tiết kiệm. Hãy tự tin làm đẹp chính mình để tạo nên cuộc sống muôn màu và thú vị nhất bạn nhé.
              </p>
            </div>
          </TabPane>
          <TabPane tab="Customer Reviews(5)" key="2">
            <div className="product-detail-tab-item -review">
              <ProductDetailReviewItem />
              <ProductDetailReviewItem />
            </div>
          </TabPane>
          <TabPane tab="Additional information" key="3">
            <div className="product-detail-tab-item -info">
              <table>
                <tr>
                  <td>Outer Shell</td>
                  <td>100% polyester</td>
                </tr>
                <tr>
                  <td>Lining</td>
                  <td>100% polyurethane</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>S, M, L, XL</td>
                </tr>
                <tr>
                  <td>Colors</td>
                  <td>Grey, Red, Blue, Black</td>
                </tr>
                <tr>
                  <td>Care</td>
                  <td>
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/shop/shop-detail/care-icons.png"
                      }
                      alt="Care icon"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </TabPane>
        </Tabs>
      </Container>
    </div>
  );
}
