import React from 'react';
// import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2020 国家先进轨道交通装备创新中心"
    links={[
      {
        key: '智轨云',
        title: '智轨云工业互联网平台',
        href: 'http://139.159.200.101:8080',
        blankTarget: true,
      },
      // {
      //   key: 'github',
      //   title: <GithubOutlined />,
      //   href: 'https://github.com/ant-design/ant-design-pro',
      //   blankTarget: true,
      // },
      // {
      //   key: 'Ant Design',
      //   title: 'Ant Design',
      //   href: 'https://ant.design',
      //   blankTarget: true,
      // },
    ]}
  />
);
