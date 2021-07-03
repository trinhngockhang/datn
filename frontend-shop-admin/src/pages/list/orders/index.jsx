import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, message, Input, Drawer, Collapse, Tag, Tooltip } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/Detail';
import { FormInstance } from 'antd/lib/form';
import moment from 'moment';

import {
  queryItem,
  removeTemplate,
  updateOrder,
  createTemplate,
} from './service';


const { Panel } = Collapse;
const handleUpdate = async (data) => {
  const hide = message.loading('Loading');
  try {
    await updateOrder({
      id: data.id,
    });
    hide();
    message.success('Success');
    return true;
  } catch (error) {
    hide();
    message.error('Fail');
    return false;
  }
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRow) => {
  const hide = message.loading('Removing');
  if (!selectedRow) return true;
  console.log({selectedRow});
  try {
    await removeTemplate(selectedRow._id);
    hide();
    message.success('Remove success');
    return true;
  } catch (error) {
    console.log(error);
    hide();
    message.error('Remove fail');
    return false;
  }
};

const TableList = () => {
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [current, setCurrent] = useState();
  const actionRef = useRef();
  const [row, setRow] = useState();
  const [varianOption, setVarianOption] = useState();
  const [selectedRowsState, setSelectedRows] = useState([]);
  let formVarianRef = React.createRef();
  const onFinish = async (values) => {
    try {
      const res = await createTemplate(values);
      console.log(res);
      handleModalVisible(false);
      actionRef.current?.reloadAndRest?.();
    } catch (e) {
      console.log(e);
      message.error('Fail!');
    }
  };

  const onFinishUpdate = async (values) => {
    console.log('Received values of form update:', values);
    console.log('VAIRAN: ', varianOption);
    try {
      // const res = await updateTemplate(values);
      // console.log(res);
      // handleUpdateModalVisible(false);
      // actionRef.current?.reloadAndRest?.();
    } catch (e) {
      console.log(e);
      message.error('Fail!');
    }
  };


  const columns = [
    
    {
      title: 'ID',
      dataIndex: 'id',
      render: (dom, entity, id) => {
        return <span>{id}</span>
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (dom, entity) => {
        if(dom == 1) return <Tag color="cyan"> Đang chờ </Tag>
        if(dom == 2) return <Tag color="blue"> Đang giao </Tag>
        if(dom == 3) return <Tag color="green"> Hoàn thành </Tag>
      },
    },
    {
      title: 'Giá trị',
      dataIndex: 'total_value',
    },
    {
      title: 'Người mua',
      dataIndex: 'user_name',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'created_at',
      render: (dom, entity) => {
        return <span>{moment(dom).format('DD-MM-YYYY')}</span>
      },
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setCurrent(record);
            }}
          >
            Chi tiết 
          </a>
          {"  "}   | {"  "}
          <a
            onClick={async () => {
              Modal.confirm({
                title: 'Alo',
                content: 'Are you sure?',
                okText: 'Ok',
                cancelText: 'Cancel',
                onOk: async () => {
                  await handleUpdate(record);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              });
              
            }}
          >
             {record.status == 1? 'Giao hàng': (record.status == 2 ? 'Hoàn thành' : '')}
          </a>
        </>
      ),
    },
  ];

  const handleOnAdd = async () => {
    handleModalVisible(true);
  };
  return (
    <PageContainer>
      <ProTable
        search={false}
        actionRef={actionRef}
        request={(params, sorter, filter) => queryItem({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
             {' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              &nbsp;&nbsp;
              <span>
               {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            
          Remove
          </Button>
          <Button type="primary">Update</Button>
        </FooterToolbar>
      )}
      <CreateForm
        onFinish={onFinish}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        setVarianOption={setVarianOption}
        varianOption={varianOption}
        formVarianRef={formVarianRef}
      ></CreateForm>
      
      <UpdateForm
        onFinish={onFinishUpdate}
        current={current}
        onCancel={() => handleUpdateModalVisible(false)}
        modalVisible={updateModalVisible}
      ></UpdateForm>

      <Drawer
        width={600}
        visible={!!row}
        onClose={() => {
          setRow(undefined);
        }}
        closable={false}
      >
        {row?.name && (
          <ProDescriptions
            column={2}
            title={row?.name}
            request={async () => ({
              data: row || {},
            })}
            params={{
              id: row?.name,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
