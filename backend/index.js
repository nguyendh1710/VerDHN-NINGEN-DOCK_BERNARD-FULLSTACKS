// ✅ Nạp biến môi trường từ .env
require("dotenv").config();

// ✅ Import các thư viện
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");

// ✅ Khởi tạo server
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Đặt middleware CORS trước tất cả middleware khác
app.use(
  cors({
    origin: "https://ver-dhn-ningen-dock-bernard-fullstacks-1do4.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true, // Cho phép gửi cookies (nếu cần)
  })
);

// ✅ Middleware xử lý JSON
app.use(express.json());

// ✅ Middleware custom để sửa lỗi CORS trên Vercel
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ver-dhn-ningen-dock-bernard-fullstacks-1do4.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// --------------- Kết nối MongoDB ---------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "CUSTOMER_LIST",
  })
  .then(() => console.log("✅ MongoDB đã kết nối"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Định nghĩa Schema
const InformationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  tel: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

const Information = mongoose.model("Information", InformationSchema, "informations");

// --------------- Các Route API ---------------

// ✅ Route API lấy danh sách khách hàng
app.get("/api/informations", async (req, res) => {
  try {
    const data = await Information.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Route API thêm khách hàng
app.post("/api/informations", async (req, res) => {
  let { name, email, tel } = req.body;
  
  if (!name || !email || !tel) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
  }

  try {
    email = email.trim().toLowerCase();
    tel = tel.trim();

    const newCustomer = new Information({ name, email, tel, createdAt: new Date() });
    await newCustomer.save();

    res.status(201).json({ message: "Thêm khách hàng thành công", customer: newCustomer });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email hoặc số điện thoại đã tồn tại" });
    }
    res.status(500).json({ message: "Lỗi server", error });
  }
});

// ✅ Route kiểm tra kết nối MongoDB
app.get("/api/test-mongo", async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({ success: isConnected, message: isConnected ? "MongoDB Connected" : "MongoDB Not Connected" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Route kiểm tra Backend đang chạy
app.get("/", (req, res) => {
  res.send("✅ Backend đang hoạt động tốt!!");
});

// ✅ Khởi động server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
