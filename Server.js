const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    // "http://localhost:3500",
    "https://dzidcom-front.vercel.app",
    "https://dashboard.dzidcom.skate.dz",
    "https://dashboard.dzidcom.skate.dz/",
    "https://dzidcom.skate.dz",
    "https://dzidcom.skate.dz/",
];
const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error(`Not allowed by CORS , origin : ${origin}`));
        }
    },
    optionsSuccessStatus: 200,
};
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
};
require("dotenv").config();

app.use(cookieParser());
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", express.static(path.join(__dirname, "/public/ProfilePics")));
app.use("/", express.static(path.join(__dirname, "/public/Work")));
app.use("/", express.static(path.join(__dirname, "/Public/Portfolio")));

app.get("/", (req, res) => {
    res.send("Hello from DzidCom");
});
app.use("/Logout", require("./Routes/Auth/Logout"));

app.use("/Admin", require("./Routes/Admin/Admin"));
app.use("/Admin_Login", require("./Routes/Auth/Admin/Admin_Login"));
app.use("/Add_Admin", require("./Routes/Auth/Admin/Admin_Add"));
// app.use("/Admin_Logout", require("./Routes/Auth/Admin/Admin_Logout"));
app.use("/Admin_CheckAuth", require("./Routes/Auth/Admin/Admin_CheckAuth"));



app.listen(3000);

module.exports = app;
