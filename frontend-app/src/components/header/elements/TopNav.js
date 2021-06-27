import { Button, Select } from "antd";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

import {
  setGlobalLanguage,
  setGlobalCurrency,
} from "../../../redux/actions/globalActions";
import Container from "../../other/Container";
import localStorage from "localStorage";
import * as userAction from "../../../redux/actions/userAction";

function TopNav({ containerType }) {
  const { Option } = Select;
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.globalReducer);
  const userState = useSelector((state) => state.userReducer);
  const user = userState.user;
  const onSelectLanguage = (value) => {
    dispatch(setGlobalLanguage(value));
  };
  const onSelectCurrency = (value) => {
    dispatch(setGlobalCurrency(value));
  };
  return (
    <div className="top-nav">
      <Container type={containerType}>
        <div className="top-nav-wrapper">
          <div className="top-nav-selects">
            <Select
              defaultValue={globalState.language}
              style={{ width: 90 }}
              bordered={false}
              onChange={onSelectLanguage}
            >
              <Option value="en">English</Option>
              <Option value="vi">Vietnamese</Option>
            </Select>
            <Select
              defaultValue={globalState.currency.currency}
              style={{ width: 120 }}
              bordered={false}
              onChange={onSelectCurrency}
            >
              <Option value="USD">USD - Dollar</Option>
              <Option value="VND">VND - Vietnam dong</Option>
            </Select>
          </div>
          <div className="top-nav-links">
            <div className="top-nav-links__item">
              <Link href={process.env.PUBLIC_URL + "/orders"}>
                <a>
                  {user ? (
                    <Button
                    >
                      {" "}
                      Đơn hàng{" "}
                    </Button>
                  ) : (
                    <></>
                  )}
                </a>
              </Link>
            </div>
            <div className="top-nav-links__item">
              <div>
                <i className="icon_log_out" />
                {user ? (
                  <Button
                    onClick={() => {
                      console.log("Remote token");
                      localStorage.removeItem("token");
                      dispatch(userAction.logout());
                    }}
                  >
                    {" "}
                    Đăng xuất{" "}
                  </Button>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default React.memo(TopNav);
