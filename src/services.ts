'use strict'

import { ConfigManagement } from './utils/config_management'

export class AbstractServices {

  public config: ConfigManagement
  private readonly rootKeyForConfig = 'homemation'

  initConfig(service?: AbstractServices) {
    this.config = new ConfigManagement(service)
  }

  /**
   * Root key for configuration.  This should never change.
   */
  getRootConfig() {
    return this.rootKeyForConfig
  }

  /**
   * Sectional config key (i.e.: 'hubs' for the hub devices)
   */
  getSectionConfig() {}
  
  /**
   * Any extra elements of the config key prior to the config element itself.
   * I.e.: 'philips_hue' for the Philips Hue devices
   */
  getConfigKey() {}
  
  enable = () => {
    this.config.update('enabled', true, true)
  }
}