Package.describe({
  name: 'majus:web3',
  version: '0.0.1',
  summary: 'Essential toolkit for web3 application development',
  git: 'https://github.com/majus/meteor-web3',
  documentation: 'README.md',
});

Npm.depends({
  'ethers': '5.7.2',
});

Package.onUse(function (api) {
  api.versionsFrom('2.0');
  api.use(['ecmascript', 'reactive-var']);
  api.use(['templating@1.4.2'], 'client');
  api.mainModule('index.client.js', 'client');
  api.mainModule('index.server.js', 'server');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('majus:web3');
//   api.mainModule('web3-tests.js');
// });
