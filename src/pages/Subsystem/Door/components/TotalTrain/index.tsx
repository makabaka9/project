import { Tag } from 'antd';
import React from 'react';
import styles from './index.less';
// import autoHeight from '@/components/autoHeight';

interface TotalTrainProps {
  height: number;
  // loading: boolean;
  // dispatch: Dispatch<any>;
  // SubsystemAndDoor: BasicProfileDataType;
}
const TotalTrain: React.FC<TotalTrainProps> = (props) => {
  const { height } = props;

  const TrainNumber = [
    { value: 1215, color: 'red' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'green' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'green' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'green' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'green' },
    { value: 1215, color: 'blue' },
    { value: 1215, color: 'red' },
    { value: 1215, color: 'red' },
  ];
  const TrainTag = TrainNumber.map((item) => (
    <Tag color={item.color} className={styles.tag}>
      {item.value}
    </Tag>
  ));
  return <div style={{ height: height }}>{TrainTag}</div>;
};
export default TotalTrain;
// export default autoHeight()(TotalTrain);
