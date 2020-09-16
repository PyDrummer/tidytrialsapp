'use strict';

var chore = document.getElementById('chores');
var pointValue = document.getElementById('valueIndex');
var choreArrStr;
var userCreatesChore = document.getElementById('userChoreCreator');
var createPointAssignment = document.getElementById('pointValue');
var displayUl = document.getElementById('choreDisplay');
var li;
var gotChoreArray = localStorage.getItem('choreArrStored');
var parsedChoreArray = JSON.parse(gotChoreArray);
var choreArray = [];

var Chores = function (chore, points) {
  this.chore = chore;
  this.points = points;
  choreArray.push(this);
};

if (parsedChoreArray) {
  choreArray = parsedChoreArray;
} else {
  // hard coded chores list with values.
  new Chores('sweep', 1);
  new Chores('mop', 2);
  new Chores('dishes', 5);
  new Chores('dusting', 2);
  new Chores('laundry', 6);
  new Chores('mow lawn', 7);
  new Chores('collect leaves', 3);
}

// update point value to whatever user puts in with event listener.
var customizeDropDown = document.getElementById('updatePoints');
function updatePointValue(event) {
  event.preventDefault();
  removeChoreDisplay();
  console.log('update');
  for (var i = 0; i < choreArray.length; i++) {
    if (event.target.chores.value === choreArray[i].chore) {
      // update point value
      choreArray[i].points = parseInt(event.target.valueIndex.value);
      break;
    }
  }
  choreDisplay();
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
function fillCreatorDropDown() {
  for (var i = 0; i < 10; i++) {
    var option = document.createElement('option');
    option.textContent = i;
    createPointAssignment.append(option);
  }
}
fillCreatorDropDown();

// allows user to create new chore and assign values
function userChoreCreation(event) {
  event.preventDefault();
  removeChoreDisplay();
  var choreName = event.target.choreName.value;
  var points = parseInt(event.target.pointValue.value);
  console.log('yes1');
  new Chores(choreName, points);
  choreDisplay();
  storeChoreArr();
  location.reload();
}

// sets choreArray to local storage
function storeChoreArr() {
  choreArrStr = JSON.stringify(choreArray);
  localStorage.setItem('choreArrStored', choreArrStr);
}

function choreDisplay() {
  for (var i = 0; i < choreArray.length; i++) {
    li = document.createElement('li');
    li.setAttribute('id', 'chore' + i);
    li.textContent = `${choreArray[i].chore} has a point value of ${choreArray[i].points}.`;
    displayUl.append(li);
  }
}

function removeChoreDisplay() {
  for (var i = 0; i < choreArray.length; i++) {
    var liItem = document.getElementById('chore' + i);
    liItem.innerHTML = '';
  }
}

choreDisplay();

// listens for creation of chore
userCreatesChore.addEventListener('submit', userChoreCreation);
// listens for reassignment of chore point value
customizeDropDown.addEventListener('submit', updatePointValue);
