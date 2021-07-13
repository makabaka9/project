import numeral from 'numeral';
import GroupedColumn from './GroupedColumn';
import TimelineChart from './TimelineChart';
import StackedColumn from './StackedColumn';

const yuan = (val: number | string) => `¥ ${numeral(val).format('0,0')}`;

const Charts = {
  yuan,
  StackedColumn,
  GroupedColumn,
  TimelineChart,
};

export { Charts as default, yuan, StackedColumn, GroupedColumn, TimelineChart };
