// Allows us to filter async data wrapped in Promises
export async function asyncFilter(arr: any[], callback: Function) {
  const fail = Symbol()
  return (
    await Promise.all(arr.map(async (item) => ((await callback(item)) ? item : fail)))
  ).filter((i) => i !== fail)
}
