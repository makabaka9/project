import { AuditOutlined, PrinterTwoTone } from '@ant-design/icons';
import { Typography, Row, Popover, Button } from 'antd';
import React, { useRef } from 'react';
import moment from 'moment';
import DetailProject from '@/components/DetailProject';
import Metallography from '@/pages/Report/components/Metallography';
import Mechanics from '@/pages/Report/components/Mechanics';
import ReactToPrint from 'react-to-print';
import styles from '../../style.less';
import { ListItemDataType } from '../../data.d';

const CardOrder = (props: { data: ListItemDataType }) => {
  const componentRef = useRef(null);
  const { data } = props;
  if (!data) {
    return null;
  }
  const { orderID, clientCompany, submitTime, clientAgent, clientPhone, sampleName } = data;
  // const clientDateMoment = moment(clientDate).format('YYYY-MM-DD');

  return (
    <div className={styles.filterCardList}>
      <div>
        <Row>
          <Typography.Title level={4} style={{ color: '#52C41A' }}>
            <AuditOutlined twoToneColor="#52c41a" />
            &nbsp; {orderID}
          </Typography.Title>
          <Popover
            trigger="focus"
            content={
              <div>
                <DetailProject data={data} />
              </div>
            }
          >
            <Button type="link">检测委托单详情</Button>
          </Popover>
        </Row>
        <p>
          {clientCompany}-{sampleName}
        </p>
        <p>
          委托人：{clientAgent} &emsp;{clientPhone} &emsp;送检日期：
          {submitTime ? moment(submitTime).format('YYYY-MM-DD HH:mm:ss') : null}
        </p>
      </div>
      <div className={styles.cardItemContent}>
        <Popover
          trigger="focus"
          content={
            <div>
              <ReactToPrint
                trigger={() => (
                  <Button type="primary" shape="round" ghost>
                    <PrinterTwoTone style={{ fontSize: '24px', color: '#08c' }} />
                  </Button>
                )}
                content={() => componentRef.current}
              />
              <MetallographyToPrint ref={componentRef} data={data} />
            </div>
            // <div>
            //   <Metallography data={data} />
            // </div>
          }
        >
          <Button type="primary" ghost shape="round">
            金相实验检测报告
          </Button>
        </Popover>

        <Popover
          trigger="focus"
          content={
            <div>
              <ReactToPrint
                trigger={() => (
                  <Button type="primary" shape="round" ghost>
                    <PrinterTwoTone style={{ fontSize: '24px', color: '#08c' }} />
                  </Button>
                )}
                content={() => componentRef.current}
              />
              <MechanicsToPrint ref={componentRef} data={data} />
            </div>
          }
        >
          <Button type="primary" ghost shape="round">
            力学实验检测报告
          </Button>
        </Popover>

        {/* <div className={styles.cardItemContent}>
          <Popover
            trigger="focus"
            content={
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button type="primary" shape="round" ghost>
                      <PrinterTwoTone style={{ fontSize: '24px', color: '#08c' }} />
                    </Button>
                  )}
                  content={() => componentRef.current}
                />
                <CollectReportsToPrint ref={componentRef} data={data} />
              </div>
            }
          >
            <Button type="primary" shape="round">
              批量打印报告
            </Button>
          </Popover>
        </div> */}
      </div>
    </div>
  );
};
class MetallographyToPrint extends React.Component {
  constructor(props: { fakeData: ListItemDataType }) {
    super(props);
    this.state = { fakeData: [] };
  }

  render() {
    const { data } = this.props;
    return (
      <div className={styles.page}>
        <Metallography data={data} {...this.state.fakeData} />
      </div>
    );
  }
}
class MechanicsToPrint extends React.Component {
  constructor(props: { fakeData: ListItemDataType }) {
    super(props);
    this.state = { fakeData: [] };
  }

  render() {
    const { data } = this.props;
    return (
      <div className={styles.page}>
        <Mechanics data={data} {...this.state.fakeData} />
      </div>
    );
  }
}
// class CollectReportsToPrint extends React.Component {
//   constructor(props: { fakeData: ListItemDataType }) {
//     super(props);
//     this.state = { fakeData: [] };
//   }

//   render() {
//     const { data } = this.props;
//     return (
//       <div>
//         <div className={styles.page}>
//           <Metallography data={data} {...this.state.fakeData} />
//         </div>
//         <div className={styles.page}>
//           <Mechanics data={data} {...this.state.fakeData} />
//         </div>
//       </div>
//     );
//   }
// }

export default CardOrder;
