import React from 'react';
import { BasicLayoutProps, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { notification } from 'antd';
import { history, RequestConfig } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { ResponseError } from 'umi-request';
import { queryCurrent } from './services/user';
import logo from '@/assets/logo.png';
import defaultSettings from '../config/defaultSettings';
import FaultNotice from './components/FaultNotice';
import { API } from './services/API';

export async function getInitialState(): Promise<{
  currentUser?: API.CurrentUser;
  settings?: LayoutSettings;
  faultInfo?: API.FaultInfoDataType;
}> {
  // 如果是登录页面，不执行
  if (history.location.pathname !== '/user/login' && !localStorage.getItem('access_token')) {
    history.push('/user/login');
  }
  if (history.location.pathname !== '/user/login' && history.location.pathname !== '/') {
    if (localStorage.getItem('access_token')) {
      try {
        const params = localStorage.getItem('access_token');
        const request = (await queryCurrent(params));
        const currentUser = request;
        return {
          currentUser,
          settings: defaultSettings,
        };
      } catch (error) {
        history.push('/user/login');
      }
    } else {
      history.push('/user/login');
    }
  }
  return {
    settings: defaultSettings,
  };
}

export const layout = ({
  initialState,
}: {
  initialState: { settings?: LayoutSettings, faultInfo?: API.FaultInfoDataType };
}): BasicLayoutProps => {
  return {
    logo: () => <img alt="logo" src={logo} />,
    rightContentRender: () => (
      <div><RightContent />
        {/* <FaultNotice /> */}
      </div>),
    disableContentMargin: false,
    // footerRender: () => <Footer />,
    footerRender: () => (
      <div>
        {/* <Footer /> */}
        <FaultNotice />
      </div>),
    menuHeaderRender: undefined,
    ...initialState?.settings,
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: ResponseError) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    // if (status === 401) {
    //   localStorage.removeItem('access_token');
    // }
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};
const tokenInterceptor = (url, options) => {
  const accessToken = localStorage.getItem('access_token');
  if (accessToken) {
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    return {
      url,
      options: { ...options, headers },
    };
  }
  return {
    url,
    options: { ...options },
  };
};
export const request: RequestConfig = {
  requestInterceptors: [tokenInterceptor],
  errorHandler,
};
