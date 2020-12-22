var express = require('express')
var http = require('http');
var path = require('path');
var app = express();
var bodyParser=require("body-parser");
var multer = require('multer');
var user = require('./routes/user');
var restaurant = require('./routes/restaurant');
var product = require('./routes/product');
var cart = require('./routes/cart');
var address  = require('./routes/address')
var payment = require('./routes/payment')
var crypto = require('crypto');
const DIR = './uploads';
const DIR1 = './documents';
var Coupon = require('./routes/Coupon');
var LatLong = require('./routes/LatLong');
var Social_login = require('./routes/Social_login');
var delboy_login = require('./routes/del_login');
var Del_orderlist = require('./routes/Del_orderlist');
var Offerlist = require('./routes/Offerlist');




let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
});
  
let storage1 = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, DIR1);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname );
  }
});
  
  let upload = multer({storage: storage}); 
  let upload1 = multer({storage: storage1});

var mssql    = require('mssql');
const { request } = require('express');
var connection = {
    server: 'sql5097.site4now.net',
    user:  'DB_A3CE37_helloburger_admin',
    password: 'Qazwsxedc123456', 
    database : 'DB_A6825B_akshay123456',
    options: {  
        enableArithAbort: false
      }
};


mssql.connect(connection,function(err,result) {
if(err)
console.log(err);
else
console.log("result");
});
// global.Fcm = FCM;
global.db = mssql;
global.conn = connection;  


app.set('hostname', process.env.Host );
app.set('port', process.env.PORT || 4500);
app.set('views', __dirname + '/views');
app.use('/Image/resources',express.static(__dirname + '/uploads'));
app.use('/Doc/resources',express.static(__dirname + '/documents'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port '+ app.get('port'));
});

var router = express.Router();
app.get('/', function (req, res) {
    res.send('this is the main Page');
});

app.use('/api', router);
router.get('', function(req, res) {
  res.send("This is testing api urls");
});

router.post('/User/userSignup',user.userSignup);
router.post('/User/userLogin',user.login); 
router.post('/User/userValidate',user.reg_otp); 
router.post('/User/getotpForget',user.getotpForget);
router.post('User/UpdateUser',user.updateUser); 
router.post('/User/validateForgot',user.validateForgot); 
router.post('/User/ResendOTP',user.ResendOTP); 
router.post('/Restaurant/getRestaurant',restaurant.getRestaurant); 
router.post('/Product/getAllProduct',product.getAllProduct); 
router.post('/Product/getAllResProduct',product.getAllResProduct);
router.post('/Cart/AddCart', cart.addCart);
router.post('/Cart/GetCart', cart.getCart);


router.post('/Address/AddAddress', address.saveAddress);
router.post('/Address/GetAddres', address.GetAddress);
router.post('/CheckOut/MakeOrder', payment.checkOut);
router.post('/Cart/ClearCart',cart.clearCart);
router.post('/Order/OrderHistory',cart.orderHistory);
router.post('/Delete/deleteAddress',address.deleteAddress);
router.post('/Payment/Select',payment.selectPaytm);
router.post('/Payment/UpdateTxn',payment.updatetransactionId);

router.post('/Coupon/CouponType',Coupon.CouponType);

router.post('/LatLong/getLatLong',LatLong.getLatLong);
router.post('/LatLong/UDLatLong',LatLong.UDLatLong);

router.post('/Social_login/Google_login',Social_login.Google_login);
router.post('/FaceBook_login/FaceBook_login',Social_login.FaceBook_login);

router.post('/delboy_login/del_login',delboy_login.del_login);
router.post('/Del_orderlist/del_orderlistcnf',Del_orderlist.del_orderlistcnf);
router.post('/Del_orderlist/del_orderlistprd',Del_orderlist.del_orderlistprd);
router.post('/Del_orderlist/del_orderlistpck',Del_orderlist.del_orderlistpck);
router.post('/Del_orderlist/del_orderlistdel',Del_orderlist.del_orderlistdel);
router.post('/Del_orderlist/update_pck',Del_orderlist.update_pck);
router.post('/Del_orderlist/update_del',Del_orderlist.update_del);
router.post('/Offerlist/getOfferList',Offerlist.getOfferList);

router.post('/Offerlist/free_delivery',Offerlist.free_delivery);

  router.post('/Payment/getHash',(req,res)=>{
  var key = req.body.key
 //var merchantId = req.merchantId;
  var txnid = req.body.txnid
  var amount = req.body.amount
 // var surl = req.surl
 // var furl = req.furl
  var productInfo = req.body.productInfo
  var email = req.body.email
  var firstName = req.body.firstName
 //var phone = req.phone
  var salt = '5bgIeeC5rj'
  
  var cryp = crypto.createHash('sha512');
  var text = key+'|'+txnid+'|'+amount+'|'+productInfo+'|'+firstName+'|'+email+'|||||||||||'+salt;
  cryp.update(text);
  var hash = cryp.digest('hex');
  res.send({
    "status": "1",
    "message": "Hash",
    "hash": hash
  })
});


router.post('/History/GetHistory',(req,res)=>{
  db.close();
  db.connect(conn,()=>{
      var request = new db.Request();
      request.query('select * from orderTable as ot  left join  cart as ct on ot.orderid = ct.orderid   left join restaurantlist as rs on ct.restaurantId = rs.resId where userId = 1 and  ot.orderid is not null '+'FOR JSON PATH',(error,result)=>{
        console.log(error)  
        if(error)
          {
              res.send({
                  "status":"0",
                  "message":"Error Occured",
                  "data":[]
              })
          }
          else{
              console.log(result)
              if(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'] == 0)
              {
                  res.send({
                      "status":"0",
                      "message":"no product",
                      "data":[]
                  })
              }
              else{
                  res.send({
                      "status":"1",
                      "message":"Product List",
                      "data":Object.values(JSON.parse(result.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B'])),
                  })
              }
          }
      });
  })
});



