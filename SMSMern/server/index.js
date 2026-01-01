
// import express from "express"
// import cors from "cors"
// import path from "path"
// import { fileURLToPath } from "url"
// import connectToDatabase from "./db/db.js"
// import authRoutes from "./routes/auth.js"
// import dotenv from "dotenv"
// import studentRoutes from "./routes/studentRoutes.js";
// import teacherRoutes from "./routes/teacherRoutes.js";
// import classesRoute from "./routes/classes.js";
// import assignmentRoutes from "./routes/assignmentRoutes.js";
// import adminSettingsRoutes from "./routes/adminSettings.js";
// import attendanceRoutes from "./routes/attendanceRoutes.js";
// import leaveRoutes from "./routes/leaveRoutes.js";
// import gradeRoutes from "./routes/gradeRoutes.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config()

// const app = express()


// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }))

// app.use(express.json())

// // Serve static files from uploads directory
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// connectToDatabase()

// app.use("/api/auth", authRoutes)
// app.use("/api/students", studentRoutes);
// app.use("/api/teachers", teacherRoutes);
// app.use("/api/classes", classesRoute);
// app.use("/api/assignments", assignmentRoutes);
// app.use("/api/admin/settings", adminSettingsRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/leaves", leaveRoutes);
// app.use("/api/grades", gradeRoutes);


// app.listen(process.env.PORT, () => {
//     console.log("Server running on port", process.env.PORT)
// })







import express from "express"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import connectToDatabase from "./db/db.js"
import authRoutes from "./routes/auth.js"
import dotenv from "dotenv"
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import classesRoute from "./routes/classes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js";
import adminSettingsRoutes from "./routes/adminSettings.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import gradeRoutes from "./routes/gradeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const app = express()

// UPDATED CORS: Added support for both local and production URLs
const allowedOrigins = [
    "http://localhost:5173", 
    "http://localhost:3000",
    "https://your-frontend-project.vercel.app" // REPLACE with your actual Vercel URL
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('CORS Policy Error'), false);
        }
        return callback(null, true);
    },
    credentials: true
}))

app.use(express.json())

// Serve static files (Note: Vercel is read-only; new uploads won't persist)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to Database
connectToDatabase()

// API Routes
app.use("/api/auth", authRoutes)
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/classes", classesRoute);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/admin/settings", adminSettingsRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/grades", gradeRoutes);

// Root route for testing if backend is alive
app.get("/", (req, res) => res.send("Smart Curriculum API is running..."));

// Only run app.listen locally. Vercel will use the exported app.
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

// CRITICAL FOR VERCEL:
export default app;