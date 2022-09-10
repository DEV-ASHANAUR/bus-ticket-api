import Reserve from '../models/Reserve.js'


export const reserve = async(req,res,next)=>{
    console.log(req.body);

    try {
        const reserve = new Reserve(req.body);
        const saveReserve = await reserve.save();
        res.status(200).json(saveReserve);
    } catch (error) {
        next(error);
    }
}

export const getAllReserve = async(req,res,next)=>{
    try {
        const allReserve = await Reserve.find();
        res.status(200).json(allReserve);
    } catch (error) {
        next(error)
    }
}

export const getReserve = async(req,res,next)=>{
    try {
        const data = await Reserve.findById(req.params.id);
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
}