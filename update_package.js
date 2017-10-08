'use strict'

if (process.argv.length < 3) {
  console.error('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' command_to_provide [description]')
  process.exit()
}
//home - mation.hubs.philips_hue.getLights
let packageJson = require('./package')
let fs = require('fs')
let _ = require('lodash')

let command = process.argv[2]

_.each(packageJson.contributes.commands, function (element) {
  if (element.command === command) {
    console.error(command + ' is already a command.')
    process.exit()
  }
});

let commandParts = command.split('.')

packageJson.contributes.commands.push({
  "command": command,
  "title": commandParts[0] + ' [' + commandParts[1] + ': ' + (commandParts[2].split('_')).join(' ') + '] ' + ((process.argv.length !== 4) ? commandParts[3] : process.argv[3])
});

packageJson.activationEvents.push('onCommand:' + command);

fs.writeFile('package.json', JSON.stringify(packageJson, null, 2));