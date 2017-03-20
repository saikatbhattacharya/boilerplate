import baseConfig from './base';

const config = {
  appEnv: 'uat',
  enableDevTools: false,
};

export default Object.freeze(Object.assign({}, baseConfig, config));
