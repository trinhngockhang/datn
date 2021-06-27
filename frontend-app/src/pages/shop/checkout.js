import {
  Form,
  Input,
  Button,
  Checkbox,
  Row,
  Col,
  Select,
  Collapse,
} from "antd";
import { useState, useCallback } from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

import { formatCurrency } from "../../common/utils";
import { calculateTotalPrice } from "../../common/shopUtils";
import LayoutOne from "../../components/layouts/LayoutOne";
import Container from "../../components/other/Container";
import Product from "../../components/product/Product";
import localStorage from "localStorage";
import LoginButton from "../../common/loginButton";
import { postAuthen } from "../../util/request";
import * as cartAction from "../../redux/actions/cartActions";
import useProductData from "../../common/useProductData";
// import productData from "../../data/product.json"
const paymentData = [
  {
    name: "Thanh toán bằng thẻ",
    content: "Nhập thông tin thanh toán, đơn hàng sẽ tự động được thanh toán",
  },
  {
    name: "Thanh toán khi nhận hàng",
    content: "Thanh toán trực tiếp ngay khi nhận được hàng",
  },
];

export default function checkout() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const router = useRouter();
  const cartState = useSelector((state) => state.cartReducer);
  const globalState = useSelector((state) => state.globalReducer);
  const userLogin = useSelector(state => state.userReducer);
  const { currency, locales } = globalState.currency;
  const [paymentMethod, setPaymentMethod] = useState("Thanh toán bằng thẻ");
  const productData = useProductData(
    [],
    null,
    { shop_id: cartState[0].shop_id , id_exist: true }
  ); 
    console.log('xxx', productData);
  const settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  const onFinish = (values) => {
    router.push("/shop/checkout-complete");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChoosePayment = useCallback(
    (key) => {
     
      setPaymentMethod(key);
    },
    [paymentMethod]
  );

  const handleCreateOrder = async () => {
    try {
      const res = await postAuthen('/order', cartState);
      if(res.status == 400){
        alert(res.data.message);
        return;
      };
      // dispatch(cartAction.removeAllFromCart());
      onFinish();
    } catch(e){
      console.log(e);
      alert(e.message);
    }
   
  }

  console.log(userLogin.user);
  return (
    <LayoutOne title="Checkout">
      <div className="checkout">
        {userLogin.user ? (
          <>
            <div className="checkout-top">
              <Container>
                <Row gutter={{ xs: 0, lg: 70 }}>
                  <Col span={24} lg={15} xl={17}>
                    <h3 className="checkout-title">Chi tiết đơn hàng</h3>
                    <Form
                      name="basic"
                      initialValues={{ remember: true }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      id="checkout-form"
                      layout="vertical"
                      className="checkout-form"
                    >
                      <Row gutter={{ xs: 10, sm: 15, md: 30, lg: 70 }}>
                        <Col span={24} md={12}>
                          <Form.Item
                            label="Địa chỉ nhận hàng"
                            name="address"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập địa chỉ nhận hàng!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập sđt nhận hàng!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            label="Số điện thoại"
                            name="phone"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập sđt nhận hàng!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        {
                          paymentMethod == "Thanh toán bằng thẻ" ?
                          <>
                             <Col span={24} md={12}>
                          <Form.Item
                            label="Mã thẻ"
                            name="creditcart"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập mã thẻ!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            label="Ngày hết hạn thẻ"
                            name="date"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập ngày hết hạn thẻ!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24} md={12}>
                          <Form.Item
                            label="CVV"
                            name="cvv"
                            rules={[
                              {
                                required: true,
                                message: "Hãy nhập CVV!",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                          </> :
                          <></>
                        }
                      </Row>
                    </Form>
                  </Col>
                  <Col span={24} md={16} lg={9} xl={7}>
                    <div className="checkout-total">
                      <h3 className="checkout-title">Đơn hàng của bạn</h3>
                      <div className="checkout-total__table">
                        <div className="divider" />
                        <table className="checkout-total__table-calculate">
                          <thead>
                            <tr>
                              <th>Sản phẩm</th>
                              <th>Giá tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cartState.map((item, index) => (
                              <tr key={index}>
                                <td>
                                  {item.name}
                                  <span> x {item.cartQuantity}</span>
                                </td>
                                <td>
                                  {item.discount
                                    ? formatCurrency(
                                        item.price - item.discount,
                                        locales,
                                        currency
                                      )
                                    : formatCurrency(
                                        item.price,
                                        locales,
                                        currency
                                      )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="divider" />
                        <table className="checkout-total__table-subtotal">
                          <tbody>
                            <tr>
                              <td>Giá tiền</td>
                              <td>
                                {formatCurrency(
                                  calculateTotalPrice(cartState),
                                  locales,
                                  currency
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="divider" />
                        <table className="checkout-total__table-total">
                          <tbody>
                            <tr>
                              <td>Tổng cộng</td>
                              <td>
                                {formatCurrency(
                                  calculateTotalPrice(cartState),
                                  locales,
                                  currency
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <Collapse
                          className="checkout-payment"
                          accordion
                          defaultActiveKey={paymentMethod}
                          ghost
                          onChange={onChoosePayment}
                        >
                          {paymentData.map((item, index) => (
                            <Panel
                              showArrow={false}
                              header={item.name}
                              key={item.name}
                              onClick={() => setPaymentMethod(item.name)}
                              extra={
                                <i
                                  className={
                                    paymentMethod === item.name
                                      ? "fas fa-check-square"
                                      : "fal fa-square"
                                  }
                                />
                              }
                            >
                              <p>{item.content}</p>
                            </Panel>
                          ))}
                        </Collapse>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="checkout-bottom">
              <Container>
                <h5>Có thể bạn quan tâm</h5>
                <div className="checkout-related-products">
                  <Slider {...settings}>
                    {productData.slice(0, 8).map((item, index) => (
                      <div className="slider-item" key={index}>
                        <Product data={item} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </Container>
            </div>
            <div className="checkout-sticky">
              <Container>
                <div className="checkout-functions">
                  <Button className="checkout-functions--shopping">
                    <Link href={process.env.PUBLIC_URL + "/"}>
                      <a>Tiếp tục mua sắm</a>
                    </Link>
                  </Button>
                  <div className="checkout-price-finally">
                    <table>
                      <tbody>
                        <tr>
                          <td>{cartState.length} sản phẩm</td>
                          <td>
                            {formatCurrency(
                              calculateTotalPrice(cartState),
                              locales,
                              currency
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Tổng:</td>
                          <td>
                            {formatCurrency(
                              calculateTotalPrice(cartState),
                              locales,
                              currency
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <Button
                    className="checkout-functions--next"
                    // form="checkout-form"
                    // key="submit"
                    // htmlType="submit"
                    style={{ marginBottom: 0 }}
                    onClick={handleCreateOrder}
                  >
                    Hoàn thành
                  </Button>
                </div>
              </Container>
            </div>{" "}
          </>
        ) : (
          <div className="checkout-top">
            <Container>
              <Row gutter={{ xs: 0, lg: 70 }}>
              <Col span={24} lg={15} xl={17}>
              <h4>Bạn cần đăng nhập để mua hàng</h4>
              <LoginButton/>

              </Col>

              </Row>
            </Container>
          </div>
        )}
      </div>
    </LayoutOne>
  );
}
