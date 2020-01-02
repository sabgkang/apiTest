var express = require('express');
var app = express();
var port = process.env.PORT || 5000

var response;
var inputParam;
var memberData = [];
var memberAlreadyExist = false;

// express 設定
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
});

//測試時用 browser 訪問以下 URL
//http://localhost:5000/?API=01&UserId=12345&Name=小王&Gender=男&Birth=2019-01-01&Phone=095555555&ID=A120000000&Address=新竹市 東區 中央路

// 處理 API
//   API:00 檢查會員 成功回應 "API:00 會員已存在" 或 "API:00 會員不存在"
//   API:01 加入會員 成功回應 "API:01 會員已存在" 或 "API:01 會員寫入成功"
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
  
  //console.log("API is ", inputParam.API);
  
  switch(inputParam.API) {
    case "00":
      console.log("呼叫 API:00 檢查會員");
      checkMember();
      break;
    case "01":
      console.log("呼叫 API:01 加入會員");
      addMember();  
      break; 
    default:
      console.log("呼叫 未知API:"+inputParam.API);
      response.send("呼叫 未知API:"+inputParam.API);
  }

// previous implement by if
//  if (inputParam.API == "01") {
//    console.log("add Member");
//    addMember();   
//    return 0;
//  }
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

// 檢查會員是否已存在
function checkMember(){
  memberAlreadyExist = false;
  // 讀取目前會員資料
  database.ref("users/林口運動中心/客戶管理").once("value").then(function (snapshot) {
    //console.log(snapshot.val());
    console.log("資料庫會員資料讀取完成");
    var result = snapshot.val();
    
    try {
      memberData = JSON.parse(result.會員資料);
      //console.log(memberData);
    } catch (e) {
      console.log("API:00 讀取資料庫失敗");
      response.send("API:00 讀取資料庫失敗");      
      return 0;
    }
    
    memberData.forEach(function(member, index, array){
     if (member[1] == inputParam.UserId) {
       memberAlreadyExist = true;
     }
    });
    
    if (memberAlreadyExist) {
      response.send("API:00 會員已存在");
    } else {
      response.send("API:00 會員不存在");      
    }
  });
}

// 增加新會員到資料庫
function addMember() {
  // 讀取目前會員資料
  database.ref("users/林口運動中心/客戶管理").once("value").then(function (snapshot) {
    //console.log(snapshot.val());
    console.log("資料庫會員資料讀取完成");
    var result = snapshot.val();
    
    try {
      memberData = JSON.parse(result.會員資料);
      //console.log(memberData);
    } catch (e) {
      console.log("API:01 讀取資料庫失敗");
      response.send("API:01 讀取資料庫失敗");      
      return 0;
    }
    
    // 檢查是否有相同的名字及 LineId
    memberAlreadyExist = false;
    memberData.forEach(function(member, index, array){
     if (member[1] == inputParam.UserId) {
       memberAlreadyExist = true;
     }
    });   
    
    if (memberAlreadyExist) {
      response.send("API:01 會員已存在");
    } else {
    // 呼叫寫入資料庫涵式
    console.log("API:01 會員不存在，寫入新會員");
    addAndWriteToFirebase()     
    }    
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
//  '新竹市',
//  '180cm',
//  'URL of LINE 頭像'
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
    inputParam.Address,
    inputParam.Height,
    inputParam.PicURL
  ];

  memberData.push(dataToAdd);

  console.log(memberData[memberData.length-1]);
  
  database.ref('users/林口運動中心/客戶管理').set({
    會員資料: JSON.stringify(memberData),
  }, function (error) {
    if (error) {
      console.log("API:01 會員寫入失敗");
      response.send("API:01 會員寫入失敗");      
    } else {
      console.log("API:01 會員寫入成功");
      response.send("API:01 會員寫入成功");
    }

  });
}