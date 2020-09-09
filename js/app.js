'use strict';

var choreArray = [];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var choreList = document.getElementById('chores_index');
var dayList = document.getElementById('day_index');
var choresForm = document.getElementById('chores_form');

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
  var choreName = event.target.chores_index.value;
  console.log(choreName);
  var daySelection = event.target.day_index.value;
  console.log(daySelection);

  addedChores.addItem(choreName, daySelection);
  //console.log(addedChores); this works
  postToDoList();
}
//-----------------------------------------------

function postToDoList () {
  var ul = document.getElementById('todo');
  var item = addedChores.item;
  for (var i = 0; i < item.length; i++) {
    var li = document.createElement('li');
    li.textContent = `${item[i].chores} should be done ${item[i].day}`;
    ul.append(li);
  }
}

//event listener for filling the to-do list
choresForm.addEventListener('submit', fillToDo);
