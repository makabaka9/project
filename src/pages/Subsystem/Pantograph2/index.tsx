import { Card, Row, Col, Empty, List, Typography, Divider, Tag, Modal } from 'antd';
import React, { Component, useState } from 'react';
import { connect, Dispatch } from 'umi';
import { BasicProfileDataType } from './data.d';
// import LineCodeAndTrainCodeQuery from '../components/LineCodeAndTrainCodeQuery';
import styles from './style.less';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import ComponentFault from './components/ComponentFault';
import RunningTable from './components/RunningTable';
import moment from 'moment';
import RunningMap from './components/RunningMap';
// import { Divider } from 'rc-menu';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import FaultPie from './components/FaultPie';
import ExportExcel from '@/components/exportExcel';



const Pantograph2: React.FC<TrainProps> = (props) => {

  return (
    <div>
    <iframe src="http://192.168.2.105:6370/overviewNanning" width="1668px" height="1000x" seamless />
    </div>
  );
};
// }

export default Pantograph2;
