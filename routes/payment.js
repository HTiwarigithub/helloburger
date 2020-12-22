exports.checkOut = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'CheckOut');

        request.input('userId', db.NVarChar, req.body.userId);
        request.input('addressId', db.NVarChar, req.body.addressId);
        request.input('offerId', db.NVarChar, req.body.offerId);

        request.input('basePrice', db.NVarChar, req.body.basePrice);
        request.input('offerprice', db.NVarChar, req.body.offerprice);
        request.input('deliverycharge', db.NVarChar, req.body.deliverycharge);

        request.input('netamount', db.NVarChar, req.body.netamount);
        request.input('phonenumber', db.NVarChar, req.body.phonenumber);
        request.input('quantity', db.NVarChar, req.body.quantity);


        request.execute('prcCheckoutOrder', (error, result) => {
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
                        "message": "User Not Already Exist!",
                        "data": error
                    });
                }
               
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Cart Added Successfully",
                    "data": result.recordsets[1][0]
                });
            }
        });
    });
};



exports.checkSum = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'CheckOut');

        request.input('userId', db.NVarChar, req.body.userId);
        request.input('addressId', db.NVarChar, req.body.addressId);
        request.input('offerId', db.NVarChar, req.body.offerId);

        request.input('basePrice', db.NVarChar, req.body.basePrice);
        request.input('offerprice', db.NVarChar, req.body.offerprice);
        request.input('deliverycharge', db.NVarChar, req.body.deliverycharge);

        request.input('netamount', db.NVarChar, req.body.netamount);
        request.input('phonenumber', db.NVarChar, req.body.phonenumber);
        request.input('quantity', db.NVarChar, req.body.quantity);


        request.execute('prcCheckoutOrder', (error, result) => {
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
                        "message": "User Not Already Exist!",
                        "data": error
                    });
                }
               
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Cart Added Successfully",
                    "data": result.recordsets[1][0]
                });
            }
        });
    });
};






exports.selectPaytm = (req, res) => {
    db.close();
    db.connect(conn, () => {

        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'selectPaymentType');
        request.input('orderid', db.NVarChar, req.body.orderid);
        request.input('payType',db.NVarChar, req.body.payType);
        request.input('userId',db.NVarChar, req.body.userId);
        request.execute('prcCheckoutOrder', (error, result) => {
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
                        "message": "User Not Already Exist!",
                        "data": error
                    });
                }
               
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Payment status Updated"
                });
            }
        });
    });
};


exports.updatetransactionId = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'updatetransactionId');
        request.input('orderid', db.NVarChar, req.body.orderid);
        request.input('txnid',db.NVarChar, req.body.txnid);
        request.input('userId',db.NVarChar, req.body.userId);
        request.input('status',db.NVarChar, req.body.status);
        request.execute('prcCheckoutOrder', (error, result) => {
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
                        "message": "User Not Already Exist!",
                        "data": error
                    });
                }
               
            }if(result){
                res.send({
                    "status": "1",
                    "message": "Payment status Updated"
                });
            }
        });
    });
};
