const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;
db.user = require("./users.model");
db.ROLES = ["husler", "invester", "coworker"];
module.exports=db