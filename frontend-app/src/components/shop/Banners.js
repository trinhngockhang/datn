import { Row, Col, Divider, Carousel } from "antd";
import { getAuthen } from "../../util/request";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../other/Container";

export default function Banners({ containerType }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getBanner();
  }, []);
  const getBanner = async () => {
    const res = await getAuthen("/campaign/2");
    if(res.data.code == 0){
      setData(res.data.data);
    }
  };
  return (
    <div className="banners">
      <Container type={containerType}>
        <Row gutter={30}>
          {
            data.map((banner, index) => <Col key={index} className="gutter-row" span={24} sm={6}>
            <Link href={process.env.PUBLIC_URL + "/shop/info/"+banner.id}>
              <a className="banner-item">
                <img
                  src={
                    banner.image_advertise
                  }
                  alt="banner"
                />
              </a>
            </Link>
          </Col> )
          }
         
        </Row>
      </Container>
    </div>
  );
}
