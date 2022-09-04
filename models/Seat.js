import mongoose from 'mongoose';
const SeatSchema = new mongoose.Schema({
    title: {
        type:String,
    },
    seatNumbers: [{number:String,unavailableDates:{type:[Date]}}],
},{timestamps:true});

export default mongoose.model("Seat",SeatSchema);