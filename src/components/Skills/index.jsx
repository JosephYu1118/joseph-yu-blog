import React from 'react';
import { Row, Col } from 'antd';

import skillMap from '@/lib/skillMap';
import ProgressBar from '@/components/ProgressBar';
import ProgressCircle from '@/components/ProgressCircle';
import * as styles from './Skills.module.scss';

const Skills = () => (
  <>
    <h2 className="subTitle">Main skills</h2>
    <Row gutter={[20, 20]}>
      {skillMap.main.map(({ title, value }) => (
        <Col key={title} xs={12} sm={12} md={8} lg={4}>
          <ProgressCircle title={title} value={value} />
        </Col>
      ))}
    </Row>
    <h2 className="subTitle">Related skills</h2>
    <Row gutter={[10, 10]}>
      {skillMap.related.map(({ title, value }) => (
        <Col key={title} xs={24} sm={24} md={12} lg={12}>
          <ProgressBar title={title} value={value} />
        </Col>
      ))}
    </Row>
    <h2 className="subTitle chinese">其他正在學習、工作曾經使用過的技能：</h2>
    <ul className={styles.otherSkills}>
      {skillMap.others.map((skill) => (
        <li key={skill} className={styles.badge}>{skill}</li>
      ))}
    </ul>
  </>
);

export default Skills;
