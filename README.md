# @anio-js-core-foundation/create-async-mutex

Creates a mutex.

```js
import createAsyncMutex from "@anio-js-core-foundation/create-async-mutex"

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

/*

This will print:

inside critical section 1
done with section 1
inside critical section 2
done with section 2

Without mutex it would print:

inside critical section 1
inside critical section 2
done with section 1
done with section 2

*/
```
