/*----------Fabricating variables to assign to js packages--------*/
const express = require('express');
const morgan = require('morgan');
const {Prohairesis} = require('prohairesis');
const bodyParser = require('body-parser');
const path = require('path')
const mysql = require('mysql');
const { prototype } = require('events');

const app = express();
const port = process.env.port ||5500;

/*connecting to postgresql domain*/
const mysqlString = "mysql://b6538bf731f61d:21f1ee93@eu-cdbr-west-03.cleardb.net/heroku_9f041e6b558711e?reconnect=true"
const database = new Prohairesis(mysqlString)



app
    .use(morgan('dev'))
    .use(express.static('public'))
   
    .use(bodyParser.urlencoded({extended: false}))
    .use(bodyParser.json())

    .post('/api/user', async (req,res)=>{
        const body = req.body;
        await database.execute(`
        INSERT INTO slumber_ui(
            Name,
            CDate, 
            comments)
            VALUES(
                @Name,
                NOW(),
                @comments
            )
        `,{
            Name: body.Username,
            Date: body.CurrentDate,
            comments: body.DreamEntry,

        });

        res.end("Dream successfully addeed");

    
    })

    .listen(port, () => 
        console.log(`listening on port ${port}`));

    // obtained static css file 
    app.get('/code/css/Dream.css',(req,res) => {
        res.sendFile(path.join(__dirname, 'css', 'Dream.css'));
    });
    //obtained img file
    app.get('/code/imgs/dream.jpg',(req,res) => {
        res.sendFile(path.join(__dirname, 'imgs', 'dream.jpg'));
    });

