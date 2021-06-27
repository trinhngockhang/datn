import React from "react";
import GoogleLogin from 'react-google-login';
import { Button, Drawer } from "antd";
import { axiosLoginGoogle } from "../util/request";
import { useDispatch } from "react-redux";
import * as userAction from '../redux/actions/userAction';

export default function LoginButton() {
  const dispatch = useDispatch();
  const responseGoogle = async (body) => {
      console.log(body)
    const data = await axiosLoginGoogle(body.tokenId);
    console.log(data);
    dispatch(userAction.login(data.email));
  }
  return (
    <>
      <GoogleLogin
        clientId="166922836843-797rd8or4tb5mrv7r7qa8k0c5kr8qdpi.apps.googleusercontent.com"
        buttonText="Login"
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} disabled={renderProps.disabled}>
            Log in
          </Button>
        )}
        onSuccess={responseGoogle}
        // onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
}
