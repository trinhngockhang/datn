import React, { useState } from "react";
import { Button, Drawer } from "antd";
import Link from "next/link";

import ClientOnlyPortal from "../../common/ClientOnlyPortal";

export default function SubpagesSidebar() {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
  <></>
  );
}
