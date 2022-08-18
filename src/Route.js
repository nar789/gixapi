;(function(){
	module.exports=function(_g){

		var app = _g.app;
		var http = _g.http;
		const mysql = require('mysql');
		const conn = mysql.createConnection({
			host:'localhost',
			user:'root',
			password:'black',
			database:'gix'
		});

		function route(){
			app.get('/',function(req,res){
				res.render('index.html',{});
			});


			app.post('/api/info',(req,res) => {
				const info = req.body.info;
				console.log('info = ' + info);
				let qry = `UPDATE info SET info = '${info}' WHERE id = 1`;
				try {
					conn.query(qry, (err,rows) => {
						if(err) {
							console.log(err); 
							res.send('fail');
							return;
						}
						res.send('success');
					});
				} catch(err) {
					console.log(err);
					res.send('fail');
				}
			});

			app.get('/api/info/read',(req,res) => {
				let qry = `SELECT * FROM info WHERE id = 1`;
				try {
					conn.query(qry, (err,rows) => {
						if(err) {
							console.log(err); 
							res.send('fail');
							return;
						}
						if(rows.length > 0) {
							const info = JSON.parse(rows[0].info); 
							console.log("str = " + JSON.stringify(info));
							res.json(info);
							return;
						}
						res.send('success');
					});
				} catch(err) {
					console.log(err);
					res.send('fail');
				}
			});


			//1. enetry point
			app.listen(8818,function(){
			  console.log('GIX Server listen on *:8818');
			});

			

		}


		var publicReturn = {
			route:route,
		}
		return publicReturn;
	}

})();



