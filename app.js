//carregando modulos
    const express = require("express")
    const handlebars = require("express-handlebars")
    const bodyParser = require("body-parser")
    const app = express()
    const admin = require("./routes/admin")
    const path = require("path")
    const mongoose = require("mongoose")
    const session = require("express-session")
    const flash = require("connect-flash")

//configurações
    //sessao
    app.use(session({
        secret: 'teste',
        resave:true,
        saveUninitialized: true
    }))
    app.use(flash())

    //middleware autenticacao mensagens
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })

    //body parser
        app.use(bodyParser.urlencoded({extended:true}))
        app.use(bodyParser.json())

    //Handlebars
        app.engine("handlebars", handlebars({defaultLayout: "main"}))
        app.set("view engine" , "handlebars")

    //mongoose
        mongoose.Promise = global.Promise
        mongoose.connect("mongodb://localhost/estagio").then(() => {
            console.log("conectado ao mongo...")
        }).catch((erro) => {
            console.log("erro ao se conectar: "+erro)
        })

    //public
        app.use(express.static(path.join(__dirname, "public")))

        

//rotas
    app.use("/admin", admin)


//outros
const PORT = 8081
app.listen(PORT, () => {
    console.log("servidor iniciado...")
})