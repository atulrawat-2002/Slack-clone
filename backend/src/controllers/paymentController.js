import { CURRENCY, RECIEPT } from "../configs/serverConfigs.js";
import razorpayInstance from "../configs/razorpayConfig.js";
import { StatusCodes } from "http-status-codes";

export const createOrderController = async (req, res) => {
    try {
        
        const options = {
            amount: req.body.amount * 100,
            currency: CURRENCY,
        }

        const order = await razorpayInstance.orders.create(options);

        if(!order) {
            throw Error('Order createion failed')
        }

        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Order created successfully',
            data: order
        })

    } catch (error) {
        console.log('Error in createOrder controller', error);
    }
}