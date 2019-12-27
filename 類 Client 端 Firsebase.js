// 類 Client 端這裡用 require 載入套件
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

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

// 建立 Auth 狀態改變的監視函式，
firebase.auth().onAuthStateChanged(function (user) {
  //console.log(user);
  if (user == null) {
    // not login
    console.log("No user login");
  } else {
    // login
    console.log(user.email, " login");
  }
});

// 建立 database，使用 sandbox 來測試，

// database 的規則設為如下，任何人都可以讀取，
// 但需要登入後(auth.uid != null) 才能寫入，
//{
//  "rules": {
//    "sandbox":{
//    ".read": true,
//    ".write": "auth.uid != null"     
//    }
//  }
//}

// 用 signInWithEmailAndPassword() 登入，
firebase.auth().signInWithEmailAndPassword("aaa@test.com", "aaaaaa").catch(function (error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error);
});

// 宣告 database，
var database = firebase.database();

// 讀取 database 中的 sandbox
database.ref('sandbox').once('value').then(function (snapshot) {
  console.log("sandbox read done");
  var result = snapshot.val();
  var data = JSON.parse(result.Test);
  console.log(data);
});

// 寫入 database 中的 sandbox
// 延遲 1 秒，等前面的 SignIn 完成
setTimeout(function () {
  database.ref('sandbox').set({
    Test: JSON.stringify("bbb"),
  }, function (error) {
    if (error) {
      console.log("Write to database error");
    } else {
      console.log('Write to database successful');
    };
  });
}, 1000);
