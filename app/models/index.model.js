const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./users.model");
db.role = ["husler", "invester", "coworker"];
db.verifiedUser=require("./verifiedUser.model")
module.exports=db