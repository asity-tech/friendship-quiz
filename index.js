const questions = [
    "favourite color",
    "favourite animal as pet",
    "favourite gadget",
    "favourite season",
    "favourite TV serial",
    "my most delicious food",
    "tea or coffee?"
];

const answers = [
    "0b",
    "1a",
    "2b",
    "3a",
    "4b",
    "5a",
    "6b",
];



//routing part

const express = require('express');
const app = express();
const path = require('path');
const port = 3000;


//all static work
app.use(express.static('public'))
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/scripts',express.static(__dirname + '/public/scripts'));
app.use('/img',express.static(__dirname + '/public/img'));


//ejs and REST part
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//url handler

app.get('', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login',(req,res)=>{
    const {username, male, female} = req.body;
    console.log(req.body);
    res.render('play', {questions,answers, username, male, female});
})

app.get('/play', (req, res) => {
    res.render('play', {questions,answers});
});

app.post('/play',(req,res)=>{
    const {score} = req.body;
    res.render('scoreDisp',{score});
})






app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
