export type Address = string

export function verifyType<T extends Object, K extends Object>(
  obj: T,
  optionalFields: string[]
): K {
  let result = {} as K
  for (const [key, value] of Object.entries(obj)) {
    if (!value && !optionalFields.includes(key)) {
      throw Error(`Malformed auction, ${key} is not defined`)
    } else {
      result = {
        ...result,
        [key]: value,
      }
    }
  }

  return result
}
