'use strict';

var choreArray = [];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var choreList = document.getElementById('chores_index');
var dayList = document.getElementById('day_index');
var choresForm = document.getElementById('chores_form');
var sectionTodo = document.getElementById('section_todo');
var ul = document.getElementById('todo');
var completedUl = document.getElementById('completed_ul');
var userPoints = 0; // this will be part of the constructor.
var parsedAddedChoresItem = JSON.parse(localStorage.getItem('allAddedChoresItem'));
// need to save parsedAddedChoresItems

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
if (parsedAddedChoresItem) {
  for (var i = 0; i < parsedAddedChoresItem.length; i++){
    addedChores.addItem(parsedAddedChoresItem[i].chores, parsedAddedChoresItem[i].day, parsedAddedChoresItem[i].content, parsedAddedChoresItem[i].id);
  }
  console.log(addedChores);
}

function fillToDo(event) {
  event.preventDefault();
  var choreName = event.target.chores_index.value;
  //console.log('chorename ' + choreName);
  var daySelection = event.target.day_index.value;
  //console.log('dayselection ' + daySelection);
  for (var i = 0; i < addedChores.item.length; i++);
  var idName = choreName + i;
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

function renderLocalStorageArray() {
  for (var i = 0; i < addedChores.item.length; i++) {
    var liEl = document.createElement('li');
    liEl.setAttribute('id', addedChores.item[i].id);
    liEl.textContent = `${addedChores.item[i].chores} should be done ${addedChores.item[i].day}`;
    ul.append(liEl);
  }
}
renderLocalStorageArray();

function postToDoList() {
  var li = document.createElement('li');
  var i = addedChores.item.length -1;
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
    // console.log(event.target.id);
    if (evId === addedChores.item[i].id) {
      console.log(`item instance chore name is, ${addedChores.item[i].id[0]}`);
      // console.log(i);
      break;
    }
  }
  for (var j = 0; j < choreArray.length; j++) {
    console.log(addedChores.item[i].chores);
    if (addedChores.item[i].chores === choreArray[j].chore) {
      console.log(`item instance chore name is, ${addedChores.item[i].chores} choreArray is at ${choreArray[j].chore}`);
      moveToCompleted();
      userPoints += choreArray[j].points;
      var toBeRemoved = document.getElementById(evId);
      toBeRemoved.innerHTML = '';
      console.log(`user points currently at ${userPoints}`);
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

//event listener for filling the to-do list
choresForm.addEventListener('submit', fillToDo);
sectionTodo.addEventListener('click', handleToDoCompleted);
