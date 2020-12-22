exports.del_orderlistcnf = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'getorder_cnf');
        request.input('del_id', db.NVarChar, req.body.del_id);
        request.execute('OrederList', (error, result) => {
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
                    "message": "Delivery boy cnfOrder List",
                    "data": result.recordset
                });
            }
        });
    });

};

exports.del_orderlistprd = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'getorder_prd');
        request.input('del_id', db.NVarChar, req.body.del_id);
        request.execute('OrederList', (error, result) => {
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
                    "message": "Delivery boy  prdOrder List",
                    "data": result.recordset
                });
            }
        });
    });

};

exports.del_orderlistpck = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'getorder_pck');
        request.input('del_id', db.NVarChar, req.body.del_id);
        request.execute('OrederList', (error, result) => {
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
                    "message": "Delivery boy pck Order List",
                    "data": result.recordset
                });
            }
        });
    });

};

exports.del_orderlistdel = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'getorder_del');
        request.input('del_id', db.NVarChar, req.body.del_id);
        request.execute('OrederList', (error, result) => {
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
                    "message": "Delivery boy  delOrder List",
                    "data": result.recordset
                });
            }
        });
    });

};

exports.update_pck = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'updatestatus_pck');
        request.input('del_id', db.NVarChar, req.body.del_id);
        request.execute('OrederList', (error, result) => {
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
                    "message": "Delivery status updatepck",
                    "data": result.recordset
                });
            }
        });
    });

};

exports.update_del = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'updatestatus_del');
        request.input('del_id', db.NVarChar, req.body.del_id);
        request.execute('OrederList', (error, result) => {
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
                    "message": "Delivery status updatedel",
                    "data": result.recordset
                });
            }
        });
    });

};