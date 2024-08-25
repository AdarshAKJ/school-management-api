import express from "express";
import schoolRoutes from "./src/routes/school.js";
import cookieParser from "cookie-parser";

const app = express();

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})

app.use(express.json());

const health = async (req, res) => {
    try {
        res.json({
            message: "We are ready to serve the charger API's",
        });
    } catch (error) {
        console.log(error);
    }
};

app.get("/", health);
app.use('/api', schoolRoutes);

app.listen(8800, () => {
    console.log("Server is running on port 8800")
})