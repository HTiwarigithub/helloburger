exports.getRestaurant = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'GetRestaurant');
        request.input('lat', db.NVarChar, req.body.lat);
        request.input('long', db.NVarChar, req.body.long);
        request.execute('prcRestaurantBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Error Occured!",
                        "data": {}
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "Error Occured!",
                        "data": {}
                    });
                }
               
            }if (result){
                console.log()
                for (var item = result.recordset.length-1 ;item>=0; item--){
                    if(ValidLocation(req.body.lat,result.recordset[item].lat,req.body.long,result.recordset[item].long)){
                        
                    }else{
                        result.recordset.splice(item, 1);
                    }
                   
                }
                res.send({
                    "status": "1",
                    "message": "Restaurant List",
                    "data": result.recordset
                });
            }
        });
    });
};



exports.addrestaurant = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'signup');
        request.input('name', db.NVarChar, req.body.name);
        request.input('email', db.NVarChar, req.body.email);
        request.input('phone', db.NVarChar, req.body.phone);
        request.input('password', db.NVarChar, req.body.password);
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Error Occured!",
                        "data": {}
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "Error Occured!",
                        "data": {}
                    });
                }
               
            }if (result){
                res.send({
                    "status": "1",
                    "message": "Submit Success",
                    "data": result
                });
            }
        });
    });
};

function ValidLocation(lat1,lat2,long1,long2){
    var unit = "K"
    if ((lat1 == lat2) && (long1 == long2)) {
		return 0;
    }
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = long1-long2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        console.log(dist)
        if(dist<=300){
            return true;
        }else{
            return false;
        }
	}
}