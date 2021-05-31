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

const CreateForm = (props) => {
  const { modalVisible, onCancel, setVarianOption, varianOption } = props;
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [hasSize, setHasSize] = useState(null);
  const [hasVarian, setHasVarian] = useState(null);
  const { Option } = Select;
  const actionRef = useRef();
  const [finalData, setFinalData] = useState();
  const [step, setStep] = useState(1);
  const [columns, setColumns] = useState([]);
  const [images, setImages] = useState([]);


  const fetchCategory = async() => {
    const requestApi = await request();
    const res = await requestApi.get('/category');
    console.log('cate: ', res);
    setCategories(res.data.map(x => {
      return { label: x.name, value: x.id };
    }));
  };


  const handleChangeCategory = (e) => {
    fetchSubCategory(e);
  }
  const fetchSubCategory = async(category) => {
    const requestApi = await request();
    const res = await requestApi.get('/category/' + category);
    setSubCategories(res.data.map(x => {
      return { label: x.name, value: x.id };
    }));
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const groupArr = (oldArr) => {
    let totalLength = 1;
    oldArr.forEach((el) => {
      totalLength *= el.options.length;
    });
    const arr = [];
    for (let i = 0; i < totalLength; i++) {
      const b = {};
      let temp = 0;
      let factor;
      let remain = 1;
      oldArr.forEach((el, index) => {
        if (index === 0) {
          factor = i;
          remain = totalLength / el.options.length;
          temp = Math.floor(factor / remain);
        } else {
          const newFactor = factor - temp * remain;
          temp = Math.floor((factor - temp * remain) / (remain / el.options.length));
          remain /= el.options.length;
          factor = newFactor;
        }
        b[`${el.varianname}`] = el.options[temp].varianvalue;
      });
      b['key'] = i;
      arr.push(b);
    }
    return arr;
  };
  const onFinishFirstStep = (finalData) => {
    const newFinalData = clone(finalData);
    if(finalData.hasVarian){
      const varians = newFinalData.varians;
      const varianObj = groupArr(varians);
      newFinalData.varianObj = varianObj;
      console.log(varianObj);
      setFinalData(newFinalData);
      console.log(newFinalData);
      genColumn(newFinalData);
      setStep(2);
    } else {
      setFinalData(finalData);
      setStep(3);
    }
    
  };

  const formLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const templateTypes = [
    { label: 'Varian product', value: true },
    { label: 'Single product', value: false },
  ];

  const [form] = Form.useForm();
  const handleTableChange = (type = 'price', value, index, finalData) => {
    console.log(finalData);
    const newFinalData = { ...finalData };
    newFinalData.varianObj[index][type] = value;
    setFinalData(newFinalData);
  };
  const handleChange = (value) => {
    setHasVarian(value);
    form.setFieldsValue({ sights: [] });
  };
  const genColumn = (finalData) => {
    if (!finalData) return [];
    if (finalData.varians.length == 0) {
      return [];
    }
    const arr = finalData.varians.map((varian) => {
      return {
        title: varian.varianname,
        dataIndex: varian.varianname,
        key: varian.varianname,
      };
    });
    arr.push({
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text, record, index) => {
        return (
          <input
            onChange={(e) => {
              handleTableChange('price', e.target.value, index, finalData);
            }}
          ></input>
        );
      },
    });
    arr.push({
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
      render: (text, record, index) => {
        return (
          <input
            onChange={(e) => {
              handleTableChange('sku', e.target.value, index, finalData);
            }}
          ></input>
        );
      },
    });
    arr.push({
      title: 'Inventory',
      dataIndex: 'inventory',
      key: 'inventory',
      render: (text, record, index) => {
        return (
          <input
            onChange={(e) => {
              handleTableChange('inventory', e.target.value, index, finalData);
            }}
          ></input>
        );
      },
    });
    console.log(arr);
    setColumns(arr);
  };

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
  const onDrop = (picture) => {
    console.log(picture);
    setImages(picture);
  };
  return (
    <PageContainer>
      <Card>
        {step == 1 ? (
          <Form.Provider
            onFormFinish={(name, info) => {
              let totalData = { ...info.values };
              const form = info.forms;
              const keys = Object.keys(form);
              console.log('cc: ', form);
              for (let i = 0; i < keys.length; i++) {
                if (keys[i].includes('varian')) {
                  const data = form[`${keys[i]}`].getFieldsValue(true);
                  console.log(data);
                  const dataKey = Object.keys(data);
                  const name = dataKey[0];
                  const number = name.split('-')[2];
                  totalData.varians[number].options = data[`${dataKey[0]}`];
                }
              }
              console.log(totalData);
              onFinishFirstStep(totalData);
            }}
          >
            <Form form={form} {...formLayout} name="info-form" autoComplete="off">
              <Form.Item
                label="Sku"
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
              <Form.Item
                name="hasVarian"
                label="Type"
                rules={[{ required: true, message: 'Missing area' }]}
              >
                <Select
                  options={templateTypes}
                  onChange={handleChange}
                  defaultActiveFirstOption={true}
                />

                
              </Form.Item>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Missing area' }]}
              >
                <Select
                  options={categories}
                  onChange={handleChangeCategory}
                  defaultActiveFirstOption={true}
                />
              </Form.Item>

              <Form.Item
                name="sub_category"
                label="Sub Category"
                rules={[{ required: true, message: 'Missing area' }]}
              >
                <Select
                  options={subCategories}
                  defaultActiveFirstOption={true}
                />
              </Form.Item>



              {hasVarian == false ? (
                <>
                  <div>
                    <Form.Item
                      label="Default price"
                      name={['defaultPrice']}
                      fieldKey={['defaultPrice']}
                    >
                      <Input type="number" />
                    </Form.Item>
                    <Form.Item
                      label="Inventory"
                      name={['inventory']}
                      fieldKey={['inventory']}
                    >
                      <Input type="number" />
                    </Form.Item>
                  </div>
                </>
              ) : (
                <></>
              )}

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
                            prevValues.area !== curValues.area ||
                            prevValues.sights !== curValues.sights
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
                                      label="Item Value"
                                      name={[fieldItem.name, `varianvalue`]}
                                      fieldKey={[fieldItem.fieldKey, `varianvalue`]}
                                      rules={[{ required: true, message: 'Missing varianvalue' }]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <MinusCircleOutlined
                                      onClick={() => removeItem(fieldItems.name)}
                                    />
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
                    {hasVarian == true ? (
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
                    ) : (
                      <></>
                    )}
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
        ) : (
          <>
            {step == 2 ? (
              <>
                <Table columns={columns} dataSource={finalData.varianObj}></Table>
                <Button
                  color="primary"
                  type="primary"
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <ImageUploader
                  withIcon={true}
                  buttonText="Choose images"
                  onChange={onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif', 'jpeg']}
                  withPreview={true}
                  maxFileSize={5242880}
                />
                <Button
                  color="primary"
                  type="primary"
                  onClick={() => {
                    createItem(finalData, images);
                  }}
                >
                  Next
                </Button>
              </>
            )}
          </>
        )}
      </Card>
    </PageContainer>
  );
};

export default CreateForm;
