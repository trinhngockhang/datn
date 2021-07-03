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
  setStatus,
  removeTemplate,
  createTemplate,
} from './service';

const { Panel } = Collapse;
// const handleUpdate = async (fields) => {
//   const hide = message.loading('Loading');
//   try {
//     await updateTemplate({
//       name: fields.name,
//       desc: fields.desc,
//       key: fields.key,
//     });
//     hide();
//     message.success('Success');
//     return true;
//   } catch (error) {
//     hide();
//     message.error('Fail');
//     return false;
//   }
// };


const handleActive = async (selectedRow) => {
  if (!selectedRow) return true;
  console.log({selectedRow});
  try {
    await setStatus(selectedRow.id);
    message.success('update success');
    return true;
  } catch (error) {
    message.error('update fail');
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
      dataIndex: 'image_url',
      render: (dom, entity) => {
        return <img style={{height:'100px', width:'100px'}} src={dom}/>
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'active',
      render: (dom, entity) => {
        if(dom == 1) return <Tag color="green">Active</Tag>
        else return <Tag color="red">Unactive</Tag>
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
                  await handleActive(record);
                  setSelectedRows([]);
                  actionRef.current?.reloadAndRest?.();
                },
              });
              
            }}
          >
             {record.active == 1 ? 'Inactive' : 'Active'}
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
        reload={() => actionRef.current?.reloadAndRest?.()}
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
