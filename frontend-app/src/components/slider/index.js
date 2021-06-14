import { Row, Col, Divider, Carousel } from "antd";
import { getAuthen } from "../../util/request";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../other/Container";

export default function Slider({ containerType }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getSlide();
  }, []);
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  const getSlide = async () => {
    const res = await getAuthen("/campaign/1");
    if(res.data.code == 0){
      console.log(res.data.data);
      setData(res.data.data);
    }
  };
  return (
    <div className="banners">
      <Container type={containerType}>
        <Row>
          <Col className="gutter-row" span={24} sm={16}>
          <Carousel autoplay>
            {
              data.map(slide => <>
                <img src={slide.image_url} style={{width: '100%', height: '100%'}}></img>
              </>)
            }
            
            </Carousel>
            </Col>
            <Col className="gutter-row" span={24} sm={8} style={{paddingLeft: '0.8rem'}}>
              <img
              style={{width: '100%', height: '100%'}}
              src="https://photos2.vitaminspy.com/datn/dcff148edf2a3918a8ac974d4b75cb20.png.jpeg"></img>
            </Col>
            </Row>
      </Container>
    </div>
  );
}
