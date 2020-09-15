'use strict';

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
var userPoints = 0; // this will be part of the constructor.
var parsedAddedChoresItem = JSON.parse(localStorage.getItem('allAddedChoresItem'));
var parsedLoopingInt = JSON.parse(localStorage.getItem('currentLoopingInt'));
var gotRemovedArrayItem = localStorage.getItem('removedArrayItem');
var parsedRemovedArrayItem = JSON.parse(gotRemovedArrayItem);
var resetButtonEl = document.getElementById('button');

// chore constructor
var Chores = function (chore, points) {
  this.chore = chore;
  this.points = points;
  choreArray.push(this);
};

// hard coded chores list with values.
function createChoresObjects() {
  new Chores('sweep', 1);
  new Chores('mop', 2);
  new Chores('dishes', 5);
  new Chores('dusting', 2);
  new Chores('laundry', 6);
  new Chores('mow lawn', 7);
  new Chores('collect leaves', 3);
}
createChoresObjects();

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

// -------------------------------------------------------------------------------------------------------------------
// All these constructors have to be below the stuff above for it to work

var AddDayToChores = function (chores, day, content, id) {
  this.chores = chores;
  this.day = day;
  this.content = content;
  this.id = id;
};

// item is a blank array.
var ChoreAndDay = function (item) {
  this.item = item;
};

ChoreAndDay.prototype.addItem = function (chores, day, content, id) {
  var newChoreAndDay = new AddDayToChores(chores, day, content, id);
  this.item.push(newChoreAndDay);
};

// ---- All the constructors above need to work before addedChores works. ------
// chore and day object stored in addedChores
var addedChores = new ChoreAndDay([]);
var removedChores = new ChoreAndDay([]);

// instanciating previously stored added chores
if (parsedAddedChoresItem) {
  for (var j = 0; j < parsedAddedChoresItem.length; j++) {
    addedChores.addItem(parsedAddedChoresItem[j].chores, parsedAddedChoresItem[j].day, parsedAddedChoresItem[j].content, parsedAddedChoresItem[j].id);
  }
  console.log(addedChores);
}

//instanciating previously removed chores
if (parsedRemovedArrayItem) {
  for (var int = 0; int < parsedRemovedArrayItem.length; int++) {
    removedChores.addItem(parsedRemovedArrayItem[int].chores, parsedRemovedArrayItem[int].day, parsedRemovedArrayItem[int].content, parsedRemovedArrayItem[int].id);
  }
  console.log(removedChores);
}

// infinite looper!
var loopingInt = 1;
if (parsedLoopingInt) {
  loopingInt = parsedLoopingInt;
}

function fillToDo(event) {
  event.preventDefault();
  var choreName = event.target.chores_index.value;
  //console.log('chorename ' + choreName);
  var daySelection = event.target.day_index.value;
  //console.log('dayselection ' + daySelection);
  for (var i = 0; i < loopingInt + 1; i++) {
    var idName = choreName + loopingInt;
    loopingInt++;
    var loopingIntStringed = JSON.stringify(loopingInt); // updating the local storage.
    localStorage.setItem('currentLoopingInt', loopingIntStringed);
    break;
  }
  //console.log('id name ' + idName);
  var content = `${choreName} should be done ${daySelection}`;
  //console.log(content + 'Content');
  addedChores.addItem(choreName, daySelection, content, idName);
  //console.log('addedchores array ' + addedChores.item[0].chores); //this works
  postToDoList();
}
//-----------------------------------------------

// add another render method for the stuff in local storage.
// seperate local storage array, add the new items to that.

//render addedChores array
function renderAddedChoresArray() {
  for (var i = 0; i < addedChores.item.length; i++) {
    var liEl = document.createElement('li');
    liEl.setAttribute('id', addedChores.item[i].id);
    liEl.textContent = `${addedChores.item[i].chores} should be done ${addedChores.item[i].day}`;
    ul.append(liEl);
  }
}
renderAddedChoresArray();

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


//-----------------------------
var evId;
function handleToDoCompleted(event) {
  // thing 1, take it out
  // thing 2, get the chore (name) and the choreArray.chore, grab the points assoiacted with that. Send that to a points global variable.
  evId = event.target.id;
  console.log(evId);
  for (var i = 0; i < addedChores.item.length; i++) {
    //console.log(event.target.id);
    if (evId === addedChores.item[i].id) {
      //console.log(`item instance chore name is, ${addedChores.item[i].id}`);
      // console.log(i);
      break;
    }
  }
  for (var j = 0; j < choreArray.length; j++) {
    //console.log(addedChores.item[i].chores);
    if (addedChores.item[i].chores === choreArray[j].chore) {
      console.log(`item instance chore name is, ${addedChores.item[i].chores} choreArray is at ${choreArray[j].chore}`);
      userPoints += choreArray[j].points; // maybe turn this into calling a fnction there?

      var toBeRemoved = document.getElementById(evId);
      toBeRemoved.innerHTML = '';
      console.log('i is ' + i);

      // This will move all the parsed stuff into removedArray before it gets over written.
      if (parsedRemovedArrayItem) {
        removedArray = parsedRemovedArrayItem;
      }
      moveToCompleted();

      removedArray.push(addedChores.item[i]); // this works
      console.log('removed array contennts' + removedArray);
      var removedArrayString = JSON.stringify(removedArray);
      localStorage.setItem('removedArrayItem', removedArrayString);
      console.log(`user points currently at ${userPoints}`);

      addedChores.item.splice([i], 1);
      //console.log('item that was removed' + removedArray); WORKS
      //console.log('current added chores array ', addedChores); WORKS

      // updating the local storage.
      var addedChoresItemStringified = JSON.stringify(addedChores.item);
      localStorage.setItem('allAddedChoresItem', addedChoresItemStringified);

      break;
    }
  }
}

var use; // this will contain the chore and day content.
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

//render removedChores array
function renderRemovedArray() {
  for (var j = 0; j < removedChores.item.length; j++) {
    var liElTwo = document.createElement('li');
    liElTwo.setAttribute('id', removedChores.item[j].id);
    liElTwo.textContent = `${removedChores.item[j].chores} should be done ${removedChores.item[j].day} has been completed!`;
    removedUl.append(liElTwo);
  }
}
renderRemovedArray();

function createResetButton() {
  resetButtonEl.textContent = 'Click to Reset';
  resetButtonEl.addEventListener('click', resetHandler);
}
createResetButton();

function resetHandler(e) {
  console.log(e.target, resetButtonEl);
  if (e.target === resetButtonEl) {
    alert('You\'ve Reset All The Chores Data!');
    localStorage.clear();
    location.reload();
  } else {
    alert('It didn\'t work');
  }
}

//event listener for filling the to-do list
choresForm.addEventListener('submit', fillToDo);
sectionTodo.addEventListener('click', handleToDoCompleted);
