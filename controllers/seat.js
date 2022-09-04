import Seat from "../models/Seat.js";
import Bus from '../models/Bus.js'


export const create = async(req,res,next)=>{
    const busId = req.params.busId;
    const newSeat = new Seat(req.body);

    try {
        const savedSeat = await newSeat.save();
        try {
            await Bus.findByIdAndUpdate(busId,{$push:{seats:savedSeat._id}});
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedSeat);
    } catch (error) {
        next(error);
    }

}

export const updateSeatAvailability = async(req,res,next)=>{
    try {
        await Seat.updateOne(
            {"seatNumbers._id":req.params.id},
            {
                $push:{
                    "seatNumbers.$.unavailableDates":req.body.date
                },
            }
        );
        res.status(200).json("Seat has been updated");
    } catch (error) {
        next(error);
    }
}