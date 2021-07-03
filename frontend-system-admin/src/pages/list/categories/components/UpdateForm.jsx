import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { createTemplate } from '../service';

const UpdateForm = (props) => {
  const { modalVisible, onCancel, onFinish, current } = props;
  const [hasSize, setHasSize] = useState();
  const { Option } = Select;
  useEffect(() => {
    console.log('current', current);
    if (current) {
      form.setFieldsValue({
        ...current,
      });
      setHasSize(current.hasSize);
    }
  }, [props.current]);
  const formLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 13,
    },
  };
  const templateTypes = [
    { label: 'Has size', value: true },
    { label: 'Same size', value: false },
  ];

  const [form] = Form.useForm();

  const handleChange = (value) => {
    setHasSize(value);
    form.setFieldsValue({ sights: [] });
  };

  return (
    <Modal
      destroyOnClose
      title="Add template"
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form form={form} {...formLayout}  name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
        <Form.Item
          label="Id"
          name={['id']}
          fieldKey={['id']}
          rules={[{ required: true, message: 'Missing id' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Name"
          name={['name']}
          fieldKey={['name']}
          rules={[{ required: true, message: 'Missing name' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name={['description']}
          fieldKey={['description']}
          rules={[{ required: true, message: 'Missing description' }]}
        >
            <TextArea placeholder="Description" />
        </Form.Item>
       
        <Form.Item name="hasSize" label="Type" rules={[{ required: true, message: 'Missing area' }]}>
          <Select options={templateTypes} onChange={handleChange} />
        </Form.Item>

        {
          hasSize?
          <></>:
          <Form.Item
          label="Default price"
          name={['defaultPrice']}
          fieldKey={['defaultPrice']}
         
        >
          <Input />
        </Form.Item>
        }
        <Form.List name="sizes">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} align="baseline">
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) =>
                      prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                    }
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="Size"
                        name={[field.name, 'size']}
                        fieldKey={[field.fieldKey, 'size']}
                        rules={[{ required: true, message: 'Missing size' }]}
                      >
                        <Input />
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="Price"
                    name={[field.name, 'price']}
                    fieldKey={[field.fieldKey, 'price']}
                    rules={[{ required: true, message: 'Missing price' }]}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}
              {hasSize ? (
                <Form.Item style={{width: '100%'}}>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add size
                  </Button>
                </Form.Item>
              ) : (
                <></>
              )}
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateForm;
