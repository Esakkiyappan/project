const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mysql = require('mysql2')

const app = express()

app.use(cors())
app.use(bodyparser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'foody',
    port: 3306
})

db.connect(err => {
    if (err) {
        console.log(err)
    }
    else {
        console.log("connected successfully")
    }
})


app.post('/feedback', (req, res) => {
    console.log(req.body)
    let message = req.body.message;
    let email = req.body.email;

    let qr = `insert into feedback( feedback, email)values ('${message}','${email}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            res.send({
                message: "data inserted"
            })
        }
        else {
            res.send({
                message: "wrong"
            })
        }
    })

})



app.post('/veg', (req, res) => {
    console.log(req.body)

    let name = req.body.products;
    let prize = req.body.price;
    let offerprize = req.body.offerprice;
    let vegimage = req.body.vegimage;

    let qr = `insert into vegtableproducts(name,prize,offerprize,imgurl)values('${name}','${prize}','${offerprize}','${vegimage}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            res.send({
                message: "data inserted"
            })
        }
        else {
            res.send({
                message: "wrong"
            })
        }
    })

})

app.post('/fruit', (req, res) => {
    console.log(req.body)

    let name = req.body.products;
    let prize = req.body.prize;
    let offerprize = req.body.offerprize;
    let imgurl = req.body.fruitimage;

    let qr = `insert into fruitproducts(name,prize,offerprize,imgurl)values('${name}','${prize}','${offerprize}','${imgurl}')`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            res.send({
                message: "data inserted"
            })
        }
        else {
            res.send({
                message: "wrong"
            })
        }
    })

})


// getdata

app.get("/vegget", (req, res) => {

    console.log(req.body)
    let qr = `select * from vegtableproducts`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length > 0) {
            res.send({
                message: 'get data successfully',
                data: result

            })
        }
        else {
            res.send({
                message: "wrong"

            })
        }
    })
})

app.get("/fruitget", (req, res) => {

    console.log(req.body)
    let qr = `select * from fruitproducts`;
    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result.length > 0) {
            res.send({
                message: 'get data successfully',
                data: result

            })
        }
        else {
            res.send({
                message: "wrong"

            })
        }
    })
})


// userregisterurl


app.post('/userreg', (req, res) => {
    console.log(req.body)
    let fullname = req.body.fullname;
    let password = req.body.password;
    let statename = req.body.statename;
    let cityname = req.body.cityname;
    let email = req.body.email;
    let phonenumber = req.body.phonenumber;
    let zipcode = req.body.zipcode;

    let qr = `insert into userregister(fullname,password,statename,cityname,email,phonenumber,zipcode) values('${fullname}','${password}','${statename}','${cityname}','${email}','${phonenumber}','${zipcode}')`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            res.send({
                message: "data inserted"
            })
        }
        else {
            res.send({
                message: "wrong"
            })
        }
    })

})

// userloginurl

app.post('/userlog', (req, res) => {
    console.log(req.body)

    let email = req.body.email;
    let password = req.body.password;

    let qr = `select * from userregister where email = '${email}' and password = '${password}'`;

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        };
        if (result.length>0) {
            res.send({
                message: "sucessfully"
            })

        }
        else {
            res.send({
                message: "wrong"
            })
        }

    })
})

//addressurl

app.post('/address', (req, res) => {
    console.log(req.body)
    let firstname = req.body.firstname;
    let roadname = req.body.roadname;
    let statename = req.body.statename;
    let cityname = req.body.cityname;
    let lastname = req.body.lastname;
    let phonenumber = req.body.phonenumber;
    let zipcode = req.body.zipcode;
    let houseno=req.body.houseno;

    let qr = `insert into useraddress(firstname,lastname,state,city,roadname,phonenumber,zipcode,houseno) values('${firstname}','${lastname}','${statename}','${cityname}','${roadname}','${phonenumber}','${zipcode}','${houseno}')`

    db.query(qr, (err, result) => {
        if (err) {
            console.log(err)
        }
        if (result) {
            res.send({
                message: "data inserted"
            })
        }
        else {
            res.send({
                message: "wrong"
            })
        }
    })

})


const port = 3000

app.listen(port, () => {
    console.log(`example at http://localhost:${port}`)
})

