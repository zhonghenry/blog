var Db = require('./db');
var mongodb = new Db();

function Post(name, title, post) {
  this.name = name;
  this.title = title;
  this.post = post;
}

module.exports = Post;

//存储一篇文章及其相关信息
Post.prototype.save = function(callback) {
  var date = new Date();
  //存储各种时间格式，方便以后扩展
  var time = {
      date: date,
      year : date.getFullYear(),
      month : date.getFullYear() + "-" + (date.getMonth() + 1),
      day : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
      minute : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + 
      date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) 
  }
  //要存入数据库的文档
  var post = {
      name: this.name,
      time: time,
      title: this.title,
      post: this.post
  };
  mongodb.insert(post,'posts',function(err,result){
    if(err){
      return callback(err);//错误，返回 err 信息
    }
    callback(null, post);
  });
};

//读取文章及其相关信息
Post.get = function(name, callback) {
    var query = {};
    if (name) {
      query.name = name;
    }
    mongodb.find(query,'posts',function(err,result){
        if (err) {
           return callback(err);//错误，返回 err 信息
         }
         callback(null, result);//成功！err 为 null，并返回存储后的用户文档
    });
};