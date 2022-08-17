//Object Orient Programming

//MVC
//Model
//View
//Controller

// Projekte naudojami moduliai: express, MySQL2, nodemon, express-handlebars
import express from "express";
import { engine } from "express-handlebars";
import session from "express-session";
import database from './database/connect.js';
import playlist from './routing (MVC structure)/controller/playlist.js';
import register from './routing (MVC structure)/controller/register.js.js';
import login from './routing (MVC structure)/controller/login.js';
import songs from './routing (MVC structure)/controller/songs.js';

const port = process.env.PORT || 3000;

const app = express();
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views"));
app.use("/views", express.static("public"));

// Playlist route'ų konfigūracija norint priskirti adreso priešdėlį
//app.use('/playlists', playlist)
//Playlist route'o konfigūracija, keliams prijungti prie bazinio adreso
// PLAYLIST
app.use(playlist)
// REGISTER
app.use(register)
// LOGIN
app.use(login)
// SONGS
app.use(songs)

app.listen(port);
