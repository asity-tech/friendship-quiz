const mongoose = require('mongoose');

const uri1 =' a mongodb atlas URI with any database name';

mongoose.connect(uri1, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('userDB OPEN!!!');
    })
    .catch((err) => {
        console.log('ERROR CONNECTING');
        console.log(err);
    });
    
    


