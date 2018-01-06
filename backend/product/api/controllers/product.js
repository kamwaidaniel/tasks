 'use strict';
	// Include our "db"
	var db = require('../../config/db')();
    // Exports all the functions to perform on the db
	module.exports = {getAll, save, getOne, update, delProduct};
    
	//GET /product operationId
	function getAll(req, res, next) {
		db.getAll((productRows)=>{
			res.json({products: productRows});
		});
    }
	//POST /product operationId
	function save(req, res, next) {
		db.save(req.body, (rtn) => {
			res.json({success: rtn, description: "Product added to the list!"});
		});
	}
	//GET /product/{id} operationId
	function getOne(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		db.getById(id, (product)=>{
			if(product) {
				res.json(product);
			}else {
				res.status(204).send();
			}	
		});	
	}
	//PUT /product/{id} operationId
	function update(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		db.update(id, req.body, (rtn) => {
			if(rtn==1){
				res.json({success: 1, description: "Product updated!"});
			} else {
				res.status(204).send();
			}
		});
		
	}
	//DELETE /product/{id} operationId
	function delProduct(req, res, next) {
		var id = req.swagger.params.id.value; //req.swagger contains the path parameters
		db.remove(id, (rtn) => {
			if(rtn==1){
				res.json({success: 1, description: "Product deleted!"});
			}else{
				res.status(204).send();
			}
		});
		
	}