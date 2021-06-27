import Slider from "react-slick";
import { useState } from "react";
import { Row, Col } from "antd";
import React from "react";

import ZoomImage from "../../other/ZoomImage";

function ProductDetailImageOne({ imageData }) {
  const slider1Settings = {
    arrows: false,
  };
  console.log({imageData});
  const slider2Settings = {
    arrows: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: imageData? imageData.length:1,
    centerMode: true,
    centerPadding: "0px",
    focusOnSelect: true,
    vertical: true,
    // prevArrow: <PrevArrow />,
    // nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          vertical: false,
          slidesToShow: 3,
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
          vertical: false,
          slidesToShow: 4,
        },
      },
    ],
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  return (
    <div>
      <div className="product-detail-image-one">
        <Row gutter={20}>
          <Col
            span={24}
            xs={{ order: 2 }}
            sm={{ span: 4, order: 1 }}
            md={{ span: 24, order: 2 }}
            lg={{ span: 6, order: 1 }}
            xl={4}
          >
            <div className="product-detail-image-one-small">
              <Slider
                id="slide-product"
                asNavFor={nav1}
                ref={(c) => setNav2(c)}
                {...slider2Settings}
              >
                {imageData &&
                  imageData.map((img, index) => (
                    <div key={index} className="slider-item" data-index={index}>
                      <img
                        src={img}
                        alt="Product image"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </Col>
          <Col
            span={24}
            xs={{ order: 1 }}
            sm={{ span: 20, order: 2 }}
            md={{ span: 24, order: 1 }}
            lg={{ span: 18, order: 2 }}
            xl={20}
          >
            <div className="product-detail-image-one-big">
              <Slider
                asNavFor={nav2}
                ref={(c) => setNav1(c)}
                {...slider1Settings}
              >
                {imageData &&
                  imageData.map((img, index) => (
                    <div key={index} className="slider-item">
                      <ZoomImage
                        disableOnMobile
                        src={img}
                        alt="Product image"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default React.memo(ProductDetailImageOne);
