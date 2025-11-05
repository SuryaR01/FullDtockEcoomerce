
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    userName : {type: String , required : true},
    userEmail : {type: String , required : true},
    userPassword : {type: String , required : true},
    userContact : {type: Number , required : false},
});

const Users = mongoose.model( "Users" , UsersSchema);

export default Users;