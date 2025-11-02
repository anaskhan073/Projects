import cron from "node-cron"
import { User } from '../models/user.model.js'

export const removeUnverifiedAccounts = ()=>{
    cron.schedule("*/30 * * * *", async()=>{
        const thirtyMinuteAgo = new Date(Date.now()-30 * 60 * 1000);
        const deleteaccount = await User.deleteMany({
            accountVerified: false,
            createdAt: {$lt: thirtyMinuteAgo}
        });
        console.log("deleteaccount",deleteaccount)
    });
};