//module imports
const SerialPort = require('serialport');
const Actuator = require('./actuator');
const parsers = SerialPort.parsers;

//initialize serial streams

const parser = new parsers.Readline({
  delimiter: '\r\n'
});

const port = new SerialPort('COM3', {
  baudRate: 9600
});
port.pipe(parser);
port.drain(error => {
  console.log('Drain callback returned', error);
});
parser.on('data', (data) => {
  currentCommand = data;
});

//declare class instances

let currentCommand = 'none';
let actuators = [new Actuator('TEST', 4), new Actuator('TESA', 2)];

//handel looping logic

function doThisOnLoop() {
  //if the command is new

  if (currentCommand !== 'none') {
    //print the code
    console.log('command code received was : ' + currentCommand);

    //parse data recieved for each actuator
    actuators.forEach((actuator) => {
    
      if(currentCommand.substring(0,4) === actuator.nameCode){
        // console.log('nameCode worked : ' + currentCommand.substring(0,4));
        // console.log('commandcode worked : ' + currentCommand.substring(4,8));
        // console.log('index substring : ' + parseInt(currentCommand.charAt(8)));
        // //console.log('index substring : ' + currentCommand.substring(8,9));
        if(currentCommand.substring(4,8) === 'DSSI'){
          actuator.segments[parseInt(currentCommand.charAt(8))].isClosed = (parseInt(currentCommand.charAt(9)) === 1);
          actuator.logSegmentStates();
        }
      }

    });
    // basic command reception teting code
    // if (currentCommand.substring(0, 9) === 'something'){
    //   actuators[0].logToShowWorking();
      
    // }
  
  }

  currentCommand = 'none';
}


//start the program 

setInterval(() => doThisOnLoop(), 1);

//testing functions
// setTimeout(()=>{
//   //actuators[0].sequenceUpTillLatch([0]);
//   //actuators[0].releaseAll();
//   //actuators[0].releaseSpecific([0,2,1]);
// }, 5000);

module.exports = port;