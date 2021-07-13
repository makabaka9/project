// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings'; // import darkTheme from '@ant-design/dark-theme';

import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {
    dark: false, // 开启暗色主题
    // compact: true, // 开启紧凑主题
  },
  dva: {
    hmr: true,
  },
  layout: {
    // name: '南宁城市轨道交通车辆智能运维系统',
    name: '工艺信息公共服务平台',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      name: '项目',
      icon: 'EditOutlined',
      path: 'ProjectHome',
      component:'./Project/ProjectHome'
    },
    {
      name: '检测管理',
      icon: 'CheckSquareOutlined',
      path: 'Check',
      //authority: ['0', '5', '6'],
      routes: [
        {
          path: 'TaskAssign',
          name: '任务分配',
          //authority: ['0', '5'],
          // icon: 'smile',
          component: './Check/TaskAssign', // authority: ['admin'],
        },
        {
          path: 'Record',
          name: '数据编制',
          //authority: ['0', '5', '6'],
          component: './Check/Record', // authority: ['admin'],
        },
        {
          path: 'Review',
          name: '数据审核',
          //authority: ['0', '5', '6'],
          component: './Check/Review', // authority: ['admin'],
        },
      ],
    },
    {
      name: '报告管理',
      icon: 'AuditOutlined',
      path: 'Report',
      // authority: ['0', '2', '5', '6'],
      routes: [
        {
          path: 'Review',
          name: '报告审核',
          // authority: ['0', '5', '6'],
          component: './Report/Review', // authority: ['admin'],
        },
        {
          path: 'Approve',
          name: '报告批准',
          // authority: ['0'],
          component: './Report/Approve', // authority: ['admin'],
        },
        {
          name: '报告汇总',
          path: 'Summary',
          // authority: ['0', '2'],
          component: './Report/Summary',
        },
      ],
    },
    {
      name: '工艺研发',
      
      path: '/Submit',
      // authority: ['0', '1'],
      routes: [
        {
          name: '项目列表',
          path: 'OrderList',
          component: './Submit/OrderList',
        },
        // {
        //   name: '项目列表',
        //   path: 'UserList',
        //   component: './Submit/UserList',
        // },
        {
          name: '计量校准委托单填写',
          path: 'CalibrationTest',
          component: './Submit/CalibrationTest',
        },
      ],
    },

    {
      name: '工具工装管理',
      icon: 'UserSwitchOutlined',
      path: '/Userlist',
      //authority: ['0'],
      component: './UserList',
    },
    {
      path: '/',
      redirect: '/Monitor/Global1',
    }, // ******南宁5菜单*******
    {
      menu: {
        name: '运行监控',
      },
      icon: 'LaptopOutlined',
      path: '/Monitor',
      routes: [
        {
          menu: {
            name: '线路监控',
          },
          path: 'Global1',
          component: './Monitor/Global1',
        },
        // {
        //   menu: {
        //     name: '线路监控1',
        //   },
        //   path: 'Global2',
        //   component: './Monitor/Global2',
        // },
        // {
        //   menu: {
        //     name: '全局监控',
        //   },
        //   path: 'Global',
        //   component: './Monitor/Global',
        // },
        {
          menu: {
            name: '状态预览',
          },
          path: 'State',
          component: './Monitor/State',
        },
        {
          menu: {
            name: '车辆监控',
          },
          path: 'Trains/:id',
          component: './Monitor/Trains',
        },
        {
          menu: {
            name: 'HMI同屏',
          },
          path: 'Trains1/:id',
          component: './Monitor/Trains1',
        },
        {
          menu: {
            name: '故障监控',
          },
          path: 'Fault',
          component: './Monitor/Fault',
        },
        // {
        //   menu: {
        //     name: '数据回放',
        //   },
        //   path: 'Data/:id',
        //   component: './Monitor/Data',
        // },

        // {
        //   menu: {
        //     name: '通讯状态',
        //   },
        //   path: 'Signal',
        //   component: './Monitor/Signal',
        // },
      ],
    },
    {
      menu: {
        name: '子系统',
      },
      icon: 'ApartmentOutlined',
      path: '/Subsystem',
      routes: [
        {
          menu: {
            name: '空调',
          },
          path: 'AirConditioner/:id',
          component: './Subsystem/AirConditioner',
        },
        {
          menu: {
            name: '牵引',
          },
          path: 'Traction/:id',
          component: './Subsystem/Traction',
        },
        {
          menu: {
            name: '辅助',
          },
          path: 'Assistance/:id',
          component: './Subsystem/Assistance',
        },
        {
          menu: {
            name: '制动',
          },
          path: 'Brake/:id',
          component: './Subsystem/Brake',
        },
        {
          menu: {
            name: '车门',
          },
          path: 'Door/:id',
          component: './Subsystem/Door',
        },
        {
          menu: {
            name: '烟火',
          },
          path: 'Pyrotechnic/:id',
          component: './Subsystem/Pyrotechnic',
        },
        {
          menu: {
            name: 'PIS',
          },
          path: 'PIS/:id',
          component: './Subsystem/PIS',
        },
        {
          menu: {
            name: '弓网',
          },
          path: 'Pantograph/:id',
          component: './Subsystem/Pantograph2',
        },
        {
          menu: {
            name: '走行部',
          },
          path: 'Running/',
          component: './Subsystem/Running2',
        },
      ],
    },
    // {
    //   menu: {
    //     name: '故障管理',
    //   },
    //   icon: 'ToolOutlined',
    //   path: '/Fault',
    //   routes: [
    //     {
    //       menu: {
    //         name: '当前故障',
    //       },
    //       path: 'Current/:id',
    //       component: './Fault/Current',
    //     },
    //     {
    //       menu: {
    //         name: '历史故障',
    //       },
    //       path: 'History',
    //       component: './Fault/History',
    //     },
    //     {
    //       menu: {
    //         name: '故障清单',
    //       },
    //       path: 'ListItem',
    //       component: './Fault/ListItem',
    //     },
    //   ],
    // },
    {
      menu: {
        name: '整车分析',
      },
      icon: 'DashboardOutlined',
      path: '/Whole',
      routes: [
        {
          menu: {
            name: '舒适性分析',
          },
          path: 'Comfort',
          component: './Whole/Comfort',
        },
        {
          menu: {
            name: '可靠性分析',
          },
          path: 'Reliability',
          component: './Whole/Reliability',
        },
      ],
    },
    {
      menu: {
        name: '运营分析',
      },
      icon: 'LineChartOutlined',
      path: '/Statistics',
      routes: [
        // {
        //   menu: {
        //     name: '能耗分析',
        //   },
        //   icon: 'ReloadOutlined',
        //   path: 'Energy',
        //   component: './Statistics/Energy',
        // },
        {
          menu: {
            name: '故障统计',
          },
          path: 'Fault',
          component: './Statistics/Fault',
        },
        {
          menu: {
            name: '客运统计',
          },
          path: 'PassengerFlow',
          component: './Statistics/PassengerFlow',
        },
        {
          menu: {
            name: '旅速统计',
          },
          path: 'TravelSpeed',
          component: './Statistics/TravelSpeed',
        },
        {
          menu: {
            name: '里程统计',
          },
          path: 'Mileage',
          component: './Statistics/Mileage',
        },
      ],
    },


    {
      menu: {
        name: '车辆履历管理',
      },
      icon: 'HomeOutlined',
      path: '/Basic',
      routes: [
        // {
        //   name: '线路管理',
        //   path: 'Line',
        //   component: './Basic/Line',
        // },
        {
          menu: {
            name: '车辆基础信息',
          },
          path: 'Train',
          component: './Basic/Train',
        },
        {
          menu: {
            name: '检修记录',
          },
          path: 'Repair',
          component: './Basic/Repair',
        },
        {
          menu: {
            name: '轮径变更',
          },
          path: 'Wheel',
          component: './Basic/Wheel',
        },
        {
          menu: {
            name: '设备档案',
          },
          path: 'Device',
          component: './Basic/Device',
        },
        {
          menu: {
            name: '硬件变更',
          },
          path: 'Hardware',
          component: './Basic/Hardware',
        },
        {
          menu: {
            name: '软件版本变更',
          },
          path: 'SoftVersion',
          component: './Basic/SoftVersion',
        },
        {
          menu: {
            name: '站点管理',
          },
          path: 'Station',
          component: './Basic/Station',
        },
      ],

    },
    {
      menu: {
        name: '备品备件管理',
      },
      icon: 'BlockOutlined',
      path: '/spare',
      component: './Spare',
    },
    {
      menu: {
        name: '文档管理',
      },
      icon: 'FolderOpenOutlined',
      path: '/File',
      component: './File',
    },
    // {
    //   menu: {
    //     name: '车载分析',
    //   },
    //   icon: 'BarChartOutlined',
    //   path: '/Vehicle',
    //   routes: [
    //     {
    //       menu: {
    //         name: '软件版本',
    //       },
    //       path: 'Version',
    //       component: './Vehicle/Version',
    //     },
    //     {
    //       menu: {
    //         name: '文件数据',
    //       },
    //       path: 'FileData',
    //       component: './Vehicle/FileData',
    //     },
    //     // {
    //     //   name: '通讯状态',
    //     //   path: 'Signal',
    //     //   component: './Vehicle/Signal',
    //     // },
    //   ],
    // },

    {
      menu: {
        name: '系统管理',
      },
      icon: 'UserSwitchOutlined',
      path: '/System',
      routes: [
        {
          menu: {
            name: '用户管理',
          },
          path: 'User',
          component: './System/User',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  devServer: {
    compress: false
  }
});
