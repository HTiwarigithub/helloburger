const http = require('http');
exports.userSignup = (req, res) => {
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
               
            }if (result){
                var message = 'Your Hello Burger app otp is: ' + result.recordset[0].otp ;
                var number = req.body.phone;
                http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
                    });
                    response.on('end', () => {
                        res.send({
                            "status": "1",
                            "message": "Otp For registration send to your Mobile",
                            "data": result.recordset[0]
                        })
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            }
        });
    });
};

exports.login = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'login');
        request.input('email', db.NVarChar, req.body.email);
        request.input('password', db.NVarChar, req.body.password);
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data": {}
                });
            }else{
               console.log(result.recordset)  
                if(result.recordset.length == 0){
                    res.send({
                        "status": "0",
                        "message": "Invalid Credential",
                        "data": {}
                    }); 
                }else if(result.recordset.activeuser == 'false'){
                    res.send({
                        "status": "0",
                        "message": "Incomplete Registration",
                        "data": {}
                    });
                }
                else{
                    res.send({
                        "status": "1",
                        "message": "Login Successful",
                        "data": result.recordset[0]
                    });
                }

                
            }
           
        });
    });
};

exports.reg_otp = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'validate');
        request.input('userId', db.NVarChar, req.body.userId);
        request.input('otp', db.NVarChar, req.body.otp);
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data": {}
                });
            }else{

              if(result.recordset[0].result == 'false'){
                res.send({
                    "status": "1",
                    "message": "Validate Fail!",
                    "data": result.recordset[0].result
                });
              }else if((result.recordset[0].result == 'true')){
                res.send({
                    "status": "1",
                    "message": "Validate Successful!",
                    "data": result.recordset[0].result
                });
              }

                
            }
           
        });
    });
};

exports.getotpForget = (req, res) => {
    console.log('hi')
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'getotpForget');
        request.input('email', db.NVarChar, req.body.email);
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data": {}
                });
            } else if(result.recordset[0].otp == '0000'){
                res.send({
                    "status": "0",
                    "message": "Validate Fail",
                    "data": result.recordset[0].otp
                });
           
            } else {
                var message = 'Your Hello Burger app otp is: ' + result.recordset[0].otp ;
                var number = req.body.email;
                http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
                    });
                    response.on('end', () => {
                        res.send({
                            "status": "1",
                            "message": "Otp For registration send to your Mobile",
                            "data": result.recordset[0]
                        })
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            }
           
        });
    });
};

exports.validateForgot = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'validateForgot');
        request.input('email', db.NVarChar, req.body.email);
        request.input('otp', db.NVarChar, req.body.otp);
        request.input('password',db.NVarChar , req.body.password)
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data": {}
                });
            }else{
                res.send({
                    "status": "1",
                    "message": "Validate Successful",
                    "data": result.recordset[0].result
                });
            }
           
        });
    });
};

exports.ResendOTP = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'ResendOTP');
        request.input('userId', db.NVarChar, req.body.userId);
        request.input('email', db.NVarChar, req.body.email);
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data": {}
                });
            }else{
                var message = 'Your Hello Burger app otp is: ' + result.recordset[0].otp ;
                var number = req.body.email;
                http.get('http://www.teleshoppe.com/serv/BulkPush/?user=tsb&pass=12345678&message=' + message + '&msisdn=' + number + '&sender=SVMTPL&type=text', (response) => {
                    let data = '';
                    response.on('data', (chunk) => {
                        data += chunk;
                    });
                    response.on('end', () => {
                        res.send({
                            "status": "1",
                            "message": "Otp For registration send to your Mobile",
                            "data": result.recordset[0]
                        })
                    });

                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });
            }
            
        });
    });
};





exports.updateUser = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'ResendOTP');
        request.input('userId', db.NVarChar, req.body.userId);
        request.execute('prcLoginBugr', (error, result) => {
            if (error) {
                console.log(error)
                res.send({
                    "status": "0",
                    "message": "Error occured",
                    "data": {}
                });
            }else{
                res.send({
                    "status":  "1",
                    "message": "Otp sent on your phone!",
                    "data": result.recordset[0].otp
                });
            }
           
        });
    });
};



