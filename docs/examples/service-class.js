const dbots = require('dbots')

// You can get the service class through the Service util, using a service alias
const TopGG = dbots.Service.get('topgg')

// You can craete an instance using your token, that will allow you to access the API
const serviceInstance = new TopGG('your-token')

// You can then use every method listed in the class docs
serviceInstance.getBot('bot-id')
  .then(data => {
    // ...
  })
  .catch(console.error)
