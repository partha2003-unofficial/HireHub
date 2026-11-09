import mongoose from "mongoose";

export async function connectWithDatabase(url: string) {
    await mongoose.connect(url)
        .then(() => {
            console.log('database is connected successfully')
        })
        .catch((error) => { console.log('database is not connected , the error is ', error.message) })
}