import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, message, Input, Drawer, Collapse, Tag, Tooltip } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/NewUpdateForm';
import { FormInstance } from 'antd/lib/form';

import {
  queryItem,
  updateTemplate,
  addRule,
  removeTemplate,
  syncDataToPlatform,
  createTemplate,
} from './service';
/**
 * 添加节点
 * @param fields
 */

/**
 * 更新节点
 * @param fields
 */

const { Panel } = Collapse;
const handleUpdate = async (fields) => {
  const hide = message.loading('Loading');
  try {
    await updateTemplate({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
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
      const res = await updateTemplate(values);
      console.log(res);
      handleUpdateModalVisible(false);
      actionRef.current?.reloadAndRest?.();
    } catch (e) {
      console.log(e);
      message.error('Fail!');
    }
  };


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'Need Id',
          },
        ],
      },
      render: (dom, entity) => {
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
      valueType: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'hasSize',
      sorter: true,
      render: (hasSize) => <span>{hasSize ? 'Has size' : 'Not has size'}</span>,
    },
    {
      title: 'Sizes',
      dataIndex: 'sizes',
      sorter: true,
      render: (sizeTemp) => {
        return (
          <div>
            {sizeTemp.map((temp, index) => {
              return (
                <>
                  <Tooltip title={`Price: ${temp.price}$`}>
                    <Tag>{temp.size}</Tag>
                  </Tooltip>
                </>
              );
            })}
          </div>
        );
      },
    },
    {
      title: 'Varians',
      dataIndex: 'varians',
      sorter: true,
      render: (sizeTemp) => {
        return (
          <div>
            {sizeTemp.map((temp, index) => {
              return (
                <>
                  <Tooltip title={`Value: ${temp.options.map(e => e.varianvalue).join(', ')}  `}>
                    <Tag>{temp.varianname}</Tag>
                  </Tooltip>
                </>
              );
            })}
          </div>
        );
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
              console.log('record', record);
              setCurrent(record);
              setStepFormValues(record);
            }}
          >
            Update 
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
                  await handleRemove(record);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              });
              
            }}
          >
             Delete
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
        headerTitle="
        Add"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button type="primary" onClick={() => handleOnAdd()}>
            Add Template
          </Button>,
        ]}
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
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项&nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo, 0)} 万
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
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
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
