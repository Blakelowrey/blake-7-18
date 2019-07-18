const SelinoidGroup = require('./selinoid-group');
class Actuator {


  constructor(nameCode, numberOfSegments){
    this.nameCode = nameCode;
    this.numberOfSegments = numberOfSegments;
    this.segments = [];
    this.initialize();
  }

  initialize() {
    for(let i = 0 ; i < this.numberOfSegments ; i ++){
      this.segments.push(new SelinoidGroup(i , this.nameCode));
    }
  }
  logToShowWorking(){
    console.log(this.nameCode + ' is working');
  }
  logSegmentStates(){
    console.log(this.nameCode + ' segment states: ' + (this.segments.map(segment => segment.isClosed)));
  }
  releaseAll(){
    for(let i = 0; i < this.segments.length ; i++){
      this.segments[i].release();
    }
  }

  releaseSpecific(indexArray = []){
    for(let i = 0 ; i < indexArray.length ; i++){
      this.segments[indexArray[i]].release();
    }

  }
  simultaniousUpTillLatch(indexArray =[]){
    for(let i = 0 ; i < indexArray.length ; i++){
      this.segments[indexArray[i]].moveUpTillLatch();
    }

  }
  sequenceUpTillLatch(indexArray = []){
    let i = 0;
    console.log('sequenceUpTillLatch for:' + this.nameCode + ' segments: '+ indexArray + '\n');
    let myInterval = setInterval(()=>{
      if (i < indexArray.length){
        if(!this.segments[indexArray[i]].isClosed && !this.segments[indexArray[i]].UTLHasRan ){
          this.segments[indexArray[i]].moveUpTillLatch();
          this.segments[indexArray[i]].UTLHasRan = true;
        }
        else if (this.segments[indexArray[i]].isClosed){
          i++;
        }
      }
      else {
        for (let count = 0; count < this.segments.length ; count ++ ){
          this.segments[count].UTLHasRan = false;
        }
        clearInterval(myInterval);
      }
    } , 5);
  }

}

module.exports = Actuator;