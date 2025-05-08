require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const stockRouter = require("./routes/stockRoutes");
const transactionRouter = require("./routes/transactionRoutes");
const leaderboardRouter = require("./routes/leaderboardRoutes");
const authRouter = require("./routes/authRoutes");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user",userRouter); 
app.use("/api/auth", authRouter);
app.use("/api/stock", stockRouter);
app.use("/api/transaction", transactionRouter);
app.use("/api/leaderboard", leaderboardRouter);

app.use(errorHandler);
const PORT = process.env.PORT ;

const IntializeApp = () => 
{
    try {
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    } catch (error) {
        console.error("Error initializing app:", error);
    }
}

IntializeApp();