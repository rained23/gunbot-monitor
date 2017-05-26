'use strict';

const exec = require('child_process').exec;

class Pm2Data {

  constructor() {
    this.megaByte = 1 / (Math.pow(1024, 2));
    this.loadHistory = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.cpuTimingsTicks = 0;
    this.cpuTimingsLoad = 0;
  }

  getProcesses() {
    return new Promise(resolve => {
      let result = {};

      try {
        exec('pm2 jlist', function (error, stdout) {
          if (error) {
            resolve(result);
            return;
          }
          if (!stdout) {
            resolve(result);
            return;
          }
          let processes = JSON.parse(stdout);

          for (let process of processes) {
            result[process.name] = {
              name: process.name,
              id: process.pm2_env.pm_id,
              status: process.pm2_env.status
            };
          }
          resolve(result);
        });
      } catch (e) {
        resolve(result);
      }
    });
  }

}

module.exports = new Pm2Data();