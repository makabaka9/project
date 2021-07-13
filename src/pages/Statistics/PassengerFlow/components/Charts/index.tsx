import numeral from 'numeral';
import TimelineChart from './TimelineChart';
import PassengerLineChart from './PassengerLineChart';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  TimelineChart,
  PassengerLineChart,
};

export { Charts as default, yuan, TimelineChart, PassengerLineChart };
