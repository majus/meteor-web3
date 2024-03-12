export const Config = {
  debug: false,
  logger: console,
  template: 'default',
  set(config) {
    return Object.assign(this, config);
  },
};
