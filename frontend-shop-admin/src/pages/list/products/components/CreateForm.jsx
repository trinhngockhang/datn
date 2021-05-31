import React, { useState } from 'react';
import { Modal, message } from 'antd';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';
import { createTemplate } from '../service';

const CreateForm = (props) => {
  const { modalVisible, onCancel, onFinish, setVarianOption, varianOption } = props;
  const [hasSize, setHasSize] = useState(null);
  const { Option } = Select;
  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
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
      width={1000}
      style={{ overflowY: 'auto' }}
      visible={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <Form.Provider
        onFormFinish={(name, info) => {
          let totalData = {...info.values};
          const form = info.forms;
          const keys = Object.keys(form);
          for(let i = 0; i < keys.length; i++){
            if(keys[i].includes('varian')){
              const data = form[`${keys[i]}`].getFieldsValue(true);
              console.log(data);
              const dataKey = Object.keys(data);
              const name = dataKey[0];
              const number = name.split('-')[2];
              totalData.varians[number].options = data[`${dataKey[0]}`]; 
            }
          }
          console.log(totalData);
          onFinish(totalData);
        }}
      >
        <Form form={form} {...formLayout} name="info-form" autoComplete="off">
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
          <Form.Item label="Product type" name={['productType']} fieldKey={['productType']}>
                <Input type="text" />
              </Form.Item>
          <Form.Item
            name="hasSize"
            label="Type"
            rules={[{ required: true, message: 'Missing area' }]}
          >
            <Select
              options={templateTypes}
              onChange={handleChange}
              defaultActiveFirstOption={true}
            />
          </Form.Item>

          {hasSize == true ? (
            <></>
          ) : (
            <div>
              <Form.Item label="Default price" name={['defaultPrice']} fieldKey={['defaultPrice']}>
                <Input type="number" />
              </Form.Item>
              <Form.Item label="Compare price" name={['defaultComparePrice']} fieldKey={['defaultComparePrice']}>
                <Input type="number" />
              </Form.Item>
            </div>
          )}
          <Form.List name="sizes">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space key={field.key} align="baseline" style={{ marginLeft: '8rem' }}>
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
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      style={{ width: '118%' }}
                      label="Compare price"
                      name={[field.name, 'comparePrice']}
                      fieldKey={[field.fieldKey, 'comparePrice']}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Space>
                ))}
                {hasSize == true ? (
                  <Form.Item style={{ width: '42%', margin: 'auto', marginBottom: '1.5rem' }}>
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
          <Form.List name="varians">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Space
                    key={field.key}
                    align="baseline"
                    direction="horizontal"
                    style={{
                      paddingLeft: '8rem',
                      marginBottom: '1.5rem',
                      backgroundColor: '#fafafa',
                      width: '100%',
                      display: 'block',
                    }}
                  >
                    <Form.Item
                      noStyle
                      shouldUpdate={(prevValues, curValues) =>
                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                      }
                    >
                      {() => (
                        <Form.Item
                          {...field}
                          label="Varian Name"
                          name={[field.name, `varianname`]}
                          style={{ width: '100%', paddingTop: '0.9rem' }}
                          fieldKey={[field.fieldKey, `varianname`]}
                          rules={[{ required: true, message: 'Missing size' }]}
                        >
                          <Input style={{ width: '90%' }} />
                        </Form.Item>
                      )}
                    </Form.Item>
                    <Form
                      name={`varian-data-${index}`}
                      onValuesChange={(e) => {
                        // console.log(e);
                        // setVarianOption(e)
                      }}
                    >
                      <Form.List name={`varians-options-${index}`}>
                        {(fieldItems, { add: addItem, remove: removeItem }) => (
                          <>
                            {fieldItems.map((fieldItem, index) => (
                              <Space key={fieldItem.key} align="end">
                                <br />
                                <Form.Item
                                  {...fieldItem}
                                  style={{ marginTop: '1rem' }}
                                  label="Item Key"
                                  name={[fieldItem.name, `variankey`]}
                                  fieldKey={[fieldItem.fieldKey, `variankey`]}
                                  rules={[{ required: true, message: 'Missing variankey' }]}
                                >
                                  <Input />
                                </Form.Item>
                                <Form.Item
                                  {...fieldItem}
                                  style={{ marginTop: '1rem' }}
                                  label="Item Value"
                                  name={[fieldItem.name, `varianvalue`]}
                                  fieldKey={[fieldItem.fieldKey, `varianvalue`]}
                                  rules={[{ required: true, message: 'Missing varianvalue' }]}
                                >
                                  <Input />
                                </Form.Item>
                                <MinusCircleOutlined onClick={() => removeItem(fieldItems.name)} />
                              </Space>
                            ))}
                            <br />
                            <Form.Item style={{ width: '100%', marginTop: '1rem' }}>
                              <Button
                                type="dashed"
                                type="primary"
                                onClick={() => addItem()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add Item
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Form>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                    <br />
                  </Space>
                ))}
                <Form.Item style={{ width: '42%', margin: 'auto' }}>
                  <Button
                    type="dashed"
                    type="primary"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Varian
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button type="dashed" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Form.Provider>
    </Modal>
  );
};

export default CreateForm;
