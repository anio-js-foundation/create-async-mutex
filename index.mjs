//
// credit: https://stackoverflow.com/a/51086910/2005038
// by user Bergi https://stackoverflow.com/users/1048572/bergi
//
const MutexImplementationFromStackOverflow = class {
	constructor() {
		this._lock = null;
	}
	isLocked() {
		return this._lock != null;
	}
	_acquire() {
		var release;
		const lock = this._lock = new Promise(resolve => {
			release = resolve;
		});
		return () => {
			if (this._lock == lock) this._lock = null;
			release();
		};
	}
	acquireSync() {
		if (this.isLocked()) throw new Error("still locked!");
		return this._acquire();
	}
	acquireQueued() {
		const q = Promise.resolve(this._lock).then(() => release);
		const release = this._acquire(); // reserves the lock already, but it doesn't count
		return q; // as acquired until the caller gets access to `release` through `q`
	}
}

export default function createAsyncMutex() {
	let mutex = new MutexImplementationFromStackOverflow()

	return {
		acquire() {
			return mutex.acquireQueued()
		}
	}
}
