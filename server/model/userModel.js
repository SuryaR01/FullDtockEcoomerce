

import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    uaerName : {type: String , required : true},
    uaerEmail : {type: String , required : true},
    uaerPassword : {type: String , required : true},
    uaerContact : {type: Number , required : false},
});

const Users = mongoose.model( "Users" , UsersSchema);

export default Users;