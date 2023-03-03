const express = require("express")
const path = require("path")
const app = express()
// const hbs = require("hbs")
const account = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})

app.post('/signup', async (req, res) => {
    
    const newAccount = new account({
        username: req.body.name,
        password: req.body.password,
      });
        if(req.body.password)
      account.findOne({ username: req.body.name})
      .then(user => {
        
        if (user) {
            console.log("User details already exists")
            //res.send("Đăng ký thất bại -- Tài khoản đã tồn tại")
            res.render("signup",{error:"Tài khoản đã tồn tại"})
        } else if (req.body.password!=req.body.retypepw){
            console.log("Password does not match")
            //res.send("Đăng ký thất bại -- Mật khẩu không trùng khớp")
            res.render("signup",{error:"Mật khẩu không trùng Khớp"})
        } 
        else {
            newAccount.save()
            res.render("signup",{error:"Đăng ký thành công"})
        }
      })
      .catch(err => console.error('Lỗi khi kiểm tra đăng ký:', err));
})


app.post('/login', async (req, res) => {

    const newAccount = new account({
        username: req.body.name,
        password: req.body.password,
      });

      account.findOne({ username: req.body.name, password: req.body.password})
      .then(user => {
        if (user) {
            res.redirect(301,"https://cinestar.com.vn/")
        } else {
            console.log("Wrong login")
            res.send("Đăng nhập thất bại - Tài khoản và mật khẩu không đúng")
        }
      })
      .catch(err => console.error('Lỗi khi kiểm tra đăng nhập:', err));
})


app.listen(port, () => {
    console.log('port connected');
})