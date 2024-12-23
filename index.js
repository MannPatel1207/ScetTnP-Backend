const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const staticRouter = require("./routes/staticRoute.js");
const offer = require("./routes/offer.js");
const user = require("./routes/user.js");
const auth = require("./routes/auth.js");
const company = require("./routes/company.js");
const notification = require("./routes/notification.js");
const message = require('./controllers/sendMessage.js')
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js");
const cors = require("cors");
const dotEnv = require("dotenv");
const Company = require("./schema/model/companySchema.js");
const report = require("./routes/report.js");


dotEnv.config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

// Middleware
app.use(cors({
    origin: ['https://scettnp-frontend.onrender.com','http://localhost:3000'], // Specify your frontend origin
    credentials: true // Allow cookies to be sent with requests
}));


// Connect to the database
async function main() {
    await mongoose.connect(DB_URL);
}
main().then(() => console.log("Database connected")).catch(err => console.log(`Error in connecting to database: ${err}`));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));

// Routers
app.use("/", staticRouter);
app.use("/offers", offer);
app.use("/user", user);
app.use("/auth", auth);
app.use("/company", company);
app.use("/notification",notification);
app.use("/message",message);
app.use("/report" , report);
// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500 ).json({ message: err.message || "server error"});
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
