import React from 'react';
import {
  Col, Form, Input, Button, message,
} from 'antd';

import gatsbyConfig from '@/config/gatsbyConfig';
import * as styles from './ContactForm.module.scss';

const { Item } = Form;
const { TextArea } = Input;

const validateMessages = {
  required: 'This field is required!',
  types: {
    email: 'Not a valid email!',
  },
};

const ContactForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((item) => {
      formData.append(item, data[item]);
    });
    fetch(gatsbyConfig.contactFormUrl, { method: 'POST', body: formData })
      .then(() => {
        message.success('感謝您的回覆！ 🙂');
        form.resetFields();
      })
      .catch((error) => {
        message.error(error);
      });
  };

  return (
    <Col className={styles.contactForm} sm={24} md={24} lg={16}>
      <Form
        form={form}
        name="nest-messages"
        validateMessages={validateMessages}
        onFinish={handleSubmit}
      >
        <Item name={['name']} rules={[{ required: true }]}>
          <Input
            className={styles.input}
            size="large"
            placeholder="Full Name *"
          />
        </Item>
        <Item name={['email']} rules={[{ type: 'email' }]}>
          <Input
            className={styles.input}
            size="large"
            placeholder="Email"
          />
        </Item>
        <Item name={['description']} rules={[{ required: true }]}>
          <TextArea
            className={styles.input}
            size="large"
            placeholder="Description *"
            rows={7}
          />
        </Item>
        <Item>
          <Button
            className={styles.submitButton}
            type="primary"
            size="large"
            shape="round"
            htmlType="submit"
          >
            SUBMIT
          </Button>
        </Item>
      </Form>
    </Col>
  );
};

export default ContactForm;
