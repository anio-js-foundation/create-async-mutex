import createAsyncMutex from "./src/index.mjs"

const mutex = createAsyncMutex()

async function criticalSection(n) {
	const release = await mutex.acquire()
	console.log(n, "---- acquired mutex -----")

	await new Promise(r=>setTimeout(r, 1000))

	console.log(n, "---- release mutex ------")

	await release()
}

criticalSection(1)
setTimeout(criticalSection, 10, 2)

setTimeout(() => {
	setTimeout(() => {
		criticalSection(3)
	}, 500)
}, 10)
