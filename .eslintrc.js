// module.exports = {
//   extends: [require.resolve('@umijs/fabric/dist/eslint')],
//   globals: {
//     ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
//     page: true,
//     REACT_APP_ENV: true,
//   },
// };
// // const fabric = require('@umijs/fabric');

// // module.exports = fabric.eslint;
// const fabric = require('@umijs/fabric');

// module.exports = fabric.eslint;
module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};