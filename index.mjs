export default function createAsyncMutex() {
	let current_promise = null

	return {
		async acquire() {
			if (current_promise !== null) {
				await current_promise
			}

			let unlock

			current_promise = new Promise(resolve => {
				unlock = resolve
			})

			return () => {
				unlock()
				current_promise = null
			}
		}
	}
}
