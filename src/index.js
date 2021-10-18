const express = require('express');
const app = express();
require('./db/connect');
const path = require('path');
const port = process.env.PORT || 3001;



const User = require('./models/user');
const Quiz = require('./models/quiz');

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, '../templates/views'));
app.set('view engine', 'ejs');



app.get('/', (req, res) => {
    res.render('index');
});

app.post('/', async (req,res)=>{
    const {username, pin} = req.body;
    const {_id} = await User.findOne({username, pin});
    // console.log(_id.valueOf());
    if(_id == null){
        res.send('sorry account does not exist create a new?');
    }
    else {
       
        // res.send(`found user id is ${_id.valueOf()}`);
        res.redirect(`/profile/${_id.valueOf()}`);
    }
})

app.get('/newusr', (req, res) => {
    res.render('profile/newusr');
});

app.post('/new', async (req, res) => {
    const { username, pin } = req.body;
    
    const newUser = new User(req.body);
    await newUser.save();

    console.log(newUser);
    // res.send('new user created');
    res.redirect(`/profile/${newUser._id}`);
});

app.get('/profile/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    console.log("found " + user);
    // res.send('the profile opened successfully');
    res.render('profile/show', { user });
});

app.get('/quiz/:id/new_quiz', async (req,res)=>{
    const { id } = req.params;
    const userQues = await User.findById(id);
    const quesSet = await Quiz.find();
    console.log(userQues.questions.find(e => e ===3));
    res.render('quiz/new_quiz', {id, userQues : userQues.questions, quesSet});
})


app.post('/quiz/:id/new_quiz', async (req,res)=>{
    const { id } = req.params;
    const {question,o1,o2,o3,o4,correctAns} = req.body;

    const newQuiz = new Quiz({
        "question" : question,
        "options" : [o1,o2,o3,o4],
        "correctAns" : correctAns
    })

    await newQuiz.save();
    console.log(question);
    console.log(correctAns);

    console.log(newQuiz);
    // res.send(`congrats, quiz generated link = http://localhost:3000/quiz/${id}/play`);
    res.render('share',{url:  `http://localhost:3000/quiz/${id}/play`});
})




app.get('/quiz/:id/play', async (req,res)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    const quesSet = await Quiz.find();
    console.log(quesSet.at(1));
    res.render('quiz/play_quiz', {user, quesSet});
})


// broken score mechanism
app.post('/quiz/:id/score', async (req,res)=>{
    const {options} = req.body;
    console.log(options);
    const quesSet = await Quiz.find();
    let score = 0;
    const totalQues = quesSet.length;
    for(let i = 0; i < totalQues; i++){
        console.log(`${options[i]}   ${quesSet.at(i).correctAns}`  );
        console.log();
        if(options[i] == quesSet.at(i).correctAns)
            score++;
    }
    console.log("score is " + score);
    res.render('quiz/score', {score, totalQues})
})



app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
