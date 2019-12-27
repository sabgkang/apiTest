var admin = require("firebase-admin");

var serviceAccount = require("./webchallenge-c16eb-firebase-adminsdk-brsl0-6086bf706f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webchallenge-c16eb.firebaseio.com"
});


var database = admin.database();
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

// 讀取 database 中的 sandbox
database.ref("sandbox").once("value", function(snapshot) {
  console.log(snapshot.val());
});

database.ref('test').set({
  Test: JSON.stringify("Aaa"),
}, function (error) {
  if (error) {
    console.log("Write to database error");
  }
  console.log('Write to database successful');
});
