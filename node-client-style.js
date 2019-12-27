const http = require('http');
const url = require('url');

var firebase = require('firebase/app');
require('firebase/database');
require('firebase/auth');

var firebaseConfig = {
  apiKey: "AIzaSyAhr69v1SCFW5mwzfv-qfMA6xL0IhKHNrc",
  authDomain: "webchallenge-c16eb.firebaseapp.com",
  databaseURL: "https://webchallenge-c16eb.firebaseio.com",
  projectId: "webchallenge-c16eb",
  storageBucket: "webchallenge-c16eb.appspot.com",
  messagingSenderId: "372130663533",
  appId: "1:372130663533:web:d73219272c0b4faf7f8364",
  measurementId: "G-LZ3DN86LX1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


var isLogin = false;
firebase.auth().onAuthStateChanged(function (user) {
  //console.log(user);
  if (user == null) {
    // not login
    console.log("no login");
    console.log(firebase.auth().currentUser);
    isLogin = false;
  } else {
    // login
    console.log(user.email, " login");
    isLogin = true;

    // Set is denied, 但不是已經 login 了? 
        database.ref('sandbox').set({
          Test: JSON.stringify("aaa"),
        }, function (error) {
          if (error) {
            console.log("Write to database error");
          } else {
            console.log('Write to database successful');
          };
        });

  }
});

//firebase.auth().signInWithEmailAndPassword("aaa@test.com", "aaaaaa").catch(function (error) {
//  // Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//  console.log(error);
//});



//// Read is OK
//database.ref('sandbox').once('value').then(function (snapshot) {
//  console.log("member read done");
//  var result = snapshot.val();
//  memberData = JSON.parse(result.Test);
//  console.log(memberData);
//});
//
//// Set is denied
database.ref('sandbox').set({
  Test: JSON.stringify("bbb"),
}, function (error) {
  if (error) {
    console.log("Write to database error");
  } else {
    console.log('Write to database successful');
  };
});