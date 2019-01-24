const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const ideas = require('./routes/ideas');
const users = require('./routes/users');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/vidjot-dev', {
    useNewUrlParser: true
})
    .then(() => console.log('MongoDB Connected.../'))
    .catch(err => console.log(err));

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}));

app.use(flash());

app.use(function(req,res,next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('success');
    next();
});

app.get('/', (req, res) => {
    const wel = 'Welcome';
    res.render('home', {
        wel: wel
    });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.use('/ideas', ideas);

app.use('/users', users);

const port = 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});