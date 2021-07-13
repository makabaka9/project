import { Card, Col, Descriptions, Form, Row, Select } from 'antd';
import React, { FC, useState, useEffect } from "react";
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
const { Option } = Select;
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import TrainSystemTable from './components/TrainSystemTable';
import TrainBasicInfo from './components/TrainBasicInfo';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import { TrainsMonitorType } from './data';
import RelationMap from './components/RelationMap';
import SingleTrainMap from './components/SingleTrainMap';

// import styles from './style.less';

interface LifeSpanProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  wholeAndCorrelationParameter: StateType;
  dispatch: Dispatch;
  loading: boolean;
  train: TrainsMonitorType;
}

export const LifeSpan: FC<LifeSpanProps> = (props) => {
  const {
    match,
    dispatch,
    wholeAndCorrelationParameter,
    // loading
  } = props;
  const { train } = wholeAndCorrelationParameter;
  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? "501" : match.params.id);

  // console.log('train',train);
  useEffect(() => {
    dispatch({
      type: 'wholeAndCorrelationParameter/fetchBasic',
      payload: {
        trainCode: trainCode,
      },
    });
  }, []);

  const clickQuery = (event: { trainCode: string }) => {
    const varCode: string = event.trainCode === undefined ? trainCode : event.trainCode;
    setTrainCode(varCode)
    dispatch(routerRedux.push(`/Statistics/LifeSpan/${varCode}`));
  }

  const data: any = {
    trainCode: '0401',
  }

  const singledata = [
    {
      year: "国博中心南站 2020.09.28 08:00",
      type: '网压',
      value: 3,
    },
    {
      year: "国博中心南站 2020.09.28 08:00",
      type: '电流',
      value: 4,
    },
    {
      year: "国博中心南站 2020.09.28 08:00",
      type: '载荷',
      value: 5,
    },
    {
      year: "老关村站 2020.09.28 08:15",
      type: '网压',
      value: 4,
    },
    {
      year: "老关村站 2020.09.28 08:15",
      type: '电流',
      value: 5,
    },
    {
      year: "老关村站 2020.09.28 08:15",
      type: '载荷',
      value: 6,
    },
    {
      year: "老关村车辆段站 2020.09.28 08:30",
      type: '网压',
      value: 3.5,
    },
    {
      year: "老关村车辆段站 2020.09.28 08:30",
      type: '电流',
      value: 4.5,
    },
    {
      year: "老关村车辆段站 2020.09.28 08:30",
      type: '载荷',
      value: 5.5,
    },
    {
      year: "沌口站 2020.09.28 08:45",
      type: '网压',
      value: 5,
    },
    {
      year: "沌口站 2020.09.28 08:45",
      type: '电流',
      value: 6,
    },
    {
      year: "沌口站 2020.09.28 08:45",
      type: '载荷',
      value: 7,
    },
    {
      year: "川江池站 2020.09.28 09:00",
      type: '网压',
      value: 4.9,
    },
    {
      year: "川江池站 2020.09.28 09:00",
      type: '电流',
      value: 5.9,
    },
    {
      year: "川江池站 2020.09.28 09:00",
      type: '载荷',
      value: 6.9,
    },
    {
      year: "硃山路站 2020.09.28 09:15",
      type: '网压',
      value: 6,
    },
    {
      year: "硃山路站 2020.09.28 09:15",
      type: '电流',
      value: 7,
    },
    {
      year: "硃山路站 2020.09.28 09:15",
      type: '载荷',
      value: 8,
    },
    {
      year: "檀军路站 2020.09.28 09:30",
      type: '网压',
      value: 7,
    },
    {
      year: "檀军路站 2020.09.28 09:30",
      type: '电流',
      value: 8,
    },
    {
      year: "檀军路站 2020.09.28 09:30",
      type: '载荷',
      value: 9,
    },
    {
      year: "清江站 2020.09.28 09:45",
      type: '网压',
      value: 9,
    },
    {
      year: "清江站 2020.09.28 09:45",
      type: '电流',
      value: 10,
    },
    {
      year: "清江站 2020.09.28 09:45",
      type: '载荷',
      value: 11,
    },
    {
      year: "马影河站 2020.09.28 10:00",
      type: '网压',
      value: 9,
    },
    {
      year: "马影河站 2020.09.28 10:00",
      type: '电流',
      value: 10,
    },
    {
      year: "马影河站 2020.09.28 10:00",
      type: '载荷',
      value: 11,
    },
    {
      year: "协子河站 2020.09.28 10:15",
      type: '网压',
      value: 12,
    },
    {
      year: "协子河站 2020.09.28 10:15",
      type: '电流',
      value: 13,
    },
    {
      year: "协子河站 2020.09.28 10:15",
      type: '载荷',
      value: 14,
    },
    {
      year: "职教园站 2020.09.28 10:30",
      type: '网压',
      value: 13.5,
    },
    {
      year: "职教园站 2020.09.28 10:30",
      type: '电流',
      value: 14.5,
    },
    {
      year: "职教园站 2020.09.28 10:30",
      type: '载荷',
      value: 15.5,
    },
    {
      year: "周家河站 2020.09.28 10:45",
      type: '网压',
      value: 15,
    },
    {
      year: "周家河站 2020.09.28 10:45",
      type: '电流',
      value: 16,
    },
    {
      year: "周家河站 2020.09.28 10:45",
      type: '载荷',
      value: 17,
    },
  ];
  const multipledata = [
    {
      year: "国博中心南站 2020.09.28 08:00",
      type: '1601',
      value: 3,
    },
    {
      year: "国博中心南站 2020.09.28 08:00",
      type: '1602',
      value: 4,
    },
    {
      year: "国博中心南站 2020.09.28 08:00",
      type: '1603',
      value: 5,
    },
    {
      year: "老关村站 2020.09.28 08:15",
      type: '1601',
      value: 4,
    },
    {
      year: "老关村站 2020.09.28 08:15",
      type: '1602',
      value: 5,
    },
    {
      year: "老关村站 2020.09.28 08:15",
      type: '1603',
      value: 6,
    },
    {
      year: "老关村车辆段站 2020.09.28 08:30",
      type: '1601',
      value: 3.5,
    },
    {
      year: "老关村车辆段站 2020.09.28 08:30",
      type: '1602',
      value: 4.5,
    },
    {
      year: "老关村车辆段站 2020.09.28 08:30",
      type: '1603',
      value: 5.5,
    },
    {
      year: "沌口站 2020.09.28 08:45",
      type: '1601',
      value: 5,
    },
    {
      year: "沌口站 2020.09.28 08:45",
      type: '1602',
      value: 6,
    },
    {
      year: "沌口站 2020.09.28 08:45",
      type: '1603',
      value: 7,
    },
    {
      year: "川江池站 2020.09.28 09:00",
      type: '1601',
      value: 4.9,
    },
    {
      year: "川江池站 2020.09.28 09:00",
      type: '1602',
      value: 5.9,
    },
    {
      year: "川江池站 2020.09.28 09:00",
      type: '1603',
      value: 6.9,
    },
    {
      year: "硃山路站 2020.09.28 09:15",
      type: '1601',
      value: 6,
    },
    {
      year: "硃山路站 2020.09.28 09:15",
      type: '1602',
      value: 7,
    },
    {
      year: "硃山路站 2020.09.28 09:15",
      type: '1603',
      value: 8,
    },
    {
      year: "檀军路站 2020.09.28 09:30",
      type: '1601',
      value: 7,
    },
    {
      year: "檀军路站 2020.09.28 09:30",
      type: '1602',
      value: 8,
    },
    {
      year: "檀军路站 2020.09.28 09:30",
      type: '1603',
      value: 9,
    },
    {
      year: "清江站 2020.09.28 09:45",
      type: '1601',
      value: 9,
    },
    {
      year: "清江站 2020.09.28 09:45",
      type: '1602',
      value: 10,
    },
    {
      year: "清江站 2020.09.28 09:45",
      type: '1603',
      value: 11,
    },
    {
      year: "马影河站 2020.09.28 10:00",
      type: '1601',
      value: 9,
    },
    {
      year: "马影河站 2020.09.28 10:00",
      type: '1602',
      value: 10,
    },
    {
      year: "马影河站 2020.09.28 10:00",
      type: '1603',
      value: 11,
    },
    {
      year: "协子河站 2020.09.28 10:15",
      type: '1601',
      value: 12,
    },
    {
      year: "协子河站 2020.09.28 10:15",
      type: '1602',
      value: 13,
    },
    {
      year: "协子河站 2020.09.28 10:15",
      type: '1603',
      value: 14,
    },
    {
      year: "职教园站 2020.09.28 10:30",
      type: '1601',
      value: 13.5,
    },
    {
      year: "职教园站 2020.09.28 10:30",
      type: '1602',
      value: 14.5,
    },
    {
      year: "职教园站 2020.09.28 10:30",
      type: '1603',
      value: 15.5,
    },
    {
      year: "周家河站 2020.09.28 10:45",
      type: '1601',
      value: 15,
    },
    {
      year: "周家河站 2020.09.28 10:45",
      type: '1602',
      value: 16,
    },
    {
      year: "周家河站 2020.09.28 10:45",
      type: '1603',
      value: 17,
    },
  ];

  return (
    <div>
      <Row gutter={24}>
        <Col xl={24} lg={12} sm={24} xs={24}>
          <Card bordered={false} style={{ marginBottom: 16, padding: 24 }}
            //  className={styles.title}
            bodyStyle={{ padding: 0 }}>
            <SingleTrainMap
              singledata={singledata}
              multipledata={multipledata}
              height={200}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect(
  ({
    wholeAndCorrelationParameter,
    loading,
  }: {
    wholeAndCorrelationParameter: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    wholeAndCorrelationParameter,
    loading: loading.effects['wholeAndCorrelationParameter/fetchBasic'],
  }),
)(LifeSpan);
