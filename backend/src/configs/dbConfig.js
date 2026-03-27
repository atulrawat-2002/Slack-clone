import mongoose from "mongoose";

import { DEV_DB_URL } from "./serverConfigs.js";


export async function connectDB() {

    try {
        
        // if (NODE_ENV === 'development') {

            await mongoose.connect(DEV_DB_URL)

        // } else if(NODE_ENV === 'production') {

        //     await mongoose.connect(PROD_DB_URL)

        // }
        // console.log(`Connected to database from ${NODE_ENV} environment`)
        console.log(`Connected to database `)

    } catch (error) {
        throw error;
    }

}