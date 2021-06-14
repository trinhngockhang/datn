import React, { useEffect } from 'react';
import moment from 'moment';
import { Modal, Result, Button, Form, DatePicker, Input, Select } from 'antd';
import styles from '../style.less';
const { TextArea } = Input;
const formLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 13,
  },
};

const OperationModal = (props) => {
  const [form] = Form.useForm();
  const { done, visible, current, onDone, onCancel, onSubmit } = props;
  useEffect(() => {
    if (form && !visible) {
      form.resetFields();
    }
  }, [props.visible]);
  useEffect(() => {
    if (current) {
      form.setFieldsValue({
        ...current,
        createdAt: current.createdAt ? moment(current.createdAt) : null,
      });
    }
  }, [props.current]);

  const handleSubmit = () => {
    if (!form) return;
    form.submit();
  };

  const handleFinish = (values) => {
    if (onSubmit) {
      onSubmit(values);
    }
  };

  const modalFooter = done
    ? {
        footer: null,
        onCancel: onDone,
      }
    : {
        okText: 'Send',
        onOk: handleSubmit,
        onCancel,
      };

  const getModalContent = () => {
    if (done) {
      return (
        <Result
          status="success"
          title="Success"
          subTitle="Create site success。"
          extra={
            <Button type="primary" onClick={onDone}>
              Ok
            </Button>
          }
          className={styles.formResult}
        />
      );
    }

    return (
      <Form {...formLayout} form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'This is required',
            },
          ]}
        >
          <Input placeholder="Name of site" />
        </Form.Item>
        <Form.Item
          name="url"
          label="Url (full url)"
          rules={[
            {
              required: true,
              message: 'This is required',
            },
            {
              type: "url",
              message: "This field must be a valid url."

            }
          ]}
        >
          <Input placeholder="Url of site" />
        </Form.Item>
        <Form.Item
          name="domain"
          label="Other Domain"
          rules={[
            {
              type: "url",
              message: "This field must be a valid url."

            }
          ]}
        >
          <Input placeholder="Url of site" />
        </Form.Item>
        <Form.Item
          name="platform"
          label="Platform"
          rules={[
            {
              required: true,
              message: 'This is required',
            },
          ]}
        >
          <Select placeholder="Platform">
            <Select.Option value="Woocommerce">Woocommerce</Select.Option>
            <Select.Option value="Shopbase">Shopbase</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: false,
              message: 'This is required',
            },
          ]}
        >
          <Input placeholder="Description of site" />
        </Form.Item>
        <Form.Item
          name="apiKey"
          label="API key"
          rules={[
            {
              required: true,
              message: 'Required API key',
            },
          ]}
        >
          <Input placeholder="Key of site" />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: 'Require password',
            },
          ]}
        >
          <Input placeholder="Key of site" />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Modal
      title={done ? null : `Site`}
      className={styles.standardListForm}
      width={640}
      bodyStyle={
        done
          ? {
              padding: '72px 0',
            }
          : {
              padding: '28px 0 0',
            }
      }
      destroyOnClose
      visible={visible}
      {...modalFooter}
    >
      {getModalContent()}
    </Modal>
  );
};

export default OperationModal;
