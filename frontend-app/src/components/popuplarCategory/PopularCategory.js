import { Row, Col, Divider, Carousel } from "antd";
import { getAuthen } from "../../util/request";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "../other/Container";

export default function PopularCategory({ containerType }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);


  const getCategory= async () => {
    const res = await getAuthen("/category/popular");
    if(res.data.code == 0){
      console.log(res.data.data);
      setData(res.data.data);
    }
  };
  return (
    <div className="banners">
       <Container type={containerType}>
        <Row gutter={30}>
          {
            data.map((banner, index) => <Col key={index} className="gutter-row" span={8} sm={3}>
            <Link href={process.env.PUBLIC_URL + "#"}>
              <a className="banner-item">
                <img
                className="icon-popular-category"
                  src={
                    banner.image_url
                  }
                  alt="banner"
                />
                   <span className="text-popular-category">{banner.name}</span>
              </a>
           
            </Link>
          </Col> )
          }
         
        </Row>
      </Container>
    </div>
  );
}
