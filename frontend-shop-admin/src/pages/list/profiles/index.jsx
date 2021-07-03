import React, { useEffect, useRef, useState } from 'react';
import { Modal, message, Card } from 'antd';
import { Form, Input, Button, Space, Select, Table } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import { clone } from 'lodash';
import request from '@/utils/request';
import ImageUploader from 'react-images-upload';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

const CreateForm = (props) => {
  const [fileList, setFileList] = useState([
  ]);
  const [fileListAd, setFileListAd] = useState([
  ]);

  const [myName, setMyName] = useState('');

  const fetchName = async () => {
    const requestApi = request();
    const res = await requestApi.get('/item/shop-name');
    console.log(res);
    setMyName(res.data);
  }
  useEffect(() => { 
    fetchName()
  }, []);

  const onChangeAvatar = async ({ file, event, fileList: newFileList }) => {
    // setFileList(newFileList);
    const requestImage = request('https://image.k-ecommerce.xyz');
    const data = new FormData();
    data.append('files', file)
    const res = await requestImage('/image/upload', {
      method: 'POST',
      data,
    });
    console.log(res.data);
    newFileList[0].url = res.data[0];
    const requestApi = request();
    const ress = await requestApi.put('/item/avatar', {data: {
      name: res.data[0]
    }});
    setFileList(newFileList);
  };


  const onChangeAd = async ({ file, event, fileList: newFileList }) => {
    // setFileList(newFileList);
    const requestImage = request('https://image.k-ecommerce.xyz');
    const data = new FormData();
    data.append('files', file)
    const res = await requestImage('/image/upload', {
      method: 'POST',
      data,
    });
    console.log(res.data);
    newFileList[0].url = res.data[0];
    const requestApi = request();
    const resa = await requestApi.put('/item/advertise', {data: {
      name: res.data[0]
    }});
    setFileListAd(newFileList);
  };

  const finish = async (data) => {
    console.log(data);
    const requestApi = request();
    const res = await requestApi.put('/item/profile', {data: {
      name: data.name
    }});
    window.location='/list/products';
  }
  return (
    <PageContainer>
        <span>Avatar</span>
        <Upload
            // action="https://image.k-ecommerce.xyz/image/upload"
            listType="picture-card"
            name="files"
            fileList={fileList}
            onChange={onChangeAvatar}
          >
            {fileList.length < 1 && '+ Up23load'}
          </Upload>

          <span>Advertise image</span>
          <Upload
            // action="https://image.k-ecommerce.xyz/image/upload"
            listType="picture-card"
            name="ad"
            fileList={fileListAd}
            onChange={onChangeAd}
          >
            {fileListAd.length < 1 && '+ U2pload'}
          </Upload>
          
      <Form onFinish={finish}>
             <Form.Item
                label="Name"
                name={['name']}
                fieldKey={['name']}
              >
                <Input style={{ width: '20%' }}/>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default CreateForm;
