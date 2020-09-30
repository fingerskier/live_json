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
  
  config._default = function(name, value) {
    let val = config[name]
    
    if (!val) {
      config[name] = value
      fs.writeFile(filepath, JSON.stringify(config), err=>{
        if (err) console.error(err)
      })
    }
    
    return config[name]
  }
  
  config._get = function(name) {
    return config[name]
  }
  
  config._set = function(name, value) {
    config[name] = value
    fs.writeFile(filepath, JSON.stringify(config), err=>{
      console.log('configuration set', name, value)
      if (err) console.error(err)
    })
  }
  
  return config
}
