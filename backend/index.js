// ✅ Nạp biến môi trường từ .env
require("dotenv").config();

// ✅ /-------------------------Import các thư viện bằng require()
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");



//------------------------- Tạo các  middleware
// ✅ Middleware
// ✅ Cho phép tất cả domain (nếu muốn mở rộng API công khai)
// app.use(cors());

// ✅ Chỉ cho phép frontend từ Vercel gọi API (bảo mật hơn)
app.use(cors({
  origin: "https://ver-dhn-ningen-dock-bernard-fullstacks-1do4.vercel.app/",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
}));
app.use(express.json()); // Thay thế bodyParser.json()


//middleware giới hạn số lần gửi form => chống spam bot
const formLimiter = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email là bắt buộc" });
    }

    const recentSubmission = await Information.findOne({
      email,
      createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) }, // Kiểm tra trong 15 phút gần đây
    });

    if (recentSubmission) {
      return res.status(429).json({ message: "Bạn đã gửi quá nhiều lần! Vui lòng thử lại sau 15 phút." });
    }

    next(); // ✅ Phải gọi next() nếu hợp lệ
  } catch (error) {
    console.error("Lỗi kiểm tra spam:", error);
    res.status(500).json({ message: "Lỗi server khi kiểm tra spam" });
  }
};







// --------------- Kết nối vào MongoDB Atlas ---------------
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "CUSTOMER_LIST",
  })
  .then(() => console.log("✅ MongoDB đã kết nối"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));
  
// Định nghĩa Schema  cho collection trên Mongo Atlas---------------
const InformationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // ✅ Unique
  tel: { type: String, required: true, unique: true },   // ✅ Unique
  createdAt: { type: Date, default: Date.now },
});
// ✅ Đặt index trước khi tạo model
InformationSchema.index({ email: 1, tel: 1 }, { unique: true });

const Information = mongoose.model("Information", InformationSchema, "informations");
// ---------------Các Route API CRUD  ---------------


// ✅ Route API lấy danh sách khách hàng
app.get("/api/informations", async (req, res) => {
  try {
    const data = await Information.find(); // Truy vấn toàn bộ dữ liệu
    res.status(200).json(data); // Gửi dữ liệu về client
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Route API thêm khách hàng
app.post("/api/informations", formLimiter, async (req, res) => {
  let { name, email, tel } = req.body;
  
  if (!name || !email || !tel) {
    return res.status(400).json({ message: "Thiếu thông tin bắt buộc: name, email, tel" });
  }

  // Chuẩn hóa dữ liệu
  email = email.trim().toLowerCase();
  tel = tel.trim();

  try {
    console.log("🔍 Kiểm tra khách hàng với email:", email, "hoặc số điện thoại:", tel);

    const newCustomer = new Information({ name, email, tel, createdAt: new Date() }); // ✅ Cập nhật thời gian chính xác
    await newCustomer.save();

    console.log("✅ Đã lưu vào MongoDB:", newCustomer);
    res.status(201).json({ message: "Thêm khách hàng thành công", customer: newCustomer });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email hoặc số điện thoại đã tồn tại" });
    }
    res.status(500).json({ message: "Lỗi server", error });
  }
});



// ✅ --------------------Khởi động server---------------------------
// ✅ Khởi tạo server
const app = express();
const PORT = process.env.PORT || 5000; // Dùng PORT của Vercel hoặc 5000 khi chạy local
// chạy server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
//---------------- các mã kiểm tra--------------------------
// ✅ Kiểm tra biến môi trường đã load chưa
console.log("📧 Email:", process.env.EMAIL_SENDER);
console.log("🔑 Password:", process.env.EMAIL_PASSWORD ? "Loaded" : "Not Loaded");
// ✅ Route kiểm tra kết nối MongoDB
app.get("/api/test-mongo", async (req, res) => {
  try {
    const isConnected = mongoose.connection.readyState === 1;
    res.json({ success: isConnected, message: isConnected ? "MongoDB Connected" : "MongoDB Not Connected" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
// ✅ Thêm route `/api/health` để kiểm tra server
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "🚀 Server is running smoothly" });
});

// ✅ Route kiểm tra Backend đang chạy
app.get("/", (req, res) => {
  res.send("✅ Backend đang hoạt động tốt!!");
});
