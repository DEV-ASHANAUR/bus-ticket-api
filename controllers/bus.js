import Bus from '../models/Bus.js';
import Seat from '../models/Seat.js';

export const create = async(req,res,next)=>{
    try {
        const bus = new Bus(req.body);
        const saveBus = await bus.save();
        res.status(200).json(saveBus);

    } catch (error) {
        next(error);
    }
}

export const update = async(req,res,next)=>{
    try {
        const updateBus = await Bus.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updateBus);
    } catch (error) {
        next(error);
    }
}

export const deleteBus = async(req,res,next)=>{
    try {
        await Bus.findByIdAndDelete(req.params.id);
        res.status(200).json("Bus deleted Successfully!");
    } catch (error) {
        next(error);
    }
}

export const getBus = async(req,res,next)=>{
    try {
        const bus = await Bus.findById(req.params.id);
        res.status(200).json(bus);
    } catch (error) {
        next(error);
    }
}

export const getBuss = async(req,res,next)=>{

    const {starting_point,ending_point,...others} = req.query;
    // const types = type?.split(",") || ["Ac","Non-Ac"];
    
    try {
        // const buss = await Bus.find({...others,bus_type:{$in:types},price:{$gte: min || 1,$lte:max || 999}}).limit(req.query.limit);
        const buss = await Bus.find({starting_point,ending_point});
        // const buss = await Bus.find({starting_point:{$regex: starting_point, $options: "i"},ending_point:{$regex: ending_point, $options: "i"}});
        let operator = await Bus.distinct('operator',{starting_point,ending_point});
        // let operator = await Bus.distinct('operator',{starting_point:{$regex: starting_point, $options: "i"},ending_point:{$regex: ending_point, $options: "i"}});
        operator = await operator.map(name => ({name}));
        operator = await operator.map(obj => ({ ...obj, checked: false }));
        res.status(200).json({buss,operator});
    } catch (error) {
        next(error);
    }
}

export const getBusSeats = async(req,res,next)=>{
    try {
        const bus = await Bus.findById(req.params.id);
        const list = await Promise.all(
            bus.seats.map((seat)=>{
                return Seat.findById(seat);
            })
        );
        res.status(200).json(list);
    } catch (error) {
        next(error);
    }
}