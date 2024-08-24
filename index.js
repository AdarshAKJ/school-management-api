import express from "express";
const app = express();
import authRoutes from "./src/routes/auth.js";
import taskRoutes from "./src/routes/task.js";
import cookieParser from "cookie-parser";

//middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
// app.use(
//     cors({
//         origin: "http://localhost:3000",
//     })
// );
app.use(cookieParser());


app.use('/api/user', authRoutes);
app.use('/api/task', taskRoutes);

app.listen(8800, () => {
    console.log("Api working!")
})