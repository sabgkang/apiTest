const http = require('http');
const url = require('url');
//
//var admin = require("firebase-admin");
//
//var serviceAccount = require("./webchallenge-c16eb-firebase-adminsdk-brsl0-6086bf706f.json");
//
//admin.initializeApp({
//  credential: admin.credential.cert(serviceAccount),
//  databaseURL: "https://webchallenge-c16eb.firebaseio.com"
//});
//
//
//var db = admin.database();
//var ref = db.ref("users/林口運動中心/客戶管理");
//ref.once("value", function(snapshot) {
//  console.log(snapshot.val());
//});
//
//db.ref('test').set({
//  Test: JSON.stringify("Aaa"),
//}, function (error) {
//  if (error) {
//    console.log("Write to database error");
//  }
//  console.log('Write to database successful');
//});


require('firebase/database');
//require('firebase/auth');

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
//firebase.analytics();


//var isLogin = false;
//firebase.auth().onAuthStateChanged(function (user) {
//  console.log(user);
//
//  if (user == null) {
//    // not login
//    console.log("no login");
//    isLogin = false;
//  } else {
//    // login
//    console.log(user.email);
//    isLogin = true; 
//  }
//});
//
//firebase.auth().signInWithEmailAndPassword("aaa@test.com", "aaaaaa").catch(function (error) {
//  // Handle Errors here.
//  var errorCode = error.code;
//  var errorMessage = error.message;
//});
//
//console.log("Waiting for login ...");
//while (isLogin==false) {
//  
//}
//
//console.log("login OK");

//var database = firebase.database();
//
//database.ref('users/林口運動中心/客戶管理').once('value').then(function (snapshot) {
//  console.log("member read done");
//  var result = snapshot.val();
//  memberData = JSON.parse(result.會員資料);
//  console.log(memberData);
//});
//
//database.ref('test').set({
//  Test: JSON.stringify("Aaa"),
//}, function (error) {
//  if (error) {
//    console.log("Write to database error");
//  }
//  console.log('Write to database successful');
//});