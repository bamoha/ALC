var express = require('express');
var router = express.Router();
var mongojs = require('mongojs')
var db = mongojs('mongodb://bash:bash@ds163034.mlab.com:63034/resourcess', ['resources', 'student']);

/* GET users listing. */
router.get('/resources', function(req, res, next) {
  db.resources.find(function(err, resources){
  	if(err){
  		res.send(err);
  	}
  	res.json(resources)
  })
});

router.get('/resource/:id', function(req, res, next){
	db.resources.findOne({_id: mongojs.objectId(req.params.id)}, function(err, resource){
  	if(err){
  		res.send(err);
  	}
  	res.json(resource)
  })
});

router.post('/resource', function(req, res, next){
	var resource = req.body
	if(!resource.title || (resource.isDone + '')){
		res.status(400);
		res.json({
			"error": "Bad data"
		})
	} else { 
		db.resources.save(resource, function(err, resource){
			if(err){
  				res.send(err);
  				}
  				res.json(resource)
		} );


	}

});

router.delete('/student', function(req, res, next){
	db.student.remove({_id: mongojs.objectId(req.params.id)}, function(err, student){
  	if(err){
  		res.send(err);
  	}
  	res.json(student)
  })
});

router.put('/student', function(req, res, next){

	var student = req.body;
	var updtStudent ={};

	if (student.isDone) {
		updtStudent.isDone = student.isDone;
	}
	if (student.name) {
		updtStudent.name = student.name;
	}
	if (student.class) {
		updtStudent.class = student.class;
	}
	if (!updtStudent) {
		res.status(400);
		res.json({
			'error': 'Bad data'
		})
	} else {
		db.student.update({_id: mongojs.objectId(req.params.id)}, updtStudent, {}, function(err,student){
	  	if(err){
	  		res.send(err);
	  	}
	  	res.json(student)
  })
	}
	
});

module.exports = router;
