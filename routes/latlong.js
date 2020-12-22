exports.getLatLong = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Getlatlong');
        request.input('delID', db.NVarChar, req.body.delID);
        request.execute('LatLong', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == ""){
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
                    "message": "Lat-Long List",
                    "data": result.recordset
                });
            }
        });
    });

};
exports.UDLatLong = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Updatelatlong');
        request.input('lat', db.NVarChar, req.body.lat);
        request.input('long', db.NVarChar, req.body.long);
        request.input('delID', db.NVarChar, req.body.delID);
        request.execute('LatLong', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == ""){
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
                    "message": "Updated",
                    "data": result.recordset
                });
            }
        });
    });

};