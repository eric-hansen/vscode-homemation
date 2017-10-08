# home-mation README

Ever wanted to control your home automation systems from VSCode?  Well now you can!

## Features

* Manage Philips Hue lights

## Requirements

* Have the necessary hardware for any of the supported hubs/devices

## Extension Settings

* `homemation.hubs.philips_hue.enabled`: Enable Philips Hue support (default: false)
* `homemation.hubs.philips_hue.ip`: IP of the Hue bridge
* `homemation.hubs.philips_hue.user`: Generated (or otherwise known) username authenticated to make API calls on the bridge
* `homemation.hubs.philips_hue.lights`: Array of `lights` objects providing some info such as ID, reachable and human-friendly name

## Extension Commands

### Philips Hue

* `Homemation [Hubs: Philips Hue] - Find and set bridge`: Locate a Philips Hue bridge on the network and save it's IP address (also authenticate if no user is provided in config)
* `Homemation [Hubs: Philips Hue] - Get API & software version info`: Basic validation function that returns some info about the detected bridge
* `Homemation [Hubs: Philips Hue] Get and store all lights associated with the hub`: Get and store all the lights known to the bridge

Only 1 Hue bridge can be used.  Though, if you have more than one then this gag extension may not be as useful to you anyways.

## Known Issues

N/A

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release