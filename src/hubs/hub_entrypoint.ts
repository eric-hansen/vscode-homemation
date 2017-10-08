'use strict'

import * as PhilipsHue from './philips_hue'

export function getActions() {
  let hue = new PhilipsHue.PhilipsHue()

  return [
    {
      command: 'home-mation.hubs.philips_hue.findAllAvailableBridges',
      function: hue.findAllAvailableBridges
    },
    {
      command: 'home-mation.hubs.philips_hue.getHueVersion',
      function: hue.getHueVersion
    },
    {
      command: 'home-mation.hubs.philips_hue.getLights',
      function: hue.getLights
    }
  ]
}