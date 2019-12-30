var express = require('express');
var app = express();
var port = process.env.PORT || 5000

var response;
var inputParam;
var memberData = [];

// express 設定
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

//測試時用 browser 訪問以下 URL
//http://localhost:5000/?API=01&UserId=12345&Name=小王&Gender=男&Birth=2019-01-01&Phone=095555555&ID=A120000000&Address=新竹市 東區 中央路

// 處理 API
app.get('/', function (req, res) {
  //console.log(req.query);
  inputParam = req.query;
  response = res;

  // 若無 API 參數，無效退出
  if (typeof inputParam.API == "undefined") {
    console.log("API error");
    response.send("API error");
    return 0;
  } 
  
  console.log("API is ", inputParam.API);
  if (inputParam.API == "01") {
    console.log("add Member");
    addMember();   
    return 0;
  }
});

app.listen(port, function () {
  console.log('App listening on port: ', port);
});
// express 設定結束

// Firebase 設定
var admin = require("firebase-admin");

var serviceAccount = require("./webchallenge-c16eb-firebase-adminsdk-brsl0-6086bf706f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://webchallenge-c16eb.firebaseio.com"
});


var database = admin.database(); // 初始資料庫
// Firebase 設定結束

// 增加新會員到資料庫
function addMember() {
  // 讀取目前會員資料
  database.ref("users/林口運動中心/客戶管理").once("value").then(function (snapshot) {
    //console.log(snapshot.val());
    console.log("member read done");
    var result = snapshot.val();
    
    try {
      memberData = JSON.parse(result.會員資料);
      //console.log(memberData);
    } catch (e) {
      console.log("Read from database error");
      response.send("讀取資料庫 失敗");      
      return 0;
    }
    
    // TODO: 檢查是否有相同的名字及 LineId
    
    // 呼叫寫入資料庫涵式
    addAndWriteToFirebase()
  });
}

//會員資料格式
//[
//  '盧小宏',
//  'Tony',
//  '男',
//  '1966-03-03',
//  '09XXXXXXXX',
//  'A1XXXXXXXX',
//  '新竹市'
//]
function addAndWriteToFirebase() {
  var dataToAdd =[];
  dataToAdd = [
    inputParam.Name,
    inputParam.UserId,
    inputParam.Gender,
    inputParam.Birth,
    inputParam.Phone,
    inputParam.ID,
    inputParam.Address
  ];

  memberData.push(dataToAdd);

  console.log(memberData[memberData.length-1]);
  
  database.ref('users/林口運動中心/客戶管理').set({
    會員資料: JSON.stringify(memberData),
  }, function (error) {
    if (error) {
      console.log("Write to database error");
      response.send("寫入資料庫 失敗");      
    } else {
      console.log('Write to database successful');
      response.send("寫入資料庫 OK");
    }

  });
}