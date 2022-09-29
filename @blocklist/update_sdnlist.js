const util = require('util')
const exec = util.promisify(require('child_process').exec)
const writeFile = util.promisify(require('fs').writeFile)

async function run() {
  try {
    const curlString = 'curl -s https://www.treasury.gov/ofac/downloads/sdnlist.txt'
    const fetchData = exec(curlString, { maxBuffer: 1024 * 1024 * 1024 })
    const { stdout, stderr } = await fetchData
    if (stderr) {
      console.error(`error: ${stderr}`)
      return
    }

    const res = stdout.toString().match(/0x[a-fA-F0-9]{40}/g)
    const unique = [...new Set(res)]
    writeFile('./@blocklist/sdnlist.json', JSON.stringify(unique, null, 2))
  } catch (err) {
    console.error(err)
  }
}

run()
