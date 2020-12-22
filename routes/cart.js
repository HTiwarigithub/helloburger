const e = require("express");

exports.addCart = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'AddCart');
        request.input('userId', db.NVarChar, req.body.userId);
        request.input('productId', db.NVarChar, req.body.productId);
        request.input('restaurantId', db.NVarChar, req.body.restaurantId);
        request.input('quantity', db.NVarChar, req.body.quantity);
        request.execute('prcCartBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Cart Not Added Successfully!",
                        "data": error
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "Cart Not Added Successfully!",
                        "data": error
                    });
                }   
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Cart Added Successfully"
                });
            }
        });
    });
};



exports.getCart = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'GetCart');
        request.input('userId', db.NVarChar, req.body.userId);
        request.execute('prcCartBugr', (error, result) => {
            console.log(error)
            if (error) {
                if(error.message == "Violation of UNIQUE KEY constraint 'UC_Person'. Cannot insert duplicate key in object 'dbo.UserBugr'. The duplicate key value is (akshaysingh@gmail.com, 9643617404)."){
                    res.send({
                        "status": "0",
                        "message": "Unable to get Cart!",
                        "data": {}
                    });
                }else{
                    res.send({
                        "status": "0",
                        "message": "Unable to get Cart!",
                        "data": {}
                    });
                }
               
            } if (result){
                if(result.recordset.length == 0){
                    res.send({
                        "status": "1",
                        "message": "Cart is empty",
                        "data": result.recordset
                    });
                }else{
                    res.send({
                        "status": "1",
                        "message": "Cart Added Successfully",
                        "data": result.recordset
                    });
                }
                
            }
        });
    });
};


exports.clearCart = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'ClearCart');
        request.input('userId', db.NVarChar, req.body.userId);
        request.execute('prcCartBugr', (error, result) => {
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
               
            } if (result){
                res.send({
                    "status": "1",
                    "message": "Cart Cleared Successfully"
                }); 
            }
        });
    });
};





exports.orderHistory = (req, res) => {
    db.close();
    db.connect(conn, () => { 
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'orderHistory');
        request.input('userId', db.NVarChar, req.body.userId);
        request.execute('prcCheckoutOrder', (error, result) => {
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
               
            } if (result){
                console.log(result.recordset[0])
                var data = JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']);
                console.log(data.length);
                for (var item = data.length-1 ; item>= 0; item--) {
                 console.log(data[item])
                 if('product' in data[item] ){
                    
                 }else{
                    data.splice(item, 1)
                 }   
                }
                console.log(data.length);
                res.send({
                    "status": "1",
                    "message": "Order List",
                    "data" : data
                }); 
            }
        });
    });
};