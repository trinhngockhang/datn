import { useRouter } from "next/router";

import LayoutOne from "../../components/layouts/LayoutOne";
import { capitalizeFirstLetter } from "../../common/utils";
import { getProductsBySlug } from "../../common/shopUtils";
import productData from "../../data/product.json";
import ProductDetailOne from "../../components/productDetail/ProductDetailOne";
import { getAuthen } from "../../util/request";
import { useEffect, useState } from "react";

export default function pid() {
  const router = useRouter();
  const [foundProduct, setFoundProduct] = useState({ name: 'loading...' });
  
  const { slug } = router.query;

  useEffect(() => {
    getDataProduct();
  }, []);
  const getDataProduct = async () => {
    const res = await getAuthen("/item/" + slug);
    setFoundProduct(res.data.data);

    console.log(res);
  };

  return (
    <LayoutOne
      title={foundProduct && capitalizeFirstLetter(foundProduct.name)}
      clearSpaceTop
    >
      {foundProduct && <ProductDetailOne data={foundProduct} />}
    </LayoutOne>
  );
}
