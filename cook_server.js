const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    fs = require('file-system'),
    shortId = require('shortid'),
    dbFilePath = 'dishes.json',
    dbWeeksPath = 'mealsPlan.json',
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/dishes', (req, res) => res.send(getDishesFromDB()));
app.get('/api/weeks', (req, res) => res.send(getWeeksFromDB()));

app.post('/api/dish', (req, res) => {
    const dishesData = getDishesFromDB(),
        dish = req.body;

    dish.id = shortId.generate();

    dishesData.push(dish);
    setDishesToDB(dishesData);

    res.send(dish);
});

app.post('/api/week', (req, res) => {
    const weeksData = getWeeksFromDB(),
        week = req.body;

    week.id = shortId.generate();

    weeksData.push(week);
    setWeeksToDB(req.body);

    res.send(week);
});

app.get('/api/dish/:id', (req, res) => {
    const dishesData = getDishesFromDB(),
        dish = dishesData.find(dish => dish.id === req.params.id);

    dish ? res.send(dish) : res.send({});
});

app.get('/api/week/:id', (req, res) => {
    const weeksData = getWeeksFromDB(),
        week = weeksData.find(week => week.id === req.params.id);

    week ? res.send(week) : res.send({});
});

app.put('/api/dish/:id', (req, res) => {
        const dishesData = getDishesFromDB(),
            dish = dishesData.find(dish => dish.id === req.params.id),
            updatedDish = req.body;

    dish.title = updatedDish.title;
    dish.category = updatedDish.category;
    dish.description = updatedDish.description;
    dish.amount = updatedDish.amount;
    dish.disabled = updatedDish.disabled;
    dish.selectedMeals = updatedDish.selectedMeals;

    setDishesToDB(dishesData);

    res.sendStatus(204);
});

    app.put('/api/week/:id', (req, res) => {
    const weeksData = getWeeksFromDB(),
        week = weeksData.find(week => week.id === req.params.id),
        updatedWeek = req.body;

    week.weekNumber = updatedWeek.weekNumber;
    week.weekDays = updatedWeek.weekDays;
    week.weekDays.name = updatedWeek.weekDays.name;
    week.weekDays.meals = updatedWeek.weekDays.meals;
    week.weekDays.meals.name = updatedWeek.weekDays.meals.name;


    setWeeksToDB(weeksData);

    res.sendStatus(204);
});

app.delete('/api/dish/:id', (req, res) => {
    let dishesData = getDishesFromDB();
    dishesData = dishesData.filter(dish => dish.id !== req.params.id);
    setDishesToDB(dishesData);
    res.sendStatus(204);
});

function getDishesFromDB() {
    return JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
}

function getWeeksFromDB() {
    return JSON.parse(fs.readFileSync(dbWeeksPath, 'utf8'));
}

function setDishesToDB(dishesData) {
    fs.writeFileSync(dbFilePath, JSON.stringify(dishesData).replaceAll(',', ',\n'));
}

function setWeeksToDB(weeksData) {
    fs.writeFileSync(dbWeeksPath, JSON.stringify(weeksData).replaceAll(',', ',\n'));
}

app.listen(3000, () => console.log('Server has been started...'));
