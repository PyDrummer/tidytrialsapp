'use strict';

var usersNameArray = ['dasad'];
var usersArray = [];
var loginForm = document.getElementById('loginForm');
var registerUserForm = document.getElementById('registerUserForm');
var currentUser = [];
//var myFormNewUser = document.getElementById('newUserForm');



function Users(name) {
  this.name = name;
  this.userPoints = 0;
  usersArray.push(this);
}

var retrieveUser = localStorage.getItem('users');
if (retrieveUser) {
  usersArray = JSON.parse(retrieveUser);
} else {
  new Users('xyz');
}

// var retrieveUser = localStorage.getItem('users');
// if (retrieveUser) {
//   usersArray = JSON.parse(retrieveUser);
// }

var retrieveUserName = localStorage.getItem('usersName');
if (retrieveUserName) {
  usersNameArray = JSON.parse(retrieveUserName);
}


function login(event) {
  event.preventDefault();
  var loginUser = event.target.username.value;
  //console.log('log1', loginUser);
  for (var i = 0; i < usersNameArray.length; i++) {
    //console.log('log2', usersNameArray);
    if (usersNameArray.includes(loginUser)) {
      console.log('log3',usersNameArray.includes(loginUser));
      alert(`Welcome Back ${loginUser}`);

      for (var j = 0; j < usersArray.length; j++) {
        console.log(loginUser);
        if (loginUser === usersArray[j].name) {
          currentUser.push(usersArray[j]);
          var userStr = JSON.stringify(currentUser);
          localStorage.setItem('userObject', userStr);
          console.log(currentUser);
        }
      }
      window.location.replace('https://pydrummer.github.io/tidytrialsapp/html/home.html');

      break;
    } else {
      alert('Not a Valid Username');
      break;
    }
  }
  loginForm.reset();
}

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
  console.log(usersNameArray);
  registerUserForm.reset();
  var stringUsersArray = JSON.stringify(usersArray);
  localStorage.setItem('users', stringUsersArray);
  var stringUsersNameArray = JSON.stringify(usersNameArray);
  localStorage.setItem('usersName', stringUsersNameArray);
}


// new Users('xyz');





loginForm.addEventListener('submit', login);
registerUserForm.addEventListener('submit', registerUser);
