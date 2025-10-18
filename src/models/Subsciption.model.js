import mongoose from "mongoose"

const subsciptionSchema = new mongoose.Schema({
    subcriber:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    channel:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})

const Subsciption = mongoose.model("Scribtion",subsciptionSchema);
export default Subsciption