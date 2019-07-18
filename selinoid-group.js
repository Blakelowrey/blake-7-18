/* eslint-disable no-console */
const port = require('./serial-coms');
class SelinoidGroup {

  constructor(index, name) {
    this.index = index;
    this.nameCode = name;
    this.isClosed = false;
    this.UTLHasRan = false;
  }

  moveUpMillis(millis) {
    let command = (this.nameCode + '_TUP' + this.index + millis +'\n');
    console.log('moveUpMillis command is : ' + command);
    port.write(command);
  }

  moveUpTillLatch() {
    let command = (this.nameCode + '_UTL' + this.index +'\n');
    console.log('upTillLatch command is : ' + command);
    port.write(command);
  }

  moveDownMillis(millis) {
    let command = (this.nameCode + '_TDN' + this.index + millis +'\n');
    console.log('moveDownMillis command is : ' + command);
    port.write(command);
  }
  release() {
    let command = (this.nameCode + '_REL' + this.index +'\n');
    console.log('release command is : ' + command);
    port.write(command);
  }

}
module.exports = SelinoidGroup;