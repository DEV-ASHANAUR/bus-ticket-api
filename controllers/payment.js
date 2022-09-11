import Reserve from '../models/Reserve.js';
import Seat from "../models/Seat.js";
import SSLCommerzPayment from 'sslcommerz';
import { v4 as uuidv4 } from 'uuid';
import { createError } from '../error.js';


export const initpayment = async(req,res,next)=>{
    const {PayInfo} = req.body;
    const data = {
        total_amount: PayInfo.totalPrice,
        pay_info:PayInfo,
        currency: 'BDT',
        tran_id: uuidv4(),
        success_url: 'https://ticket-api.onrender.com/api/payment/success',
        fail_url: 'https://ticket-api.onrender.com/api/payment/fail',
        cancel_url: 'https://ticket-api.onrender.com/api/payment/cancel',
        ipn_url: 'http://yoursite.com/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
    const reserve = new Reserve({...data.pay_info,txtId:data.tran_id});
    // console.log("first",reserve)
    await reserve.save();
    // console.log(data.pay_info);
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID, process.env.SSL_SECRET,false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        // console.log(data)
        if(data.GatewayPageURL){
            res.json(data.GatewayPageURL);
        }else{
            next(createError(400,"Payment Session Failed"));
        }
    });
}

export const successPayment = async(req,res,next)=>{
    const reserve = await Reserve.findOne({txtId:req.body.tran_id});
    
    if(reserve){
        try {
            await Promise.all(
                reserve.selectedSeatId.map(async (seatId) =>{
                    await Seat.updateOne(
                        {"seatNumbers._id":seatId},
                        {
                            $push:{
                                "seatNumbers.$.unavailableDates":reserve.dateOfTravel
                            },
                        }
                    );
                })
            )
            await Reserve.findByIdAndUpdate(reserve._id,{$set:{status:"success",valId:req.body.val_id,payType:req.body.card_issuer}});
            res.status(200).redirect(`https://preeminent-tulumba-1b0a47.netlify.app/invoice/${reserve._id}`);
        } catch (error) {
            next(error)
        }
    }
}

export const failPayment = async(req,res,next)=>{
    const reserve = await Reserve.findOne({txtId:req.body.tran_id});
    if(reserve){
        try {
            await Reserve.findByIdAndDelete(reserve._id);
            res.status(200).redirect(`https://preeminent-tulumba-1b0a47.netlify.app/`);
        } catch (error) {
            next(error)
        }
    }else{
        res.status(200).redirect(`https://preeminent-tulumba-1b0a47.netlify.app/`);
    }
}

export const cancelPayment = async(req,res,next)=>{
    const reserve = await Reserve.findOne({txtId:req.body.tran_id});
    if(reserve){
        try {
            await Reserve.findByIdAndDelete(reserve._id);
            res.status(200).redirect(`https://preeminent-tulumba-1b0a47.netlify.app/`);
        } catch (error) {
            next(error)
        }
    }else{
        res.status(200).redirect(`https://preeminent-tulumba-1b0a47.netlify.app/`);
    }
}