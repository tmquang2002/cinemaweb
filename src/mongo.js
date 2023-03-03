const mongoose = require('mongoose');

// Kết nối đến MongoDB bằng Mongoose
mongoose.connect('mongodb+srv://20120559:20120559@cluster0.banxgu8.mongodb.net/Login', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Đã kết nối đến cơ sở dữ liệu'))
  .catch(err => console.error('Lỗi kết nối đến cơ sở dữ liệu:', err));

// Định nghĩa schema cho collection "account"
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Tạo model cho collection "account"
const account = mongoose.model('account', userSchema);
module.exports=account


