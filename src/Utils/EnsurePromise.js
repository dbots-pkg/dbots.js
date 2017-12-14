class EnsurePromise {
	constructor(func){
		if(typeof func === 'function'){
			try {
				return Promise.resolve(func());
			} catch(err) {
				return Promise.reject(err);
			}
		}else return func;
	}
}

module.exports = EnsurePromise;