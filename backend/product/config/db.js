'use strict;'
const sqlite3 = require('sqlite3').verbose();
// open the database
let db = new sqlite3.Database('./db/products.db');

let sql = 'SELECT * FROM products';

let getlastRowId = function(callback){
	let lastRowSql = "SELECT * FROM products ORDER BY id DESC LIMIT 1";
	db.all(lastRowSql, [], (err, rows) => {
		if (err) {
		  throw err;
		}
		callback(rows);
	  });
}

module.exports = function() {
	return {
		productList : [],

		getAll(callback) {
			db.all(sql, [], (err, rows) => {
				if (err) {
				  throw err;
				}
				callback(rows);
			  });
		},

		save(product, callback) {	
			let insertSql = "Insert into products (title, description, price) values ('" + product.title.replace(/'/g,'\'\'') +"','";
			insertSql += product.description.replace(/'/g,'\'\'') + "','";
			insertSql += product.price + "' )";
			db.run(insertSql, function(err) {
				if (err) {
					throw err;
				}
				getlastRowId(callback);
			});
		},

		getById(id, callback) {
			getByIdSql = sql;
			getByIdSql += ' where Id = ?';
			db.get(getByIdSql, id, (err, row) => {
				if (err) {
				  return console.error(err.message);
				}
				callback(row);
			  });
		},

		remove(id, callback) {
			let delSql = "Delete from products where id = '" + id + "'";
			db.run(delSql, function(err) {
				if (err) {
					throw err;
				}
				callback(1);
			});	
		},

		update(id, product, callback) {
			let updateSql = "Update products set title = '" + product.title.replace(/'/g,'\'\'') + "', description = '";
			updateSql += product.description.replace(/'/g,'\'\'') +"', price = " + product.price + " where Id = " + id;
			db.run(updateSql, function(err) {
				if (err) {
					throw err;
				}
				callback(1);
			});
		}
	}
};  