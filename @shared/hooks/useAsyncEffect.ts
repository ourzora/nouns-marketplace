import { useEffect } from 'react'

const useAsyncEffect = (func: () => any | Promise<any>, args: Array<any> = []) => {
  useEffect(() => {
    const p = func()
    if (p) {
      p.then(() => {
        return undefined
      }).catch((err: any) => {
        console.error(err)
        return undefined
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args)
}
export default useAsyncEffect
