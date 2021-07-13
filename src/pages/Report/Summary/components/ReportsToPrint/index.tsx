import { PrinterOutlined } from '@ant-design/icons';
import { Popover, Button } from 'antd';
import React, { useRef } from 'react';
// import moment from 'moment';
import Metallography from '@/pages/Report/components/Metallography';
import Mechanics from '@/pages/Report/components/Mechanics';
import ReactToPrint from 'react-to-print';
import styles from '../../style.less';
import { ListItemDataType } from '../../data.d';

const ReportsToPrint = (props: { data: ListItemDataType }) => {
  const componentRef = useRef(null);
  const { data } = props;
  if (!data) {
    return null;
  }
  // const { orderID, clientCompany, clientDate } = data;
  // const clientDateMoment = moment(clientDate).format('YYYY-MM-DD');

  return (
    <div className={styles.cardItemContent}>
      <Popover
        trigger="focus"
        content={
          <div>
            <ReactToPrint
              trigger={() => (
                <Button type="primary" ghost>
                  <PrinterOutlined style={{ fontSize: '24px', color: '#08c' }} />
                </Button>
              )}
              content={() => componentRef.current}
            />
            <CollectReportsToPrint ref={componentRef} data={data} />
          </div>
        }
      >
        {/* <div> <PrinterTwoTone/></div> */}
        <Button shape="circle">
          <PrinterOutlined />
        </Button>
      </Popover>
    </div>
  );
};

class CollectReportsToPrint extends React.Component {
  constructor(props: { fakeData: ListItemDataType }) {
    super(props);
    this.state = { fakeData: [] };
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={styles.page}>
          <Metallography data={data} {...this.state.fakeData} />
        </div>
        <div className={styles.page}>
          <Mechanics data={data} {...this.state.fakeData} />
        </div>
      </div>
    );
  }
}

export default ReportsToPrint;
