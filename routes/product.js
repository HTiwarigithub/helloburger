exports.getAllProduct = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'GetProduct');
        request.input('userId' ,db.NVarChar , req.body.userId);
        request.execute('prcProductBugr', (error, result) => {
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
                res.send({
                    "status": "1",
                    "message": "Product List",
                    "data": result.recordset
                });
            }
        });
    });
};


exports.getAllResProduct = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'GetResProduct');
        request.input('resId', db.NVarChar, req.body.resId);
        request.input('userId' ,db.NVarChar , req.body.userId)
        request.execute('prcProductBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "User Already Exist!",
                        "data": {}
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "User Already Exist!",
                        "data": {}
                    });
                }
               
            } if (result){
                res.send({
                    "status": "1",
                    "message": "Restaurant List",
                    "data": result.recordset
                });
            }
        });
    });
};