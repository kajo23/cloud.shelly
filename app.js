"use strict";

const Homey = require('homey');
const util = require('/lib/util.js');

class ShellyApp extends Homey.App {

  onInit() {
    this.log('Initializing Shelly App ...');

    // SHELLY 1
    new Homey.FlowCardAction('flipbackSwitch')
      .register()
      .registerRunListener((args, state) => {
        if (args.switch === '1') {
          return util.sendCommand('/relay/0?turn=on&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        } else {
          return util.sendCommand('/relay/0?turn=off&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        }
      })

    // SHELLY 2 & SHELLY 4 PRO
    new Homey.FlowCardAction('flipbackSwitch2')
      .register()
      .registerRunListener((args, state) => {
        if (args.switch === '1') {
          return util.sendCommand('/relay/'+ args.relay +'?turn=on&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        } else {
          return util.sendCommand('/relay/'+ args.relay +'?turn=off&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        }
      })

    new Homey.FlowCardAction('flipbackSwitch4')
      .register()
      .registerRunListener((args, state) => {
        if (args.switch === '1') {
          return util.sendCommand('/relay/'+ args.relay +'?turn=on&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        } else {
          return util.sendCommand('/relay/'+ args.relay +'?turn=off&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        }
      })

    new Homey.FlowCardAction('moveRollerShutter')
      .register()
      .registerRunListener((args, state) => {
        return util.sendCommand('/roller/0?go='+ args.direction +'&duration='+ args.duration +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
      })

    // SHELLY RGBW2 COLOR
    new Homey.FlowCardAction('flipbackSwitchRGBW2Color')
      .register()
      .registerRunListener((args, state) => {
        if (args.switch === '1') {
          return util.sendCommand('/color/0?turn=on&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        } else {
          return util.sendCommand('/color/0?turn=off&timer='+ args.timer +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
        }
      })

    new Homey.FlowCardAction('effectRGBW2Color')
      .register()
      .registerRunListener((args, state) => {
        return util.sendCommand('/color/0?turn=on&effect='+ Number(args.effect) +'', args.device.getSetting('address'), args.device.getSetting('username'), args.device.getSetting('password'));
      })

  }

}

module.exports = ShellyApp;
