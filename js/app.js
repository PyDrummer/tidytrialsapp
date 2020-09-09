'use strict';

var choreArray = [];
var chores = ['sweep', 'mop', 'dishes', 'dusting', 'laundry', 'mow lawn', 'collect leaves'];
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var choreList = document.getElementById('choresIndex');
var dayList = document.getElementById('dayIndex');
var button = document.getElementById('button');

// chore constructor
var CreateChores = function (chore, days) {
  this.chore = chore;
  this.days = days;
  this.points = 0;
  choreArray.push(this);
};

// fills index.html dropdown menus
function fillDropDown() {
  for (var i = 0; i < chores.length; i++) {
    var option = document.createElement('option');
    option.textContent = chores[i];
    choreList.append(option);

    option = document.createElement('option');
    option.textContent = days[i];
    dayList.append(option);
  }
}

fillDropDown();

// button.addEventListener('submit', fillDropDown);
