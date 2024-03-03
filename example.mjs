import createAsyncMutex from "./src/index.mjs"

const mutex = createAsyncMutex()

async function criticalSection(param) {
	const release = await mutex.acquire()

	console.log("inside critical section", param)

	await (new Promise(resolve => setTimeout(resolve, 1000)))

	console.log("done with section", param)

	release()
}

criticalSection(1)
criticalSection(2)
