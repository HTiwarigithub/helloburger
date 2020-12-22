exports.saveAddress = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'AddAddress');
        request.input('userId', db.NVarChar, req.body.userId);
        request.input('lat', db.NVarChar, req.body.lat );
        request.input('long', db.NVarChar, req.body.long );
        request.input('geoAddress', db.NVarChar, req.body.geoAddress);  
        request.input('landmark', db.NVarChar, req.body.landmark);
        request.input('phone', db.NVarChar, req.body.phone_no);


        request.execute('prcAddressBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Address Not Added Successfully!",
                        "data": error
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "Address Not Already Exist!",
                        "data": error
                    });
                }
               
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Address Added Successfully",
                    "data": result.recordset
                });
            }
        });
    });
}; 

exports.GetAddress = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'GetAddres');
        request.input('userId', db.NVarChar, req.body.userId);
        

        request.execute('prcAddressBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Address Not Added Successfully!",
                        "data": error
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "Address Not Already Exist!",
                        "data": error
                    });
                }
               
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Address Added Successfully",
                    "data": result.recordset
                });
            }
        });
    });
};

exports.deleteAddress = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'delete');
        request.input('id', db.NVarChar, req.body.id);
        request.execute('prcAddressBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Not Deleted Successfully!",
                        "data": error
                    });
                 }else{
                    res.send({
                        "status": "0",
                        "message": "Not Deleted Successfully!",
                        "data": error
                    });
                }  
               }if(result){
                res.send({
                    "status": "1",
                    "message": "Deleted Successfully!",
                    "data": result.recordset
                });
            }
        });
    });
};