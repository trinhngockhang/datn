import React, { useState, useEffect } from "react";
import { getAuthen } from "../util/request";
import { getProductsByCategory, getProductsBySearch } from "./shopUtils";

export default function useProductData(productData, category, query) {
  const [data, setData] = useState([]);
  const fetchData = async (category, query) => {
    const params = {};
    if(category){
      params['filters[category]'] = category;
    }
    if(query){
      if(query.shop_id){
        params['filters[shop_id]'] = query.shop_id;
      }
      if(query.id_exist){
        params['filters[id_exist]'] = query.id_exist;
      }
    }
    const res = await getAuthen('/item', {params});
    setData(res.data.data.data);
  };

  useEffect(() => {
    console.log('NEW cate: ', category, query)
    fetchData(category, query);
  }, [category]);

  return data;
}
