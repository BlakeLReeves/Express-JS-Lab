const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');

let app = express();

let formSubmit = path.join(__dirname, '../formSubmissions.json');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log(req.originalUrl)
    next();
});

app.post('/formsubmissions', (req, res, next) => {
    console.log(req.body.name);
    console.log(req.body.email);

    fs.readFile(formSubmit, (err, data) => {
        if (err) console.log(err);

        let parsedData = JSON.parse(data);
        let formData = {
            name: req.body.name,
            email: req.body.email
        };

        parsedData.push(formData);
        fs.writeFile(formSubmit, JSON.stringify(parsedData, null, 2), (err) => {
            if (err) console.log(err);
        });
        res.send('Thank you for submitting your contact form.');
    });
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});