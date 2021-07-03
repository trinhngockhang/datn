import React, { useEffect, useRef, useState } from 'react';
import { Modal, message, Card } from 'antd';
import { Form, Input, Button, Upload, Select, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { clone } from 'lodash';
import request from '@/utils/request';
import ImageUploader from 'react-images-upload';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { history, connect } from 'umi';
const CreateForm = (props) => {

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };

  const [form] = Form.useForm();
 


  const createItem = async (finalData, images) => {
    const requestApi = request();
    console.log('FINAL: ', finalData);
    // upload images
    console.log(images);
    const data = new FormData();
    data.append('name', 'Image Upload');
    images.forEach((image) => data.append('files', image))
    
    const res = await requestApi('/image/upload', {
      method: 'POST',
      data,
    });
    console.log(res.data);
    // create item
    const resItem = await requestApi('/item', {
      method: 'POST',
      data: {...finalData, images: res.data},
    });
  };

  const uploadProp = {
    name: 'file',
    action: 'https://image.k-ecommerce.xyz',
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  const finish = async(values) => {
    const requestApi = request();
    const requestImage = request('https://image.k-ecommerce.xyz');
    console.log(values.upload.target.files[0]);
    const data = new FormData();
    data.append('name', 'Image Upload');
    data.append('files', values.upload.target.files[0])
    
    const res = await requestImage('/image/upload', {
      method: 'POST',
      data,
    });
    console.log(res.data);
    // create item
    const resItem = await requestApi('/category', {
      method: 'POST',
      data: { name: values.name, sub: values.sub , image: res.data},
    });
    message.success('Create category successfully!');
    history.push('/list/categories');
  }
  return (
    <PageContainer>
      <Card>
      <Form form={form} {...formLayout} name="info-form" autoComplete="off" onFinish={finish}>
              <Form.Item
                label="Name"
                name={['name']}
                fieldKey={['name']}
                rules={[{ required: true, message: 'Missing name' }]}
              >
                <Input />
                </Form.Item>
                <Form.Item
                label="Sub category"
                name={['sub']}
                fieldKey={['sub']}
                extra="Space by comma"
                rules={[{ required: true, message: 'Missing sub' }]}
              >
                <Input />
                </Form.Item>
                <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        extra="Update image"
        rules={[{ required: true, message: 'Missing image' }]}
      >
          <Input type="file" onChange={(e) => {
            console.log(e);
          }}/>
      </Form.Item>
      <Form.Item>  <Button htmlType="submit">Save</Button></Form.Item>
               
                </Form>
      </Card>
    </PageContainer>
  );
};

export default CreateForm;
