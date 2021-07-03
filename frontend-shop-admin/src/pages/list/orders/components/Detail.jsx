import React, { useState, useEffect } from 'react';
import { Modal, List, Avatar } from 'antd';
import { Form, Input, Button, Tag, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { createTemplate } from '../service';

const Detail = (props) => {
  const { onFinish, current, onCancel, modalVisible} = props;
  const [hasSize, setHasSize] = useState(null);
  let newProducts = current? [...current?.products]: [];
  if(newProducts){
    newProducts = newProducts ? newProducts : [];
    newProducts.unshift({});
    newProducts.push({});
  } else {
    newProducts = [];
  }
  const getStatus = (status) => {
    if (status == 1) return <Tag color="orange">Đang chờ</Tag>;
    if (status == 2) return <Tag color="cyan">Đang giao</Tag>;
    if (status == 3) return <Tag color="green">Hoàn thành</Tag>;
  };
  return (
    <Modal
      destroyOnClose
      title="Chi tiết đơn hàng"
      width={1000}
      style={{ overflowY: 'auto' }}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <List
                  itemLayout="horizontal"
                  dataSource={newProducts}
                  renderItem={(item, index) => {
                    if (index == 0)
                      return (
                        <List.Item>
                          <div>
                            <i className="icon_bag_alt" />
                            <span
                              style={{
                                fontWeight: "600",
                                marginLeft: "0.5rem",
                                marginRight: "0.5rem",
                              }}
                            >
                              Đơn hàng
                            </span>
                           
                          </div>
                          <div style={{ float: "right" }}>
                            {getStatus(current?.status)}
                          </div>
                        </List.Item>
                      );
                    if (index == newProducts.length - 1)
                      return (
                        <List.Item>
                          <span>Tổng cộng: {current.total_value} vnđ</span>
                        </List.Item>
                      );
                    else
                      return (
                        <List.Item>
                          <List.Item.Meta
                            avatar={
                              <Avatar shape="square" src={item.default_image} />
                            }
                            title={
                              <>
                                <a>{item.name}</a>
                                <p>x{item.number_item}</p>
                            
                                <span
                                  style={{ float: "right", marginTop: "-1rem" }}
                                >
                                  Đơn giá: {item.price}
                                </span>
                              </>
                            }
                            // description={
                            //   <>
                            //     <p>{item.short_description}</p>
                            //   </>
                            // }
                          />
                        </List.Item>
                      );
                  }}
                />
    </Modal>
  );
};

export default Detail;
