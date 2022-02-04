var express = require('express')
var app = express()
var port = process.env.PORT || 4200
app.use(express.static('./dist/vex'));
app.get('/',function(req,res){
    res.sendFile('index.html', {root: 'dist/vex/'}
  );
})
app.listen(port)