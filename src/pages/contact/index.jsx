import React from 'react';
import { Row } from 'antd';

import PageLayout from '@/components/PageLayout';
import ContactForm from '@/components/PageFragments/ContactForm';

const seoConfig = {
  path: 'contact',
  title: 'Contact',
  description: `
    Hello folks Rolwin here. You can contact me through the contact form on this page.
    Please feel free to contact me, don't be shy guys,
    just remember Rolwin is always open to talk about web technologies especially Javascript techstacks.
    Currently I'm a part of Gatsby organization on github.
    Find me on github - rolwin100.
  `,
  keywords: [
    '俞敬聲',
    'Joseph',
    'Yu',
    'front-end',
    'developer',
    'JavaScript',
    'React',
    'Vue',
    'Gatsby',
  ],
};

const Contact = () => (
  <PageLayout seoConfig={seoConfig}>
    <div className="marginTopTitle">
      <h1 className="titleSeparate">Contact</h1>
    </div>
    <Row gutter={[40, 20]}>
      <ContactForm />
    </Row>
  </PageLayout>
);

export default Contact;
