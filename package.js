Package.describe({
  name: 'majus:web3',
  version: '0.1.0',
  summary: 'Essential toolkit for web3 application development',
  git: 'https://github.com/majus/meteor-web3',
  documentation: 'README.md',
});

Npm.depends({
  'ethers': '5.7.2',
});

Package.onUse(function (api) {
  api.versionsFrom(['2.0', '3.0']);
  api.use(['ecmascript', 'reactive-var']);
  api.use(['templating@1.3.4||1.4.4', 'imajus:helpers-core@0.0.2||0.1.0'], 'client');
  api.mainModule('index.client.js', 'client');
  api.mainModule('index.server.js', 'server');
});

// Package.onTest(function(api) {
//   api.use('ecmascript');
//   api.use('tinytest');
//   api.use('majus:web3');
//   api.mainModule('web3-tests.js');
// });
