import mongoose from "mongoose";
const ReserveSchema = new mongoose.Schema({
    pasenName: {
      type: String,
      required: true,
    },
    pasenMobile: {
      type: String,
      required: true,
    },
    pasenEmail: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    dateOfTravel: {
      type: String,
      required: true,
    },
    exactTime :{
      type: String,
      required: true,
    },
    invoice: {
      type: Array
    },
    bussId: {
      type: String,
      required: true,
    },
    operator: {
      type: String
    },
    valId: {
        type:String
    },
    payType:{
        type:String
    },
    address : {
      type:String
    },
    txtId:{
      type:String
    },
    status : {
      type:String
    },
    selectedSeatId : {
      type: Array
    }

  });
  
  export default mongoose.model("Reserve", ReserveSchema)