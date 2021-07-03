import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, message, Input, Drawer, Collapse, Tag, Tooltip } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import {
  queryItem,
  setStatus,
  setAds,
  createTemplate,
} from './service';


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
    } catch (e) {
      console.log(e);
      message.error('Fail!');
    }
  };


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (dom, entity) => {
        return <img style={{height:'100px', width:'100px'}} src={dom}/>
      },
    },
    {
      title: 'Image Advertise',
      dataIndex: 'image_advertise',
      render: (dom, entity) => {
        return <img style={{height:'100px', width:'100px'}} src={dom}/>
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Total sale',
      dataIndex: 'total_sale',
    },
    {
      title: 'Rating',
      dataIndex: 'total_rate',
    },
    {
      title: 'Option',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          {"  "}
          <a
            onClick={async () => {
              Modal.confirm({
                title: 'Alo',
                content: 'Are you sure?',
                okText: 'Ok',
                cancelText: 'Cancel',
                onOk: async () => {
                  setSelectedRows([]);
                  await setAds(record.id);
                  actionRef.current?.reloadAndRest?.();
                },
              });
              
            }}
          >
             {record.advertise == 1 ? 'Inactive ads' : 'Active ads'}
          </a>
        </>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable
        actionRef={actionRef}
        rowKey="id"
        request={(params, sorter, filter) => queryItem({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      

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
