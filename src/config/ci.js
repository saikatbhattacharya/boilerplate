import baseConfig from './base';

const config = {
  appEnv: 'ci',
  enableDevTools: true,
};

export default Object.freeze(Object.assign({}, baseConfig, config));
