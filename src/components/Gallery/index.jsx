import React from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import { Row, Col } from 'antd';

const Gallery = ({ imageList }) => (
  <>
    <h2 className="subTitle">Gallery</h2>
    <Row gutter={[10, 10]}>
      {imageList.map(({ id, gatsbyImageData }) => (
        <Col key={id} xs={24} sm={24} md={12} lg={8}>
          <GatsbyImage className="eventDisabled" image={gatsbyImageData} alt="" />
        </Col>
      ))}
    </Row>
  </>
);

export default Gallery;
