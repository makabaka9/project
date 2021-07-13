import { Avatar, notification, Card } from "antd";
import { routerRedux } from "dva/router";
import React, { useState, useEffect, FC } from "react";
import { Dispatch, Link, useModel } from "umi";
export interface FaultInfoDataType {
    id?: number,
    trainCode?: string,
    faultCode?: string,
    faultName?: string,
    faultType?: string,
    faultLevel?: number,
    faultDescription?: string,
    faultSolution?: string,
    happendTime?: string,
};
interface TrainsProps {
    dispatch: Dispatch;
    loading: boolean;
  }
   const FaultNotice  = () =>  {
    
    const [updateFaultMsg, setUpdateFaultMsg] = useState<FaultInfoDataType>({});
    const { initialState } = useModel('@@initialState');
    const { currentUser } = initialState || {};
    // const {
    //     dispatch,
    //   } = props;

    useEffect(() => {
        const evtSource = localStorage.getItem('access_token') ?
        new EventSource("/api/monitor/fault/event") : null;
      if (evtSource !== null) {
        evtSource.onmessage = (message) => {
        const data = JSON.parse(message.data.replace(/(\r\n|\n|\r)/gm,""));
        setUpdateFaultMsg(data)
        }
      }
    //     const evtSource = currentUser!=="undefined"?
    //     new EventSource("/api/monitor/fault/event") : "undefined";
    //     if (evtSource !== "undefined") {
    //         evtSource.onmessage = (message) => {
    //             const data = JSON.parse(message.data)
    //             setUpdateFaultMsg(data)
    //         }
    //     }
    }, []);


    const key = updateFaultMsg.id;

    Object.keys(updateFaultMsg).length !== 0 ?
        notification.open({
            message: <div>您有<span style={{ color: "red" }}>1</span>条故障信息
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div style={{  float:"right",width:50,textAlign:"center",backgroundColor:"green"}}>
                <a style={{ color:"#fff",width:30,}} href="/Monitor/Fault">确认</a></div>
             {/* <audio src={NoticeVoice} autoPlay >
                    Your browser does not support the audio element.
            </audio> */}
            </div>,
            description:
                <Card.Meta
                    avatar={<Avatar
                        style={{
                            backgroundColor: updateFaultMsg.faultLevel === 1 ? 'rgb(255,0,0,0.6)' :
                                updateFaultMsg.faultLevel === 2 ? 'orange' : "gold",
                            verticalAlign: 'middle'
                        }}
                        size="large"
                    > {updateFaultMsg.trainCode}
                    </Avatar>}
                    title={<span>{updateFaultMsg.faultType}&emsp;{updateFaultMsg.faultCode}&emsp;{updateFaultMsg.faultLevel}级故障
                     <br />
                    {updateFaultMsg.faultName}</span>
                    }
                    description={<span>
                        检修建议：{updateFaultMsg.faultSolution}
                        <br />
                        发生时间：{updateFaultMsg.happendTime}</span>}
                >

                </Card.Meta>,
                
            // '故障信息详细内容',
            // btn,
            bottom: 20,
            placement: "bottomRight",
            duration: 20,
            key,
            // onClose: handleCancel,
            style: {
                backgroundColor: 'rgb(24,144,255,0.8)'
            },
        })
        : null
    // }, [])
    return <div />

}

export default FaultNotice;
