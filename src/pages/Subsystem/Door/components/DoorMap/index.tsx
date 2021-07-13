import { Row, Col, List, Card } from 'antd';
import React from 'react';
import doorGreenIcon from '@/assets/doorGreen.svg';
import doorRedIcon from '@/assets/doorRed.svg';
import doorYellowIcon from '@/assets/doorYellow.svg';
import styles from '../../style.less';

interface DoorMapProps {
  // loading: boolean;
  // dispatch: Dispatch<any>;
  // SubsystemAndDoor: BasicProfileDataType;
  data: Array<string>;
}
const DoorMap: React.FC<DoorMapProps> = (props) => {
  const { data } = props;
  return (
    <div>
      <List
        grid={{
          gutter: 16,
          column: 6,
          // xs: 1,
          // sm: 2,
          // md: 4,
          // lg: 4,
          // xl: 6,
          // xxl: 3,
        }}
        dataSource={data}
        renderItem={itemCoach => (
          <List.Item>
            <Card bodyStyle={{ padding: 0, textAlign: "center", }} style={{ borderWidth: 1, borderStyle: "solid", borderColor: "gray", borderRadius: 20, }}>
              <div style={{ textAlign: 'center', padding: 0 }}>{itemCoach.name}</div>
              <List
                style={{ padding: 0 }}
                grid={{
                  gutter: 16,
                  column: 4,
                }}
                dataSource={itemCoach.value}
                renderItem={itemDoor => (
                  <List.Item>
                    <div> <img src={itemDoor.state === 0 ? doorGreenIcon
                      : itemDoor.state === 1 ? doorYellowIcon : doorRedIcon} className={styles.icon} />
                    </div>
                    {itemDoor.doorCode}
                  </List.Item>
                )}
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default DoorMap;
