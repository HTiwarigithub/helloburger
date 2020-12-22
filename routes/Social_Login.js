exports.Google_login = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Insert');
        request.input('name', db.NVarChar, req.body.name);
        request.input('email', db.NVarChar, req.body.email);
        request.input('phone', db.NVarChar, req.body.phone);
        request.input('activeuser', db.NVarChar, req.body.activeuser);
        request.input('password', db.NVarChar, req.body.password);
        request.input('otp', db.NVarChar, req.body.otp);
        request.input('SocialID', db.NVarChar, req.body.SocialID);
        request.input('isgoogle', db.NVarChar, req.body.isgoogle);
        request.execute('Google_login', (error, result) => {
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
                    "message": "Google Login List",
                    "data": result.recordset
                });
            }
        });
    });

};


exports.FaceBook_login = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'Insert');
        request.input('name', db.NVarChar, req.body.name);
        request.input('email', db.NVarChar, req.body.email);
        request.input('phone', db.NVarChar, req.body.phone);
        request.input('activeuser', db.NVarChar, req.body.activeuser);
        request.input('password', db.NVarChar, req.body.password);
        request.input('otp', db.NVarChar, req.body.otp);
        request.input('SocialID', db.NVarChar, req.body.SocialID);
        request.input('isgoogle', db.NVarChar, req.body.isgoogle);
        request.execute('FB_login', (error, result) => {
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
                    "message": "facebook Login List",
                    "data": result.recordset
                });
            }
        });
    });

};