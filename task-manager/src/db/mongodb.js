const { MongoClient, ObjectId } = require('mongodb');


// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'task-manager';

// mongo索引值 採用objectId
const id = new ObjectId()
console.log(id.getTimestamp())

// Use connect method to connect to the server
client.connect((err, client) => {
  if (err) {
    return console.log('fail')
  }
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  // 新增單一資料
  //   db.collection('users').insertOne({
  //    name:'Sam',
  //    age:18
  //  });

  // 新增多筆資料
  // db.collection('tasks').insertMany([
  //   {
  //     name: 'sam',
  //     age: 15,
  //   },
  //   {
  //     name: 'test',
  //     age: 78
  //   },
  //   {
  //     name: 'long',
  //     age: 78
  //   },
  //   {
  //     name: 'long2',
  //     age: 78
  //   }
  // ], (err, res) => {
  //   if (err) return console.log('fail insert')
  //   console.log(res)
  // })

  // //查詢單筆資料
  // db.collection('tasks').findOne({ age: 78 }, (err, res) => {
  //   console.log(res)
  // })

  // //查詢單筆資料 因function是轉為二進制所以要使用該方法
  // db.collection('tasks').findOne({ _id: new ObjectId("6204ae1e9792d40ed261bf49") }, (err, res) => {
  //   console.log(res)
  // })

  // //查詢多筆資料
  // db.collection('tasks').find({ name: 'sam' }).toArray((err, res) => {
  //   console.log(res)
  // })

  // 刪除單筆資料
  // db.collection('tasks').deleteOne({_id:new ObjectId("6204ae1e9792d40ed261bf49")}).then(res=>{
  //   console.log(res)
  // }).catch(err=>{
  //   console.log(err)
  // })

  // // 刪除多筆資料
  // db.collection('tasks').deleteMany({age:78}).then(res=>{
  //   console.log(res)
  // })

  // https://docs.mongodb.com/manual/reference/operator/update/ 
  // 更新單筆資料
  db.collection('tasks').updateOne({ _id: ObjectId("6204b3ca88e7a77af80fc15d") }, {
    // 修改值
    // $set: {
    //   age:78
    // },
    // 修改欄位名稱
    $rename:{
      'age':'money'
    }
  }).then(res=>{
    console.log(res)
  })

  //更新多筆資料
  db.collection('tasks').updateMany({age:15},{
    $set:{
      age:78
    }
  }).then(res=>{
    console.log(res)
  })
});


  // the following code examples can be pasted here...
