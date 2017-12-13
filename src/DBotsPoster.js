const EnsurePromise = require('./Utils/EnsurePromise');
const EmptyFunction = () => { };

/**
 * A class that posts server count to listing site(s).
 * @constructor
 * @param {string} options - The additional options.
 */
class DBotsPoster {
    constructor(options){
        this.client = options.client;
        this.options = options;
    }

    getServerCount(){
        if(!this.client) throw new Error('Cannot retrieve server count from non-existant client');
        if(this.options.serverCount) return new EnsurePromise(this.options.serverCount);
    }

    startInterval(interval = 1800000, onRequest = EmptyFunction){
        
    }
}

module.exports = DBotsPoster;