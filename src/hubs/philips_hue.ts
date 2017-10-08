'use strict';

import * as vscode from 'vscode'
import * as hue from 'node-hue-api'
import * as _ from 'lodash'
import { AbstractHubs } from './hubs'
import * as config from '../utils/config_management'

export class PhilipsHue extends AbstractHubs {

  private _unauthApi: hue.HueApi
  private _authApi: hue.HueApi

  constructor() {
    super()

    this.initConfig(this)

    this._unauthApi = new hue.HueApi()

    this.updateAuthApi()
  }

  private updateAuthApi = () => {

    let host = this.config.get('ip');
    let user = this.config.get('user');
    
    this._authApi = new hue.HueApi(host, user);
  }

  getConfigKey() {
    return 'philips_hue'
  }

  loadAndPickBridge(bridges) {
    let display = []
    
    let that = this

    _.each(bridges, function (bridge) {
      let identifier = bridge.name !== undefined ? bridge.name : bridge.id

      display.push(bridge.ipaddress + ' (ID: ' + identifier + ')')
    })
      
    vscode.window.showQuickPick(display, {
      placeHolder: 'Choose the bridge'
    }).then(function (bridge) {
      if (bridge !== undefined) {
        let bridgeDetails = bridge.split('(')

        // Save IP here
        that.config.update('ip', bridgeDetails[0].trim(), true)

        if (!that.config.get('user', null)) {
          // No username provided so we need to authenticate
          that.updateUserToken()
        } else {
          this.updateAuthApi()

          vscode.window.showInformationMessage('Hue bridge paired.')
        }
      }
    });
  }

  private updateUserToken = () => {
    let that = this;

    vscode.window.showInformationMessage('Press the button on your Hue then click ok', 'OK').then(function (value) {
      if (value !== undefined) {
        that._unauthApi.registerUser(
          that.config.get('ip'),
          'VSCode/Home-mation v1.0.0'
        ).then(function (user) {
          that.config.update('user', user, true)

          vscode.window.showInformationMessage('Hue bridge paired and authenticatted.')

          that.updateAuthApi()
        }).fail(function (err) {
          vscode.window.showErrorMessage(err.message)
        }).done()
      }
    });
  }

  findAllAvailableBridges = () => {
    let that = this;

    hue.nupnpSearch().then(function (bridges) {
      if (bridges.length === 0) {
        hue.upnpSearch(2000).then(function (bridges) {
          if (bridges.length === 0) {
            vscode.window.showErrorMessage('No Philips Hue bridges discovered.')
          } else {
            that.loadAndPickBridge(bridges)
          }
        });
      } else {
        that.loadAndPickBridge(bridges)
      }
    });
  }

  getHueVersion = () => {
    this._authApi.getVersion().then(function (versionInfo) {
      vscode.window.showInformationMessage(versionInfo.name + ': API v' + versionInfo.version.api + ', Software v' + versionInfo.version.software)
    });
  }

  getLights = () => {
    let that = this

    this.updateAuthApi()

    this._authApi.lights().then(function (result) {
      let lights = []

      _.each(result.lights, function (lightObject) {
        lights.push({
          id: parseInt(lightObject.id, 10),
          reachable: lightObject.state.reachable,
          name: lightObject.manufacturername + ' ' + lightObject.modelid + ' - ' + lightObject.name
        })
      })

      that.config.update('lights', lights, true)
    }).done();
  }
}