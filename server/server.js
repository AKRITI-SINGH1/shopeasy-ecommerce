const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");

//create a database connection -> you can also 
// create a separate file for this and then import / use that file here 


mongoose
      .connect(
       "mongodb+srv://akritijune09:akritimern@cluster0.176gi.mongodb.net/eccomerce"
             )

.then(() => console.log("MongoDB connected"))
.catch((error) => console.log(error));


const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST" , "DELETE" , "PUT"],
        allowedHeaders : [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma"
        ],
        credentials: true,
    })
);

app.use(cookieParser());    
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin/products", adminProductsRouter);


app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));