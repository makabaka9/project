import { DonutChart } from 'bizcharts';
import React from 'react';
import autoHeight from '@/components/autoHeight';
import { Avatar, List, Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export interface HorizonBarProps {
//   height?: number;
//   forceFit?: boolean;
//   borderWidth?: number;
//   data: {
//     type: number | string;
//     value: number;
//   }[];
}

const PurchaseReminder: React.FC<HorizonBarProps> = (props) => {
//   const { height = 1, data } = props;
  const dataSource=[
      {id:1,sort:"消耗件",name:"我是白织灯",number:5,time:"2020-11-20 05:48:25"},
      {id:2,sort:"消耗件",name:"我是白织灯",number:5,time:"2020-11-20 05:48:25"},
      {id:3,sort:"消耗件",name:"我是白织灯",number:5,time:"2020-11-20 05:48:25"},
    //   {id:4,sort:"消耗件",name:"我是白织灯",number:5,time:"2020-11-20 05:48:25"},
  ]
  return (
    <div>
       {/* <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        > */}
          <List
            dataSource={dataSource}
            renderItem={item => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar 
                    style={{ color: '#f56a00' }}
                    icon={<ExclamationCircleOutlined />} />
                  }
                  title={<a style={{fontSize:16}}>{item.name}&emsp;{item.number}</a>}
                  description={<a style={{fontSize:12,color:"#bfbfbf"}}>{item.sort}&emsp;发生时间：{item.time}</a>}
                />
                {/* <div>Content</div> */}
              </List.Item>
            )}
          >
            {/* {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container"> */}
                <Spin />
              {/* </div>
            )} */}
          </List>
        {/* </InfiniteScroll> */}
    </div>
  );
};

export default autoHeight()(PurchaseReminder);
