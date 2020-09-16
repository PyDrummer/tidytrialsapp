'use strict';

// All globally scoped variables
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
var customizeDropDown = document.getElementById('updatePoints');

// Chore object constructor for creating second set of chores for use in points value changes and chore creation (tied into app.js local storage through variable name)
var Chores = function (chore, points) {
  this.chore = chore;
  this.points = points;
  choreArray.push(this);
};

// Creates choreArray from local storage or new insances of Chores
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

// Updates point value of chosen chore to whatever user puts in with event listener.
function updatePointValue(event) {
  event.preventDefault();
  removeChoreDisplay();
  for (var i = 0; i < choreArray.length; i++) {
    if (event.target.chores.value === choreArray[i].chore) {
      choreArray[i].points = parseInt(event.target.valueIndex.value);
      break;
    }
  }
  choreDisplay();
  storeChoreArr();
}

// Fills customize.html dropdown menus
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

// Fills chore creator point value drop down
function fillCreatorDropDown() {
  for (var i = 0; i < 10; i++) {
    var option = document.createElement('option');
    option.textContent = i;
    createPointAssignment.append(option);
  }
}
fillCreatorDropDown();

// Allows user to create new chore and assign values
function userChoreCreation(event) {
  event.preventDefault();
  removeChoreDisplay();
  var choreName = event.target.choreName.value;
  var points = parseInt(event.target.pointValue.value);
  new Chores(choreName, points);
  choreDisplay();
  storeChoreArr();
  location.reload();
}

// Sets choreArray to local storage
function storeChoreArr() {
  choreArrStr = JSON.stringify(choreArray);
  localStorage.setItem('choreArrStored', choreArrStr);
}

// Displays chores available for customization on page load, after new chore is created and after point value is changed
function choreDisplay() {
  for (var i = 0; i < choreArray.length; i++) {
    li = document.createElement('li');
    li.setAttribute('id', 'chore' + i);
    li.textContent = `${choreArray[i].chore} has a point value of ${choreArray[i].points}.`;
    displayUl.append(li);
  }
}
choreDisplay();

// Clears chore display in order to collapse li and provide space for new set when new chore is created or point value is changed
function removeChoreDisplay() {
  for (var i = 0; i < choreArray.length; i++) {
    var liItem = document.getElementById('chore' + i);
    liItem.innerHTML = '';
  }
}

// listens for creation of chore
userCreatesChore.addEventListener('submit', userChoreCreation);
// listens for reassignment of chore point value
customizeDropDown.addEventListener('submit', updatePointValue);
