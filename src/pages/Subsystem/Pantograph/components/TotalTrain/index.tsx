import { Tag } from 'antd';
import React from 'react';
import styles from './index.less';

interface TotalTrainProps {
  height: number;
  // loading: boolean;
  // dispatch: Dispatch<any>;
  // SubsystemAndDoor: BasicProfileDataType;
}
const TotalTrain: React.FC<TotalTrainProps> = (props) => {
  const { height } = props;
  const TrainNumber = [
    { value: 5001, color: 'red' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'green' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'green' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'green' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'green' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'red' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'green' },
    { value: 5001, color: 'blue' },
    { value: 5001, color: 'red' },
  ];
  const TrainTag = TrainNumber.map((item) => (
    <Tag color={item.color} className={styles.tag}>
      {item.value}
    </Tag>
  ));
  return <div style={{ height: height }}>{TrainTag}</div>;
};

export default TotalTrain;
