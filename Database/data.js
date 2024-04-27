const mongoose = require("mongoose")


exports.connecDB = async () => {

            try {
                        await mongoose.connect("mongodb+srv://niteshbakhla007:xHxUVXD6UiMbw13R@cluster0.kf9697t.mongodb.net/")

                        console.log("Database is connected")
            } catch (error) {
                        console.log(error)
            }

}