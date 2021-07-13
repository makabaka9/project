import { Card } from 'antd';
import React, { FC, useState, useEffect } from "react";
import { GridContent } from '@ant-design/pro-layout';
import { connect, Dispatch } from 'umi';
import LineCodeAndTrainCodeQuery from '@/components/LineCodeAndTrainCodeQuery';
import TrainSystemTable from './components/TrainSystemTable';
import TrainBasicInfo from './components/TrainBasicInfo';
import { StateType } from './model';
import { routerRedux } from 'dva/router';
import { TrainsMonitorType } from './data';

// import styles from './style.less';

interface LifeSpanProps {
  match: {
    url: string;
    path: string;
    params: any;
  };
  wholeAndLifeSpan: StateType;
  dispatch: Dispatch;
  loading: boolean;
  train: TrainsMonitorType;
}

export const LifeSpan: FC<LifeSpanProps> = (props) => {
  const {
    match,
    dispatch,
    wholeAndLifeSpan,
    // loading
  } = props;
  const { train } = wholeAndLifeSpan;
  const [trainCode, setTrainCode] = useState(match.params.id === ":id" ? "501" : match.params.id);

  // console.log('train',train);
  useEffect(() => {
    dispatch({
      type: 'wholeAndLifeSpan/fetchBasic',
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

  return (
    <GridContent>
      <React.Fragment>
        <div>
          <LineCodeAndTrainCodeQuery
            defaultTrainCode={trainCode}
            onSubmit={clickQuery} />
        </div>
        <Card bordered={false}>
          <TrainBasicInfo train={data} />
        </Card>
        <Card bordered={false}>
          <TrainSystemTable trainCode={trainCode} />
        </Card>
      </React.Fragment>
    </GridContent>
  );
};

export default connect(
  ({
    wholeAndLifeSpan,
    loading,
  }: {
    wholeAndLifeSpan: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    wholeAndLifeSpan,
    loading: loading.effects['wholeAndLifeSpan/fetchBasic'],
  }),
)(LifeSpan);
