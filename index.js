const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')
const touch = require('touch')

module.exports = function(filepath='./config.json') {
  let config

  try {
    config = require(filepath)
    console.log('configuration loaded:', filepath)
  } catch (error) {
    console.log(`no config, creating default: ${filepath}`)
    
    config = {}
    
    const directory = path.dirname(filepath)
    
    mkdirp(directory)
    .then(made=>{
      touch(filepath)
      fs.writeFile(filepath, JSON.stringify(config), err=>{
        if (err) console.error(err)
        console.log('configuration created:', filepath)
      })
    })
  }

  const thing = new Proxy(config, {
    set: (obj, prop, value) => {
      // obj[prop] = value;
      storage.setItem(`${prefix}.${prop}`, JSON.stringify(value))
      
      return true
    },
    get: (obj, prop) => {
      // return obj[prop];
      return JSON.parse(storage.getItem(`${prefix}.${prop}`))
    },
  });
}

  return thing
}
