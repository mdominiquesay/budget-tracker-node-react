
const i18n = require('i18n');
const dotenv = require('dotenv');
// Load environment variables from .env file
dotenv.config();
const { db, connectToDB } = require('./connect.js');
const express = require('express');
const app = express();
const cors = require('cors');
const budgetController = require('./controllers/budgetController.js');
const budgetMasterController = require('./controllers/budgetMasterController.js');
const categoryController = require('./controllers/categoryController');
// Configure i18n
i18n.configure({
    locales: ['en', 'fr'],
    directory: __dirname + '/locales'
});
// Middleware to set locale
app.use((req, res, next) => {
    // Set the locale based on user preferences, browser settings, or any other criteria
    const locale = 'en';
    i18n.setLocale(locale);
    console.log(__dirname);
    next();
});
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/budgetMaster', budgetMasterController.getAll);
app.post('/budgetMaster', budgetMasterController.create);
app.get('/budgetMasterDelete', budgetMasterController.deleteRecord);
app.post('/budgetMasterDelete', budgetMasterController.deleteSelectedRecord);



app.get('/budget/:recordId', budgetController.getAll);
app.post('/budget/:recordId', budgetController.create);
app.get('/budgetDelete/:recordId', budgetController.delete);
app.post('/budgetUpdate/:recordId', budgetController.update);
app.post('/budgetUpdateAll/:recordId', budgetController.updateAll);


app.get('/category', categoryController.getAll);
app.post('/category', categoryController.create);
app.get('/categoryDelete/:id', categoryController.delete);
app.post('/categoryDelete', categoryController.deleteMany);
//app.post('/categoryUpdate', categoryController.update);


connectToDB(() => {
    app.listen(process.env.DB_PORT, () => {
        console.log('Server is listening at port 3001');
    });
});
