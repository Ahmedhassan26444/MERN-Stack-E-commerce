import mongoose, { Document } from "mongoose";
import validator from "validator";

interface IUser extends Document<string>{
    _id: string;
    name: string;
    photo: string;
    email: string;
    role:  "admin"| "user";
    gender: "male"|"female";
    dob: Date;
    updatedAt: Date;
    createdAt: Date;
    age:number;
}

const schema = new mongoose.Schema(
{
    _id:{
        type : String,
        required: [true ,"Please Enter ID"],
    }, 
    name:{
        type : String,
        required: [true ,"Please Add Name"],
    },
     email:{
        type : String,
        unique: true,
        required:[true , "Please enter Email"],
        validate: validator.default.isEmail, 
    },
     photo: {
      type: String,
      required: [true, "Please add photo"],
    },
     role:{
        type : String,
        enum: ["admin","user"],
        default: "user",
    },
     gender:{
        type : String,
        enum: ["male","female"],
        required: [true , "Please enter Gender"],
    },
     dob:{
        type : Date,
        required: [true ,"Please enter Date of birth"],
    },
},
{
timestamps: true,
}
);

schema.virtual("age").get(function(){
    const today = new Date();
    const dob = this.dob;
    let age = today.getFullYear() - dob.getFullYear();

    if(today.getMonth() < dob.getMonth( ) ||
     today.getMonth() === dob.getMonth( ) &&
    today.getDate() < dob.getDate())
{
    age--;
}
return age;
});
export const User = mongoose.model<IUser>("User", schema);