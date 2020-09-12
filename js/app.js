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

// constructor to add the day option to the chores
var AddDayToChores = function (chores, day) {
  this.chores = chores;
  this.day = day;
  this.content = [];
  this.id = [];
};

// item is a blank array.
var ChoreAndDay = function (item) {
  this.item = item;
};

ChoreAndDay.prototype.addItem = function (chores, day) {
  var newChoreAndDay = new AddDayToChores(chores, day);
  this.item.push(newChoreAndDay);
};

// ---- All the constructors above need to work before addedChores works. ------
// chore and day object stored in addedChores
var addedChores = new ChoreAndDay([]);

function fillToDo(event) {
  event.preventDefault();
  var choreName = event.target.chores_index.value;
  //console.log(choreName);
  var daySelection = event.target.day_index.value;
  //console.log(daySelection);
  addedChores.addItem(choreName, daySelection);
  //console.log(addedChores); this works
  postToDoList();
}
//-----------------------------------------------


var liRef = 0;
var item = addedChores.item;
var idName;
function postToDoList() {
  var li = document.createElement('li');
  for (var i = 0; i < item.length; i++) {
    idName = item[i].chores + i;
  }
  li.setAttribute('id', idName);
  li.textContent = `${item[liRef].chores} should be done ${item[liRef].day}`;
  item[liRef].content.push(`${item[liRef].chores} should be done ${item[liRef].day}`);
  item[liRef].id.push(idName);
  ul.append(li);
  liRef++;
}

//----------------------------- We left off here 9.9.2020
var evId;
function handleToDoCompleted(event) {
  // thing 1, take it out
  // thing 2, get the chore (name) and the choreArray.chore, grab the points assoiacted with that. Send that to a points global variable.
  evId = event.target.id;
  console.log(evId);
  for (var i = 0; i < addedChores.item.length; i++) {
    // console.log(event.target.id);
    if (evId === item[i].id[0]) {
      console.log(`item instance chore name is, ${addedChores.item[i].id[0]}`);
      // console.log(i);
      break;
    }
  }
  for (var j = 0; j < choreArray.length; j++) {
    if (item[i].chores === choreArray[j].chore) {
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
function moveToCompleted () {
  for (var i = 0; i < item.length; i++) {
    if (item[i].id[0] === evId) {
      use = item[i].content;
    }
  }
  var li = document.createElement('li');
  li.textContent = `${use} has been completed!`;
  completedUl.append(li);

}

//event listener for filling the to-do list
choresForm.addEventListener('submit', fillToDo);
sectionTodo.addEventListener('click', handleToDoCompleted);
