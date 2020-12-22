exports.CouponType = (req, res) => {
    db.close();
    db.connect(conn, () => {
        var request = new db.Request();
        request.input('ActionType', db.NVarChar, 'GetCoupon');
        request.input('Couponid', db.NVarChar, req.body.Couponid);
        request.execute('Coupon', (error, result) => {
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
                    "message": "Coupon List",
                    "data": result.recordset
                });
            }
        });
    });

};
