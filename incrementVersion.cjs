const fs = require('fs')
const path = require('path')
const packageJson = require('./package.json')

const versionType = {
  "MAJOR": 0,
  "MINOR": 1,
  "PATCH": 2
}

let version = packageJson.version.split('.')

function increment(index) {
  try {
    version[index] = Number(version[index]) + 1
    if (index === 1) version[2] = 0
    else if (index === 0) version[1] = version[2] = 0
  } catch (error) {
    console.error(error)
  }
}

function getVersionType() {
  let [env, filePath, patchType = process.env.VERSION || 2] = process.argv
  if (patchType && !Number.isNaN(Number(patchType))) return Number(patchType)
  else {
    let type = versionType[patchType.toUpperCase()]
    if (type === undefined) {
      console.log(`Undefined type "${patchType}"\nUse "major", "minor", or "patch"`)
      process.exit(0)
    }
    return type
  }
}

increment(getVersionType())

packageJson.version = version.join('.')
console.log(`New Version: ${version.join('.')}`)
const text = JSON.stringify(packageJson, null, 2)

try {
  fs.writeFileSync(path.resolve(__dirname, './package.json'), text)
  console.log('package.json updated')
} catch (error) {
  console.error(error)
}
