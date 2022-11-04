import { delay } from './delay'

export async function waitFor<T>(predicate: () => T, props: { delayMillis: number; retry: number }) {
  let result: T | undefined = undefined
  let attempt = 0
  while (!(result = predicate()) && attempt < props.retry) {
    await delay({ millis: props.delayMillis })
    attempt += 1
  }
  if (!result) {
    throw new Error(`Did not reach ${predicate} after waiting`)
  }
  return result
}
