import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import { Select } from "antd";

import { SHOP } from "../../common/defines";
import { setSubCategory } from "../../redux/actions/shopActions";
import { getAuthen } from "../../util/request";

function ShopSidebar(props) {
  const { shopId } = props;
  const { Option } = Select;
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalReducer);
  const shopState = useSelector((state) => state.shopReducer);
  const [categories, setCategories] = useState([]);

  const getCategory = async () => {
    console.log(shopId)
    const res = await getAuthen(shopId? '/category/shop/' + shopId : '/category');
    console.log(res);
    setCategories(res.data.data);
  }

  useEffect(() => {
    getCategory();
  }, [])
  const subCategory = SHOP.category.find(
    (item) => item.name.toLowerCase() === globalState.category.toLowerCase()
  );
  const onChooseSubCategory = (data) => {
    if (!data || data === "all") {
      return dispatch(setSubCategory(""));
    }
    console.log('SUB CATEGORU: ', data);
    return dispatch(setSubCategory(data));
  };
  const handleChange = (value) => {
    onChooseSubCategory(value);
  };
  return (
    <div className="shop-sidebar">
      <div className="shop-sidebar__subcategory">
        <ul>
          <li
            className={classNames({
              active: shopState.subCategory === "",
            })}
          >
            <Link href="">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  onChooseSubCategory("all");
                }}
              >
                <i className="icon_document_alt" />
                All Category
              </a>
            </Link>
          </li>
          {categories &&
            categories.map((item, index) => (
              <li
                key={index}
                className={classNames({
                  active: shopState.subCategory === item.id,
                })}
              >
                <Link href="#">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      onChooseSubCategory(item.id);
                    }}
                  >
                    <i className={item.icon} />
                    {item.name}
                  </a>
                </Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="shop-sidebar__subcategory-mobile">
        <Select
          defaultValue="all"
          style={{ width: "100%" }}
          onChange={handleChange}
          value={shopState.subCategory === "" ? "all" : shopState.subCategory}
        >
          <Option value="all">
            <i className="icon_document_alt" />
            All Category
          </Option>
          {categories &&
            categories.map((item, index) => (
              <Option key={index} value={item.name}>
                {" "}
                <i className={item.icon} />
                {item.name}
              </Option>
            ))}
        </Select>
      </div>
    </div>
  );
}

export default React.memo(ShopSidebar);
