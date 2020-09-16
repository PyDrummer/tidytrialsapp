'use strict';

// All globally scoped variables
var usersNameArray = ['dasad'];
var usersArray = [];
var loginForm = document.getElementById('loginForm');
var registerUserForm = document.getElementById('registerUserForm');
var currentUser = [];
var retrieveUser = localStorage.getItem('users');
var retrieveUserName = localStorage.getItem('usersName');

// User object constructor
function Users(name) {
  this.name = name;
  this.userPoints = 0;
  usersArray.push(this);
}

// Fills usersArray from local storage or new instances
if (retrieveUser) {
  usersArray = JSON.parse(retrieveUser);
} else {
  new Users('xyz');
}

// Fills userNameArray from local storage
if (retrieveUserName) {
  usersNameArray = JSON.parse(retrieveUserName);
}

// 201 level user login (no password)
function login(event) {
  event.preventDefault();
  var loginUser = event.target.username.value;
  for (var i = 0; i < usersNameArray.length; i++) {
    if (usersNameArray.includes(loginUser)) {
      alert(`Welcome Back ${loginUser}`);
      for (var j = 0; j < usersArray.length; j++) {
        if (loginUser === usersArray[j].name) {
          currentUser.push(usersArray[j]);
          var userStr = JSON.stringify(currentUser);
          localStorage.setItem('userObject', userStr);
        }
      }
      window.location.replace('');
      break;
    } else {
      alert('Not a Valid Username');
      break;
    }
  }
  loginForm.reset();
}

// Creates new user for login
function registerUser(event) {
  event.preventDefault();
  var loginUser = event.target.username.value;
  for (var i = 0; i < usersArray.length; i++) {
    if (loginUser !== usersArray[i].name) {
      alert('Welcome to Tidy Trials');
      new Users(loginUser);
      usersNameArray.push(loginUser);
      break;
    }
  }
  registerUserForm.reset();
  var stringUsersArray = JSON.stringify(usersArray);
  localStorage.setItem('users', stringUsersArray);
  var stringUsersNameArray = JSON.stringify(usersNameArray);
  localStorage.setItem('usersName', stringUsersNameArray);
}

// Listens for login
loginForm.addEventListener('submit', login);
// Listens for user creation
registerUserForm.addEventListener('submit', registerUser);
