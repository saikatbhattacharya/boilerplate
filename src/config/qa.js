import baseConfig from './base';

const config = {
  appEnv: 'qa',
  enableDevTools: true,
};

export default Object.freeze(Object.assign({}, baseConfig, config));
