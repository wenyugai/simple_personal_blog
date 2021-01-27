var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});




const mongoose = require('mongoose');
/*
function connect(){
    mongoose.connect('mongodb://localhost/blogs')
            .then(function (response) {
              //console.log("already connected to mongodb.");
            })
	    .catch(function (error) {
	        console.log(error);
	    });
}
function disconnect(){
    mongoose.connection.close();
}
*/
mongoose.connect('mongodb://localhost/blogs')
            .then(function (response) {
              //console.log("already connected to mongodb.");
            })
	    .catch(function (error) {
	        console.log(error);
	    });
	    
//var db=mongoose.connection;
//db.on('error', console.error.bind(console, 'connection error:'));
//db.once('open', function() {
//  console.log("connection succeeds.");
//});

const articleSchema=new mongoose.Schema(
    {
     title: String,
     passage: String,
     updateTime: {
        type: Date,
        default: Date.now
     }
    }
);
const Article = mongoose.model('Article',articleSchema);

/*
const article = new Article({title:'test',passage:'I am testing.',publishat:new Date().getTime()});
article.save();
*/

router.get('/article/list', function(req, res) {
  //connect();
  Article.find({},'title updateTime _id',{sort:{updateTime:'desc'}},function(err,docs){
      res.send(docs);
      //disconnect();
  });
  
});

router.get('/article/id/:id', function(req, res) {
  //connect();
  var id=req.params.id;
  Article.findById(id,function(err,docs){
      if(err){res.sendStatus(404);}
      else res.send(docs);
      //disconnect();
  });
  
});  
  
router.post('/article/new', function(req, res) {
  //connect();
  var body=req.body;
  var id=body.id;
  var title=body.title;
  var content=body.content;
  
  /*
  const article = new Article({title:title,passage:content,publishat:new Date().getTime()});
  article.save(function(err,doc) {
   console.log(doc.id);
  });
  */
  if(id.length==0){
      Article.create({title:title,passage:content,updateTime:new Date().getTime()},function(err,doc){
          if(err) {
              console.log(err);
              res.sendStatus(500);
          } else {
              res.send(doc.id);
          }
      
      //disconnect();
      });
  } else {
      let _id = mongoose.Types.ObjectId(id);
      
      Article.update({'_id':_id},{$set:{'title':title,'passage':content,'updateTime':new Date().getTime()}},function(err,doc){
          if(err) {
              res.send(err);
              res.sendStatus(500);
          } else {
              res.send(id);
          }
      });
      
  }
  
  
});

router.delete('/article/id/:id',function(req, res){
    var id=req.params.id;
    //console.log(id);
    Article.findByIdAndDelete(id,function(err){
        if(err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.sendStatus(200);
        }
    });
});


module.exports = router;
