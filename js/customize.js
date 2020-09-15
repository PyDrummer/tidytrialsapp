'use strict';

var chore = document.getElementById('chores');
var pointValue = document.getElementById('valueIndex');
var choreArrStr;
var userCreatesChore = document.getElementById('userChoreCreator');
var createPointAssignment = document.getElementById('pointValue');

// update point value to whatever user puts in with event listener.
var customizeDropDown = document.getElementById('updatePoints');
function updatePointValue (event) {
  event.preventDefault();
  console.log('update');
  for (var i = 0; i < choreArray.length; i++) {
    if (event.target.chores.value === choreArray[i].chore) {
      // update point value
      choreArray[i].points = parseInt(event.target.valueIndex.value);
      break;
    }
  }
  storeChoreArr();
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

// fills chore creator point value drop down
function fillCreatorDropDown () {
  for (var i = 0; i < 10; i++) {
    var option = document.createElement('option');
    option.textContent = i;
    createPointAssignment.append(option);
  }
}
fillCreatorDropDown();

// allows user to create new chore and assign values
function userChoreCreation (event) {
  event.preventDefault();
  var choreName = event.target.choreName.value;
  var points = parseInt(event.target.pointValue.value);
  console.log('yes1');
  new Chores(choreName, points);
  storeChoreArr();
}

// sets choreArray to local storage
function storeChoreArr() {
  choreArrStr = JSON.stringify(choreArray);
  localStorage.setItem('choreArrStored', choreArrStr);
}

// listens for creation of chore
userCreatesChore.addEventListener('submit', userChoreCreation);
// listens for reassignment of chore point value
customizeDropDown.addEventListener('submit', updatePointValue);
