'use strict';

// all globally scoped variables
var choreArray = [];
var removedArray = [];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var choreList = document.getElementById('chores_index');
var dayList = document.getElementById('day_index');
var choresForm = document.getElementById('chores_form');
var sectionTodo = document.getElementById('section_todo');
var ul = document.getElementById('todo');
var removedUl = document.getElementById('completed_ul');
var completedUl = document.getElementById('completed_ul');
var parsedAddedChoresItem = JSON.parse(localStorage.getItem('allAddedChoresItem'));
var parsedLoopingInt = JSON.parse(localStorage.getItem('currentLoopingInt'));
var gotRemovedArrayItem = localStorage.getItem('removedArrayItem');
var parsedRemovedArrayItem = JSON.parse(gotRemovedArrayItem);
var resetButtonEl = document.getElementById('button');
var gotChoreArray = localStorage.getItem('choreArrStored');
var parsedChoreArray = JSON.parse(gotChoreArray);
var updateUser = localStorage.getItem('userObject');
var loggedInUser = JSON.parse(updateUser);
var bar = document.getElementById('demo1');
var evId;
var use;

// Updates progress bar on page load
if (loggedInUser) {
  bar.setAttribute('value', loggedInUser[0].userPoints);
}

// Chore constructor
var Chores = function (chore, points) {
  this.chore = chore;
  this.points = points;
  choreArray.push(this);
};

// Fills choreArray with chore objects for use throughout code
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

// fills index.html dropdown menus
function fillDropDown() {
  for (var i = 0; i < choreArray.length; i++) {
    var option = document.createElement('option');
    option.textContent = choreArray[i].chore;
    choreList.append(option);
    option = document.createElement('option');
    option.textContent = days[i];
    dayList.append(option);
  }
}

fillDropDown();

// -------------------------------------------------------------------------------------------------------------
// All these constructors have to be below the stuff above for it to work

// Constructor used as reference for appending todo items
var AddDayToChores = function (chores, day, content, id) {
  this.chores = chores;
  this.day = day;
  this.content = content;
  this.id = id;
};

// item is a blank array here, but fills with AddDayToChores objects.
var ChoreAndDay = function (item) {
  this.item = item;
};

// prepares to instantiate AddDayToChores and push into item array
ChoreAndDay.prototype.addItem = function (chores, day, content, id) {
  var newChoreAndDay = new AddDayToChores(chores, day, content, id);
  this.item.push(newChoreAndDay);
};

// Constructor stored as variables for use in placing lines in todo list and moving to completed list
var addedChores = new ChoreAndDay([]);
var removedChores = new ChoreAndDay([]);

// Uses local storage to instanciate previously stored addedChores
if (parsedAddedChoresItem) {
  for (var j = 0; j < parsedAddedChoresItem.length; j++) {
    addedChores.addItem(parsedAddedChoresItem[j].chores, parsedAddedChoresItem[j].day, parsedAddedChoresItem[j].content, parsedAddedChoresItem[j].id);
  }
}

// Uses local storage to instanciate previously removedChores
if (parsedRemovedArrayItem) {
  for (var int = 0; int < parsedRemovedArrayItem.length; int++) {
    removedChores.addItem(parsedRemovedArrayItem[int].chores, parsedRemovedArrayItem[int].day, parsedRemovedArrayItem[int].content, parsedRemovedArrayItem[int].id);
  }
}

// Infinitely looping variable for assigning id to todo items
var loopingInt = 1;
if (parsedLoopingInt) {
  loopingInt = parsedLoopingInt;
}

// Assigns ID and content to chore objects for use in creating todo list items
function fillToDo(event) {
  event.preventDefault();
  var choreName = event.target.chores_index.value;
  var daySelection = event.target.day_index.value;
  for (var i = 0; i < loopingInt + 1; i++) {
    var idName = choreName + loopingInt;
    loopingInt++;
    var loopingIntStringed = JSON.stringify(loopingInt); // updating the local storage.
    localStorage.setItem('currentLoopingInt', loopingIntStringed);
    break;
  }
  var content = `${choreName} should be done ${daySelection}`;
  addedChores.addItem(choreName, daySelection, content, idName);
  postToDoList();
}

// Creates todo list on page load
function renderAddedChoresArray() {
  for (var i = 0; i < addedChores.item.length; i++) {
    var liEl = document.createElement('li');
    liEl.setAttribute('id', addedChores.item[i].id);
    liEl.textContent = `${addedChores.item[i].chores} should be done ${addedChores.item[i].day}`;
    ul.append(liEl);
  }
}
renderAddedChoresArray();

// Renders todo list to page
function postToDoList() {
  var li = document.createElement('li');
  var i = addedChores.item.length - 1;
  li.setAttribute('id', addedChores.item[i].id);
  li.textContent = `${addedChores.item[i].chores} should be done ${addedChores.item[i].day}`;
  ul.append(li);
  //local storage
  var addedChoresItemStringified = JSON.stringify(addedChores.item); // updating the local storage.
  localStorage.setItem('allAddedChoresItem', addedChoresItemStringified);
}

// Prepares to move chosen todo list item to completed list
// Updates user points for use in progress bar
function handleToDoCompleted(event) {
  evId = event.target.id;
  for (var i = 0; i < addedChores.item.length; i++) {
    if (evId === addedChores.item[i].id) {
      break;
    }
  }
  for (var j = 0; j < choreArray.length; j++) {
    if (addedChores.item[i].chores === choreArray[j].chore) {
      loggedInUser[0].userPoints += choreArray[j].points;
      bar.setAttribute('value', loggedInUser[0].userPoints);
      var userPointsLocalStorage = JSON.stringify(loggedInUser);
      localStorage.setItem('userObject', userPointsLocalStorage);
      var toBeRemoved = document.getElementById(evId);
      toBeRemoved.innerHTML = '';
      // This will move all the parsed stuff into removedArray before it gets over written.
      if (parsedRemovedArrayItem) {
        removedArray = parsedRemovedArrayItem;
      }
      moveToCompleted();
      removedArray.push(addedChores.item[i]); // this works
      var removedArrayString = JSON.stringify(removedArray);
      localStorage.setItem('removedArrayItem', removedArrayString);
      addedChores.item.splice([i], 1);
      // updating the local storage.
      var addedChoresItemStringified = JSON.stringify(addedChores.item);
      localStorage.setItem('allAddedChoresItem', addedChoresItemStringified);
      break;
    }
  }
}

// Renders completed items to completed list
function moveToCompleted() {
  for (var i = 0; i < addedChores.item.length; i++) {
    if (addedChores.item[i].id === evId) {
      use = addedChores.item[i].content;
    }
  }
  var li = document.createElement('li');
  li.textContent = `${use} has been completed!`;
  completedUl.append(li);
}

// Renders completed list on page load
function renderRemovedArray() {
  for (var j = 0; j < removedChores.item.length; j++) {
    var liElTwo = document.createElement('li');
    liElTwo.setAttribute('id', removedChores.item[j].id);
    liElTwo.textContent = `${removedChores.item[j].chores} should be done ${removedChores.item[j].day} has been completed!`;
    removedUl.append(liElTwo);
  }
}
renderRemovedArray();

// Creates button to empty lists
function createResetButton() {
  resetButtonEl.textContent = 'Click to Reset';
  resetButtonEl.addEventListener('click', resetHandler);
}
createResetButton();

// Clears lists when onclick of reset button
function resetHandler(e) {
  if (e.target === resetButtonEl) {
    alert('You\'ve Reset All The Chores Data!');
    localStorage.clear();
    location.reload();
  } else {
    alert('It didn\'t work');
  }
}

// Event listener for filling the to-do list
choresForm.addEventListener('submit', fillToDo);
// Event listener for moving todo list items to completed list
sectionTodo.addEventListener('click', handleToDoCompleted);
