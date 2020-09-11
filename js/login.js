'use strict';

var usersArray = [];
var myForm = document.getElementById('loginForm');
var myFormNewUser = document.getElementById('newUserForm');


/*var Users = function (name) {
  this.name = name;
  usersArray.push(this);
};*/

function login(event) {
  event.preventDefault();
  var loginUser = event.target.username.value;
  //console.log(loginUser);
  for (var i = 0; i < usersArray.length; i++) {
    if (loginUser === usersArray[i]) {
      console.log(loginUser + ' is logged in');
      return;
    }
  }
  console.log('not a valid username');
}

function registerUser(event){
  event.preventDefault();
  var createUser = event.target.username.value;
  usersArray.push(createUser);
  console.log(usersArray);
  var stringUsers = JSON.stringify(usersArray);
  localStorage.setItem('users', stringUsers);
}


myForm.addEventListener('submit', login);
myFormNewUser.addEventListener('submit', registerUser);
