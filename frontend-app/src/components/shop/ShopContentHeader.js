import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { setSort } from "../../redux/actions/shopActions";

function ShopContentHeader({ data, productPerPage }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const shopState = useSelector((state) => state.shopReducer);
  const handleChange = (value) => {
    dispatch(setSort(value));
  };
  return (
    <div className="shop-content__header">
      <div className="shop-content__header-showing">
      </div>
      <div className="shop-content__header-filter">
      
      
      </div>
    </div>
  );
}

export default React.memo(ShopContentHeader);
