import React from 'react';
import { Row } from 'antd';

import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/ContactForm';

const seoConfig = {
  path: 'contact',
  title: 'Contact',
  description: '若有任何建議或問題，歡迎在這裡告訴我！',
};

const Contact = ({ location }) => (
  <PageLayout seoConfig={seoConfig} location={location}>
    <h1 className="mainTitle">Contact</h1>
    <Row gutter={[40, 20]}>
      <ContactForm />
    </Row>
  </PageLayout>
);

export default Contact;
