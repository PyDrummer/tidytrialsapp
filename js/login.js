'use strict';


var usersArray = [];
var loginForm = document.getElementById('loginForm');
//var myFormNewUser = document.getElementById('newUserForm');



function Users(name) {
  this.name = name;
  this.userPoints = 0;
  usersArray.push(this);
}

var retrieveUser = localStorage.getItem('users');
if (retrieveUser) {
  usersArray = JSON.parse(retrieveUser);
}

function login(event) {
  event.preventDefault();
  var loginUser = event.target.username.value;
  console.log(loginUser);
  //usersArray = JSON.parse(retrieveUser);
  for (var i = 0; i < usersArray.length; i++) {
    console.log(usersArray);
    while (usersArray[i].name.includes(loginUser)) {
      alert(`${loginUser} Welcome Back!!!.`);
      break;
    }
    new Users(loginUser);
    var stringUsers = JSON.stringify(usersArray);
    localStorage.setItem('users', stringUsers);
    alert(`${loginUser} welcome to Tidy Trials`);
    break;

    // if (loginUser === usersArray[i].name) {
    //   alert(`${loginUser} Welcome Back!!!.`);
    //   console.log(loginUser + ' is logged in');
    // }
    // if (loginUser !== usersArray[i].name) {
    //   console.log(loginUser, usersArray[i].name);
    //   new Users(loginUser);
    //   var stringUsers = JSON.stringify(usersArray);
    //   localStorage.setItem('users', stringUsers);
    //   alert(`${loginUser} welcome to Tidy Trials`);
    //   break;
    // }
  }
}
//new Users('xyz');


/*function registerUser(event){
  event.preventDefault();
  var createUser = event.target.username.value;
  usersArray.push(createUser);
  console.log(usersArray);
  var stringUsers = JSON.stringify(usersArray);
  localStorage.setItem('users', stringUsers);
}*/


loginForm.addEventListener('submit', login);
//myFormNewUser.addEventListener('submit', registerUser);
