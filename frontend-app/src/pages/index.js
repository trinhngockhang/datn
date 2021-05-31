import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Banners from "../components/shop/Banners";
import LayoutOne from "../components/layouts/LayoutOne";
import ShopLayout from "../components/shop/ShopLayout";
import productData from "../data/product.json";
import useProductData from "../common/useProductData";
import Slider from "../components/slider";
import PopularCategory from "../components/popuplarCategory/PopularCategory";

export default function Home() {
  const router = useRouter();
  // const globalState = useSelector((state) => state.globalReducer);
  const subCategory = useSelector(state =>state?.shopReducer.subCategory);
  const data = useProductData(
    [],
    subCategory,
    router.query.q
  );
  return (
    <LayoutOne title="Homepage 1">
      <Slider/>
      <Banners />
      <PopularCategory/>
      <ShopLayout
        fiveColumn
        shopSidebarResponsive={{ xs: 24, lg: 4 }}
        shopContentResponsive={{ xs: 24, lg: 20 }}
        productResponsive={{ xs: 12, sm: 8, md: 6 }}
        productPerPage={15}
        data={Array.isArray(data)? [...data] : []}
      />
    </LayoutOne>
  );
}
