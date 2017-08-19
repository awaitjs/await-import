function dynamic_import (url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    const temp = '__temp_' + Math.random().toString(32).substring(2)
    script.type = 'module'
    script.textContent = `
      import * as m from "${url}"
      self.${temp} = m
    `

    script.onload = () => {
      resolve(self[temp])
      delete self[temp]
      script.remove()
    }

    script.onerror = (err) => {
      console.error(err)
      reject(new Error(`Failed to load module script with URL ${url}`))
      delete self[temp]
      script.remove()
    }

    document.documentElement.appendChild(script)
  })
}

module.exports = dynamic_import