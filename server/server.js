const express = require ('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

let formSubmit = path.join(__dirname, '../formSubmissions.json');

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next)=> {
    console.log(req.originalUrl)
    next();
});

app.post('/formsubmissions', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.email);

    let formData = [{
        name: req.body.name,
        email: req.body.email
    }];

    let formValue = JSON.stringify(formData, null, 2);
    
    fs.writeFile(formSubmit, formValue, (err) => {
        if(err) console.log(err);
    })

    let readData = fs.readFile('./formSubmissions.json', (err) => {
        if(err) console.log(err);
    })

    fs.writeFile(formSubmit, readData, (err) => {
        if(err) console.log(err);
    })

    res.send('Thank you for submitting your contact form.');
});

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});