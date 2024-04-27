const express = require("express")
const app = express();
const cors = require("cors");
const router = require("./Router/router");
const { connecDB } = require("./Database/data")
connecDB();

app.use(cors({
            origin: "https://recipemealdb.netlify.app",
            credentials: true
}))
app.use(express.json())

app.use("/api", router)


app.listen(4000, () => {
            console.log("Server is running at port 4000")
})
