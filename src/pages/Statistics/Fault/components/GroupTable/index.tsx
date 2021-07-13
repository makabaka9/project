// import { GroupedColumnChart, Chart, Line, Point, Axis } from 'bizcharts';
import { BarChart, DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Card, Table, Col, Row } from 'antd';
import Trend from '../Trend';
import styles from '../../style.less';

export interface HorizonBarProps {
  height?: number;
  forceFit?: boolean;
  // loading?:boolean;
  borderWidth?: number;
  data: {
    faultNum: number | string;
    trainCode: string;
  }[];
  data1: {
    month: string;
    city: number | string;
    temperature: number;
  }[];
  time:string;
}

const columns: any = [
  {
    title: '子系统',
    dataIndex: 'system',
    key: 'system',
    // width: "26%",
  },
  {
    title: '故障数',
    dataIndex: 'index',
    align: 'center',
    key: 'index', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '故障百分比',
    dataIndex: 'range',
    key: 'range',
    align: 'center',
    sorter: (
      a: {
        range: number;
      },
      b: {
        range: number;
      },
    ) => a.range - b.range,
    render: (
      text: React.ReactNode,
      record: {
        status: number;
      },
    ) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
  {
    title: '故障率(本月)',
    dataIndex: 'thisFaultRate',
    align: 'center',
    key: 'thisFaultRate', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '故障率(上月)',
    dataIndex: 'lastFaultRate',
    align: 'center',
    key: 'lastFaultRate', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '故障率(去年同月)',
    dataIndex: 'faultRate',
    align: 'center',
    key: 'faultRate', // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '同比',
    dataIndex: 'range',
    key: 'range',
    align: 'center',
    sorter: (
      a: {
        range: number;
      },
      b: {
        range: number;
      },
    ) => a.range - b.range,
    render: (
      text: React.ReactNode,
      record: {
        status: number;
      },
    ) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
  {
    title: '环比',
    dataIndex: 'range',
    key: 'range',
    align: 'center',
    sorter: (
      a: {
        range: number;
      },
      b: {
        range: number;
      },
    ) => a.range - b.range,
    render: (
      text: React.ReactNode,
      record: {
        status: number;
      },
    ) => (
      <Trend flag={record.status === 1 ? 'down' : 'up'}>
        <span
          style={{
            marginRight: 4,
          }}
        >
          {text}%
        </span>
      </Trend>
    ),
  },
];

const GroupTable: React.FC<HorizonBarProps> = (props) => {
  const {
    height = 1,
    // loading,
    data,
    data1,
    time,
  } = props;
  const padding: [number, number, number, number] = [20, 20, 20, 50];
  const chartHeight = height + 110;

  return (
    <div>
      <Row>
        <Col xl={8} lg={12} sm={24} xs={24}>
        <h3>{time}月各车次故障统计</h3>
          {height > 0 && (
            // <Card
            //   //  loading={loading}
            //   bordered={false}
            //   // title="`${time}`月各车次故障统计"
            //   style={{
            //     height: '100%',
            //     padding: 0
            //   }}
            // >
              <BarChart
                data={data}
                height={chartHeight}
                padding={padding}
                forceFit
                meta={{
                  trainCode: {
                    alias: '车次',
                  },
                  faultNum: {
                    alias: '故障数',
                    // formatter:(v)=>{return `${v}个`}
                  },
                }}
                xField="faultNum"
                yField="trainCode"
                barSize={12}
                label={{
                  position: 'right',
                  style: {
                    stroke: '#ffffff',
                    lineWidth: 1,
                    fontSize: 10,
                  },
                }}
                yAxis={{
                  visible: true,
                  title:{
                    text:"车次"
                  }
                }}
              />
            // </Card>
          )}
        </Col>
        <Col xl={16} lg={12} sm={24} xs={24}>
        <h3>各子系统故障统计</h3>
            {height > 0 && (
                //   <Card
                //   // loading={loading}
                //   bordered={false}
                //   // title="各子系统故障统计"
                //   style={{
                //     height: '100%',
                //     padding:0
                //   }}
                // >
                  <Table<any>
                    className={styles.system}
                    rowKey={(record) => record.index}
                    size="small"
                    columns={columns}
                    dataSource={data1}
                    pagination={{
                      style: {
                        marginBottom: 0,
                      },
                      pageSize: 50,
                    }}
                    scroll={{ y: 260 }}
                  />
                // </Card>
            )}
        </Col>
      </Row>
    </div>
  );
};

export default autoHeight()(GroupTable);
