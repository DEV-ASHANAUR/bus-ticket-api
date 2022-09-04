import mongoose from "mongoose";

const BusSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    operator: {
        type: String,
        required: true
    },
    bus_type: {
        type: String,
    },
    bus_model:{
        type:String
    },
    bus_route: {
        type: String,
    },
    starting_point: {
        type: String,
    },
    ending_point: {
        type: String,
    },
    seats:{
        type: [String],
    },
    price:{
        type:Number,
    },
    dep_time:{
        type:String,
    },
    arr_time:{
        type:String,
    },
    desc:{
        type:String
    },
},{timestamps:true});

export default mongoose.model("Bus",BusSchema);