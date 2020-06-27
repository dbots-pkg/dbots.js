const ServiceBase = require('./Interface/ServiceBase'),
  serviceClasses = ServiceBase.getAll();

module.exports = Object.assign({
  Poster: require('./Interface/Poster'),

  Constants: require('./Utils/Constants'),
  DBotsError: require('./Utils/DBotsError'),
  EnsurePromise: require('./Utils/EnsurePromise'),
  FormatRequest: require('./Utils/FormatRequest'),
  Util: require('./Utils/Util'),

  ServiceBase,
  getService: ServiceBase.get
}, serviceClasses);  
