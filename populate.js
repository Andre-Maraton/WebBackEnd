var bodyParser = require("body-parser"),
methodOverride = require('method-override'),
expressSanitizer = require('express-sanitizer'),
mongoose       = require("mongoose"),
request        = require("request"),
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
    date: Date,
    start: String,
    end: String,
    price: Number,
    seats: Number
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

//IRON MAN 1
var id = "tt0371746";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            console.log(movie);
            if(err){
                console.log(err);
            } else {
                movie.schedule.push(
                {//5/25/2020
                    id: "S101",
                    cinema: 1,
                    date: "5/22/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S201",
                    cinema: 2,
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S301",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S401",
                    cinema: 4,
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/23/2020
                    id: "S102",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S202",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S302",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S402",
                    cinema: 4,
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/24/2020
                    id: "S103",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S203",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S303",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S403",
                    cinema: 4,
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/25/2020
                    id: "S104",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S204",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S304",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S404",
                    cinema: 4,
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/26/2020
                    id: "S105",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S205",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S305",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S405",
                    cinema: 4,
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//DOCTOR STRANGE 2
var id = "tt1211837";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/22/2020
                    id: "S106",
                    cinema: "1",
                    date: "5/22/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 150
                },
                {
                    id: "S206",
                    cinema: 2,
                    date: "5/22/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 180
                },
                {
                    id: "S306",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S406",
                    cinema: 4,
                    date: "5/22/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 250
                },
                {//5/23/2020
                    id: "S107",
                    cinema: "1",
                    date: "5/23/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 150
                },
                {
                    id: "S207",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 180
                },
                {
                    id: "S307",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S407",
                    cinema: 4,
                    date: "5/23/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 250
                },
                {//5/24/2020
                    id: "S108",
                    cinema: "1",
                    date: "5/24/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 150
                },
                {
                    id: "S208",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 180
                },
                {
                    id: "S308",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S408",
                    cinema: 4,
                    date: "5/24/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 250
                },
                {//5/25/2020
                    id: "S109",
                    cinema: "1",
                    date: "5/25/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 150
                },
                {
                    id: "S209",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 180
                },
                {
                    id: "S309",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S409",
                    cinema: 4,
                    date: "5/25/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 250
                },
                {//5/26/2020
                    id: "S110",
                    cinema: "1",
                    date: "5/26/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 150
                },
                {
                    id: "S210",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 180
                },
                {
                    id: "S310",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S410",
                    cinema: 4,
                    date: "5/26/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//CAPTAIN AMERICA 3
var id = "tt0458339";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/22/2020
                    id: "S111",
                    cinema: "1",
                    date: "5/22/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 150
                },
                {
                    id: "S211",
                    cinema: 2,
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S311",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S411",
                    cinema: 4,
                    date: "5/22/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/23/2020
                    id: "S112",
                    cinema: "1",
                    date: "5/23/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 150
                },
                {
                    id: "S212",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S312",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S412",
                    cinema: 4,
                    date: "5/23/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/24/2020
                    id: "S113",
                    cinema: "1",
                    date: "5/24/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 150
                },
                {
                    id: "S213",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S313",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S413",
                    cinema: 4,
                    date: "5/24/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/25/2020
                    id: "S114",
                    cinema: "1",
                    date: "5/25/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 150
                },
                {
                    id: "S214",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S314",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S414",
                    cinema: 4,
                    date: "5/25/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/26/2020
                    id: "S115",
                    cinema: "1",
                    date: "5/26/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 150
                },
                {
                    id: "S215",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S315",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S415",
                    cinema: 4,
                    date: "5/26/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//THOR 4
var id = "tt0800369";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/22/2020
                    id: "S416",
                    cinema: 4,
                    date: "5/22/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S116",
                    cinema: "1",
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S216",
                    cinema: 2,
                    date: "5/22/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S316",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/23/2020
                    id: "S417",
                    cinema: 4,
                    date: "5/23/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S117",
                    cinema: "1",
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S217",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S317",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/24/2020
                    id: "S418",
                    cinema: 4,
                    date: "5/24/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S118",
                    cinema: "1",
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S218",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S318",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/25/2020
                    id: "S419",
                    cinema: 4,
                    date: "5/25/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S119",
                    cinema: "1",
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S219",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S319",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/26/2020
                    id: "S420",
                    cinema: 4,
                    date: "5/26/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S120",
                    cinema: "1",
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S220",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 200
                },
                {
                    id: "S320",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//SPIDER MAN 5
var id = "tt6320628";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/22/2020
                    id: "S321",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S121",
                    cinema: "1",
                    date: "5/22/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 180
                },
                {
                    id: "S221",
                    cinema: 2,
                    date: "5/22/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 200
                },
                {
                    id: "S421",
                    cinema: 4,
                    date: "5/22/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/23/2020
                    id: "S322",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S122",
                    cinema: "1",
                    date: "5/23/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 180
                },
                {
                    id: "S222",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 200
                },
                {
                    id: "S422",
                    cinema: 4,
                    date: "5/23/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/24/2020
                    id: "S323",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S123",
                    cinema: "1",
                    date: "5/24/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 180
                },
                {
                    id: "S223",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 200
                },
                {
                    id: "S423",
                    cinema: 4,
                    date: "5/24/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/25/2020
                    id: "S324",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S124",
                    cinema: "1",
                    date: "5/25/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 180
                },
                {
                    id: "S224",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 200
                },
                {
                    id: "S424",
                    cinema: 4,
                    date: "5/25/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/26/2020
                    id: "S325",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S125",
                    cinema: "1",
                    date: "5/26/2020",
                    start: "4:00 PM",
                    end: "6:00 PM",
                    price: 180
                },
                {
                    id: "S225",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 200
                },
                {
                    id: "S425",
                    cinema: 4,
                    date: "5/26/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//ANT MAN 6
var id = "tt0478970";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/22/2020
                    id: "S226",
                    cinema: 2,
                    date: "5/22/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S326",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 180
                },
                {
                    id: "S426",
                    cinema: 3,
                    date: "5/22/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 200
                },
                {
                    id: "S126",
                    cinema: "1",
                    date: "5/22/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/23/2020
                    id: "S227",
                    cinema: 2,
                    date: "5/23/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S327",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 180
                },
                {
                    id: "S427",
                    cinema: 3,
                    date: "5/23/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 200
                },
                {
                    id: "S127",
                    cinema: "1",
                    date: "5/23/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/24/2020
                    id: "S228",
                    cinema: 2,
                    date: "5/24/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S328",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 180
                },
                {
                    id: "S428",
                    cinema: 3,
                    date: "5/24/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 200
                },
                {
                    id: "S128",
                    cinema: "1",
                    date: "5/24/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/25/2020
                    id: "S229",
                    cinema: 2,
                    date: "5/25/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S329",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 180
                },
                {
                    id: "S429",
                    cinema: 3,
                    date: "5/25/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 200
                },
                {
                    id: "S129",
                    cinema: "1",
                    date: "5/25/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                },
                {//5/26/2020
                    id: "S230",
                    cinema: 2,
                    date: "5/26/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S330",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "10:00 AM",
                    end: "12:00 PM",
                    price: 180
                },
                {
                    id: "S430",
                    cinema: 3,
                    date: "5/26/2020",
                    start: "12:00 PM",
                    end: "2:00 PM",
                    price: 200
                },
                {
                    id: "S130",
                    cinema: "1",
                    date: "5/26/2020",
                    start: "6:00 PM",
                    end: "8:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//BLACK PANTHER
var id = "tt1825683";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/27/2020
                    id: "S131",
                    cinema: 2,
                    date: "5/27/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S231",
                    cinema: 2,
                    date: "5/27/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S331",
                    cinema: 3,
                    date: "5/27/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S431",
                    cinema: 4,
                    date: "5/27/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/28/2020
                    id: "S132",
                    cinema: 2,
                    date: "5/28/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S232",
                    cinema: 2,
                    date: "5/28/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S332",
                    cinema: 3,
                    date: "5/28/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S432",
                    cinema: 4,
                    date: "5/28/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//CAPTAIN MARVEL
var id = "tt4154664";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/29/2020
                    id: "S133",
                    cinema: 2,
                    date: "5/29/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S233",
                    cinema: 2,
                    date: "5/29/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S333",
                    cinema: 3,
                    date: "5/29/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S433",
                    cinema: 4,
                    date: "5/29/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//5/30/2020
                    id: "S134",
                    cinema: 2,
                    date: "5/30/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S234",
                    cinema: 2,
                    date: "5/30/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S334",
                    cinema: 3,
                    date: "5/30/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S434",
                    cinema: 4,
                    date: "5/30/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

//GUARDIAN OF THE GALAXY
var id = "tt3896198";
var url = "http://www.omdbapi.com/?i="+id+"&apikey=thewdb";
request(url, (error, response, body) => {
    if(!error && response.statusCode == 200){
        var data = JSON.parse(body);
        Movie.create({
            id: data["imdbID"],
            title:data["Title"],
            poster: data["Poster"],
            synopsis: data["Plot"],
            director: data["Director"],
            genre: data["Genre"].split(","),
            rating: data["imdbRating"],
            runtime: data["Runtime"],
        }, function(err, movie){
            if(err){
                // console.log(err);
            } else {
                movie.schedule.push(
                {//5/31/2020
                    id: "S135",
                    cinema: 2,
                    date: "5/31/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S235",
                    cinema: 2,
                    date: "5/31/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S335",
                    cinema: 3,
                    date: "5/31/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S435",
                    cinema: 4,
                    date: "5/31/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                },
                {//6/1/2020
                    id: "S136",
                    cinema: 2,
                    date: "6/1/2020",
                    start: "8:00 AM",
                    end: "10:00 AM",
                    price: 150
                },
                {
                    id: "S236",
                    cinema: 2,
                    date: "6/1/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 180
                },
                {
                    id: "S336",
                    cinema: 3,
                    date: "6/1/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 200
                },
                {
                    id: "S436",
                    cinema: 4,
                    date: "6/1/2020",
                    start: "2:00 PM",
                    end: "4:00 PM",
                    price: 250
                }
                );
                movie.save(function(err, movie){
                    if(err){
                        console.log(err);
                    } else {
                        console.log(movie);
                    }
                });
            }
        });
    }
});

app.listen(3000, function(){
    console.log("Blog started!");
});