'use strict';

var chore = document.getElementById('chores');
var pointValue = document.getElementById('valueIndex');
var choreArrStr;
var choreArrStored;

// update point value to whatever user puts in with event listener.
var customizeDropDown = document.getElementById('updatePoints');
function updatePointValue (event) {
  event.preventDefault();
  console.log('update');
  for (var i = 0; i < choreArray.length; i++) {
    if (event.target.chores.value === choreArray[i].chore) {
      // update point value
      choreArray[i].points = event.target.valueIndex.value;
    }
    choreArrStr = JSON.stringify(choreArray);
    localStorage.setItem('choreArrStored', choreArrStr);
  }
}

// fills customize.html dropdown menus
function fillCustDropDown() {
  for (var i = 0; i < choreArray.length; i++) {
    var option = document.createElement('option');
    option.textContent = choreArray[i].chore;
    chore.append(option);
  }
  for (var j = 0; j < 10; j++) {
    option = document.createElement('option');
    option.textContent = j;
    pointValue.append(option);
  }
}
fillCustDropDown();

customizeDropDown.addEventListener('submit', updatePointValue);
