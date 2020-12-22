exports.del_login = (req, res) => {
    var fs = require('fs');
    var stream = fs.createWriteStream("my_file.txt");
    stream.once('open', function(fd) {
    stream.write("My first row\n");
    stream.write("My second row\n");
    stream.end();
});
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();

        request.input('ActionType', db.NVarChar, 'Getlogin');
        request.input('username', db.NVarChar, req.body.username);
        request.input('password', db.NVarChar, req.body.password);
        request.execute('tbldeliveryboyLogin', (error, result) => {
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
                    "message": "Delivery Bot List",
                    "data": result.recordset
                });
            }
        });
    });

};
