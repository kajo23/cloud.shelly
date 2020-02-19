"use strict";

const Homey = require('homey');
const util = require('/lib/util.js');

class ShellyRGBW2ColorDriver extends Homey.Driver {

  onPair(socket) {
    const discoveryStrategy = this.getDiscoveryStrategy();
    const discoveryResults = discoveryStrategy.getDiscoveryResults();
    let selectedDeviceId;
    let deviceArray = {};

    socket.on('list_devices', (data, callback) => {
      this.log('raw discovery result is:');
      this.log(discoveryResults);
      const devices = Object.values(discoveryResults).map(discoveryResult => {
        return {
          name: 'Shelly RGBW2 Color Mode ['+ discoveryResult.address +']',
          data: {
            id: discoveryResult.id,
          }
        };
      });
      callback(null, devices);
    });

    socket.on('list_devices_selection', (data, callback) => {
      callback();
      selectedDeviceId = data[0].data.id;
    });

    socket.on('get_device', (data, callback) => {
      const discoveryResult = discoveryResults[selectedDeviceId];
      if(!discoveryResult) return callback(new Error('Something went wrong'));

      util.sendCommand('/shelly', discoveryResult.address, '', '')
        .then(result => {
          this.log('shelly result is:');
          this.log(result);
          deviceArray = {
            name: 'Shelly RGBW2 Color Mode ['+ discoveryResult.address +']',
            data: {
              id: discoveryResult.id,
            },
            settings: {
              address  : discoveryResult.address,
              username : '',
              password : '',
              polling  : 5
            },
            store: {
              type: result.type,
              outputs: result.num_outputs
            }
          }
          if (result.auth) {
            this.log('current deviceArray:');
            this.log(deviceArray);
            this.log('credentials view launched');
            socket.nextView();
          } else {
            this.log('current deviceArray:');
            this.log(deviceArray);
            this.log('add_device view launched');
            socket.showView('add_device');
          }
        })
        .catch(error => {
          callback(error, false);
        })
    });

    socket.on('login', (data, callback) => {
      deviceArray.settings.username = data.username;
      deviceArray.settings.password = data.password;
      callback(null, true);
    });

    socket.on('add_device', (data, callback) => {
      callback(false, deviceArray);
    });

  }

}

module.exports = ShellyRGBW2ColorDriver;
