var bodyParser = require("body-parser"),
methodOverride = require('method-override'),
expressSanitizer = require('express-sanitizer'),
mongoose       = require("mongoose"),
express        = require("express"),
app            = express();

//mongooose connection
mongoose.connect('mongodb://localhost:27017/movie_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(()=> console.log('connected to database...'))
.catch(err => console.log('Refuse to connect...', err));

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

//SCHEDULE schema
var scheduleSchema = new mongoose.Schema({
    id: String,
    cinema: Number,
    date: String,
    start: String,
    end: String,
    price: Number
});
//SCHEDULE model
var Schedule = mongoose.model("Schedule", scheduleSchema);

// MOVIE schema
var movieSchema = new mongoose.Schema({
    id: String,
    title: String,
    poster: String,
    synopsis: String,
    director: String,
    genre: [String],
    rating: Number,
    runtime: String,
    schedule: [scheduleSchema]
});
//MOVIE model
var Movie = mongoose.model("Movie", movieSchema);

//RESERVATION schema
var reservationSchema = new mongoose.Schema({
    id: String,
    movie: String,
    cinema: Number,
    time: String,
    date: String,
    payment: Number,
    numSeats: Number,
    seats: Array
});
//RESERVATION model
var Reservation = mongoose.model("Reservation", reservationSchema);

//RESTful Routes
app.get("/", function(req,res){
    res.redirect("/mrs");
});

//MOVIE ROUTE
app.get("/mrs", function(req,res){
    //get all the data from the movies db
    Movie.find({}, function(err, movies) {
        if(err){
            console.log("ERROR!");
        } else {
            //redirect to index page and load all data from movies db
            res.render("index", {movies: movies});
        }
    });
});

//RESERVATION ROUTE
app.get("/reservation", function(req,res){
    //get all data from reservations db
    Reservation.find({}, function(err, allreserve) {
        if(err){
            console.log("ERROR!");
        } else {
            //redirect to reservations page and load all data from reservations db
            res.render("reservation", {reserve: allreserve});
        }
    });
});

//SHOW SELECTED MOVIE ROUTE
app.get("/mrs/:id", function(req,res) {
    Movie.findById(req.params.id, function(err, foundMovie) {
        if(err){
            res.redirect("/mrs");
        } else {
            //get all the data of the selected movie
            Reservation.find({}, function(err, allreserve) {
                if(err){
                    console.log("ERROR!");
                } else {
                    //redirect to movieinfo page with the data of the selected movie
                    res.render("movieinfo", {movie: foundMovie, reserve: allreserve});
                }
            });
            
        }
    });
});

//SEAT SELECTION ROUTE
app.get("/mrs/:id/:time", function(req,res) {
    Movie.findById(req.params.id, function(err, foundMovie) {
        if(err){
            //if err occurs redirect to same page
            res.redirect("/movieinfo/"+req.params.id);
        } else {
            //get all reservations that match with the selected timeslot
            Reservation.find({id: req.params.time}, function(err, allreserved) {
                if(err){
                    //display error if there's any
                    console.log(err);
                } else {
                    //redirect to seat selection page with datas: selected movie, schedule id and all reservations
                    res.render("seatselection", {movie: foundMovie, schedule_id: req.params.time, reservations: allreserved});
                }
            });
        }
    });
});

//SAVE RESERVATION ROUTE
app.post("/reserveticket", function(req,res){
    //storing data into variables
    var id = req.body.id;
    var movie = req.body.movie;
    var cinema = req.body.cinema;
    var time = req.body.time;
    var date = req.body.date;
    var payment = req.body.payment;
    var numSeats = req.body.numSeats;
    var seats = req.body.seats

    //save reservation
    Reservation.create({
        id: id,
        movie: movie,
        cinema: cinema,
        time: time,
        date: date,
        payment: payment,
        numSeats: numSeats,
        seats: seats.split(",")
    }, function(err, newReserve) {
        if(err){
            //if error redirect to home
            res.render("/");
        } else {
            //get all data from the reservations db
            Reservation.find({}, function(err, allreserve) {
                if(err){
                    console.log("ERROR!");
                } else {
                    //redirect to reservations page with all the datas from reservation db
                    res.render("reservation", {reserve: allreserve});
                }
            });
        }
    });
});

//DELETE RESERVATION ROUTE
app.delete("/delete/:id", function(req,res){
    //delete selected reservation for db
    Reservation.findByIdAndRemove(req.params.id, function(err, deleteTicket){
        if(err){
            res.redirect("/reservation");
        } else {
            res.redirect("/reservation");
        }
    });
});

app.listen(3000, function(){
    console.log("Blog started!");
});