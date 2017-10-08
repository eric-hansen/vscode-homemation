'use strict'

import * as vscode from 'vscode'
import { AbstractServices } from '../services'

export class ConfigManagement {

  constructor(private readonly service: AbstractServices) { }
  
  buildSubKey(key: string): string {

    let subKey = this.service.getSectionConfig() + '.' + this.service.getConfigKey() + '.'
    
    return subKey.replace('..', '.') + key
  }
  
  get(key: string, defaultValue ?: any): any {

    return vscode.workspace.getConfiguration(this.service.getRootConfig()).get(
      this.buildSubKey(key), defaultValue
    )
  }

  update(key: string, value: any, global?: boolean) {
    vscode.workspace.getConfiguration(this.service.getRootConfig()).update(
      this.buildSubKey(key), value, global === true
    )
  }
}