'use strict';

var express = require('express');
var cors = require('cors');
var multer =  require('multer');
var upload = multer()

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req,res)=> {
  //{"name":"img3.png","type":"image/png","size":545}
  const fileName = req.file.originalname;
  const type = req.file.mimetype;
  const size = req.file.size;
  console.log('fileName',fileName,type,size);
  res.json({'name':fileName,'type':type,'size':size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
