var HPLC = require("../model/hplc").hplc;

angular
  .module('hplcSimulator')
  .controller('SimulatorCtrl', [ '$window', 'chromatogram', SimulatorCtrl ]);

function SimulatorCtrl($window, chromatogram) {
  this.window = $window;
  this.chromatogram = chromatogram;
  var _this = this;
  this.simulator = new HPLC.Simulator(this.drawChromatogram.bind(this));
  this.drawChromatogram();
  this.selectedTab = 0;
  angular.element($window).bind("resize", this.drawChromatogram.bind(this));
};

SimulatorCtrl.prototype.drawChromatogram = function _drawChromatogram () {
  if(this.simulator) {
    this.chromatogram.draw(this.simulator, '#chart');
  }
};

SimulatorCtrl.prototype.primarySolvents = function() {
  return HPLC.primarySolvents;
};

SimulatorCtrl.prototype.secondarySolvents = function() {
  return HPLC.secondarySolvents;
};

SimulatorCtrl.prototype.elutionModes = function() {
  return HPLC.elutionModes;
};

SimulatorCtrl.prototype.nextTab = function() {
  if(this.selectedTab < 5) {
    this.selectedTab += 1;
  }
};

SimulatorCtrl.prototype.previousTab = function() {
  if(this.selectedTab > 0) {
    this.selectedTab -= 1;
  }
};
