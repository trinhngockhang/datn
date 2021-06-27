import React, { useState } from "react";
import { Rate, Button, Radio, Progress, message } from "antd";
import Countdown, { zeroPad } from "react-countdown";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";

import { formatCurrency } from "../../../common/utils";
import { addToCart } from "../../../redux/actions/cartActions";
import { checkAvaiableQuantityToAdd } from "../../../common/shopUtils";
import QuantitySelector from "../../controls/QuantitySelector";
import ProductGuaranteed from "../elements/ProductGuaranteed";
import ShopInfoContent from "../../../components/shop/ShopInfo";
import { getAuthen, postAuthen } from "../../../util/request";

function ProductDetailContentOne({
  data,
  onAddedToCart,
  hideGuaranteed,
  setData,
  quantityControllerNoRound,
  showCountdown,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [property, setProperty] = useState({});
  const globalState = useSelector((state) => state.globalReducer);
  const cartState = useSelector((state) => state.cartReducer);
  const avaiableQuantity = checkAvaiableQuantityToAdd(cartState, data);
  const { currency, locales } = globalState.currency;
  const onAddProductToCart = async (data) => {
    if (avaiableQuantity === 0) {
      return;
    }
    if(cartState){
      if(cartState[0]){
        if(cartState[0].shop_id != data.shop_id){
          message.error("Bạn cần xoá cart của nhà cung cấp khác", 3000);
          return;
        }
      }
    }
    data.variation = property;
    dispatch(addToCart(data, quantity));
    onAddedToCart && onAddedToCart();
    message.success("Thêm sản phẩm thành công");
  };
  const handleProperty = async (varian, value) => {
    const properties = {...property};
    properties[varian] = value;
    if(Object.keys(properties).length == data.varians.length){
      const res = await postAuthen('/item/model', {
        varians: properties,
        id: data.id
      });
      const newData = res.data.data;
      setData({...data, price: newData.price, inventory: newData.inventory, itemModelId: res.data.data.id });
    }
    setProperty(properties)
  }
  return (
    <div className="product-detail-content-one">
      <h3>{data.name}</h3>
      <div className="product-detail-content-one-rate">
        <Rate disabled defaultValue={4.5} />
        <span className="product-detail-content-one-review-count">
          - 5 Nhận xét
        </span>
      </div>
      <div className="product-detail-content-one-price">
        <h5>
          {data.discount
            ? formatCurrency(data.price - data.discount, locales, currency)
            : formatCurrency(data.price, locales, currency)}
        </h5>
        {data.discount && (
          <span>{formatCurrency(data.price, locales, currency)}</span>
        )}
      </div>
      <p className="product-detail-content-one-description">
          {data.short_description}
      </p>
      {showCountdown && (
        <>
          <div className="product-detail-content-one-countdown">
            <h3>Hurry Up ! Sales end in :</h3>
            <div className="product-detail-content-one-countdown__items">
              <Countdown
                date={Date.now() + 100000000}
                renderer={({ days, hours, minutes, seconds, completed }) => (
                  <>
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(days)}</div>
                      <span>days</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(hours)}</div>
                      <span>hours</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(minutes)}</div>
                      <span>mins</span>
                    </div>
                    :
                    <div className="product-detail-content-one-countdown__item">
                      <div>{zeroPad(seconds)}</div>
                      <span>secs</span>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="product-detail-content-one-countdown__sold">
              <Progress percent={50} showInfo={false} />
              <div className="sold-data">
                <h5>
                  Already Sold:
                  <span>20</span>
                </h5>
                <h5>
                  Total:
                  <span>20</span>
                </h5>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="product-detail-content-one-variation">
        {data.varians &&
          data.varians.map((varian) => (
            <div className="variation-item -size">
              <>
                <p>{varian.name}:</p>
                <Radio.Group defaultValue="a">
                  {varian.options.map((item, index) => (
                    <Radio.Button key={index} value={item}
                    onChange={() => handleProperty(varian.id, item)}
                    // style={{ backgroundColor: varian.name == 'Color' ? item : null }}
                    >
                      {item}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </>
            </div>
          ))}

        {/* {data.variation && (
          <div className="variation-item -color">
            <>
              <p>Color:</p>
              <Radio.Group onChange={onChooseColor} defaultValue="a">
                {data.variation.map((item, index) => (
                  <Radio.Button
                    key={index}
                    value={item.color}
                    style={{ backgroundColor: item.colorCode }}
                  ></Radio.Button>
                ))}
              </Radio.Group>
            </>
          </div>
        )} */}
      </div>
      <div className="product-detail-content-one-actions">
        <QuantitySelector
          noRound={quantityControllerNoRound}
          defaultValue={1}
          onChange={(val) => setQuantity(val)}
          size="big"
          max={checkAvaiableQuantityToAdd(cartState, data)}
        />
        <Button
          onClick={() => onAddProductToCart(data)}
          disabled={avaiableQuantity === 0 || data.varians? data?.varians.length != Object.keys(property)?.length: false }
          className={`product-detail-content-one-atc ${classNames({
            disabled: avaiableQuantity === 0,
          })}`}
          type="link"
          danger
        >
          Thêm vào giỏ
        </Button>
      </div>
    
    </div>
  );
}

export default React.memo(ProductDetailContentOne);
