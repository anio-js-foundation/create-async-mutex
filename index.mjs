export default function createAsyncMutex() {
	let queue = []

	const releaseNext = () => {
		if (!queue.length) {
			return
		}

		const resolve = queue.shift()

		setTimeout(resolve, 0, () => {
			releaseNext()
		})
	}

	return {
		acquire() {
			return new Promise((resolve) => {
				queue.push(resolve)

				// Resolve immediately if queue was empty
				if (queue.length === 1) {
					setTimeout(releaseNext, 0)
				}
			})
		}
	}
}
