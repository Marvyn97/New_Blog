import {fileURLToPath} from "url";
import express from 'express';
import session from "express-session";
import path from "path";
import "dotenv/config";

import { mySession } from "./config/session.js";
import  {PORT} from "./config/index.js";
import initSession from "./config/session.js";

import { pageNotFound } from "./controllers/index.controllers.js";
import router from "./routes/index.js"


const app= express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', "./views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + '/public')));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session(mySession))
app.use(initSession);

app.use(router);
app.use('/*', pageNotFound);





// app.get("/", (request, response) => {
//     pool.query(`
//     SELECT post.Id, Title, Contents, author.Firstname, author.LastName, CreationTimestamp, Author_Id 
//     FROM post 
//     JOIN author 
//     ON post.Author_Id = author.Id 
//     ORDER BY CreationTimestamp DESC`, function (err, res, fields) {
//         if (err) {
//             throw Error;
//         } else {
//             // console.log(res);
//             response.render("layout", {template: "home", posts: res, session: request.session})
//         }
//     });
// })

// app.get("/comment/:id", (request, response) => {
//     let id = request.params.id;

//     const sql1 = 'SELECT Post.Id, Title, Contents, CreationTimestamp, FirstName, LastName FROM Post INNER JOIN Author ON Post.Author_Id = Author.Id WHERE Post.Id = ?';
//     const sql2 = 'SELECT * FROM Comment WHERE Post_Id = ?';

//     pool.query(sql1, [id], function(error, post){
//         pool.query(sql2, [id], function(error, comments) {
//             response.render('layout', {template:'comment', post: post[0], comments: comments });
//         });
//     });
// });


// app.post("/form/:id", (req,res) => {
//     let id = req.params.id;
//     pool.query('INSERT INTO comment (NickName, Contents, CreationTimestamp, Post_Id) VALUES (?,?,NOW(),?)',
//     [req.body.alias, req.body.message, id],
//     (err, result)=>{
//         if(err){
//             console.log(err);
//         }
//         //console.log(result);
//         res.redirect("/comment/"+id)
//     })
// })


/*******************/
/******ADMIN********/
/*******************/

// app.get("/admin",(req, response)=>{
//     pool.query(`SELECT Post.Id, Title, Contents, CreationTimestamp, FirstName, LastName, Category.Name AS Category_Name 
//     FROM Post 
//     INNER JOIN Author 
//     ON Post.Author_Id = Author.Id 
//     INNER JOIN Category 
//     ON Post.Category_Id = Category.Id 
//     ORDER BY CreationTimestamp DESC`,
//     function (err, res) {
//         if (err){
//             console.log(err);
//         } else {
//             // console.log(res);
//             response.render("layout", {template: "admin", data: res});
//         }
//     });
// })

// app.get("/add_post", (req,res)=> {
//     pool.query('SELECT * FROM Author ', function (err, authors){
//         pool.query('SELECT * FROM Category', function (err, categories){
//             res.render('layout', {template:'add_post', authors: authors, categories: categories })
//         });
//     });
// });

// app.post('/add_post', (req,res)=>{
//     pool.query('INSERT INTO Post (Title, Contents, Author_Id, Category_Id, CreationTimestamp) VALUES (?, ?, ?, ?, NOW())', 
//     [req.body.title, req.body.content, req.body.author, req.body.category ], function (error) {
//         if(error){
//             throw error
//         }
//         res.redirect("/admin");
//     });
// });

// app.get('/edit_post/:id', (req,res)=>{
//     let id = req.params.id;

//     pool.query('SELECT * FROM Post WHERE id = ?', [id], (err, post)=>{
//         res.render('layout', {template: 'edit_post', post: post[0]});
//     });
// });

// app.get('/delete_post/:id', (req,res)=>{
//     const id = req.params.id;
//     console.log(id);
//     pool.query('DELETE FROM post WHERE id = ?', [id], (err, result)=>{
//         if(err){
//             throw err
//         }
//         console.log(result);
//         res.redirect('/admin');
//     });
// });

// /*******************/
// /****** USER *******/
// /*******************/

// app.get("/login", (req,res) => {
//     res.render("layout", {template: "login", session : req.session, error: null})
// })

// app.post("/login",  (req, res)=> {
//      const email = req.body.email;
//      let password = req.body.password;

//      pool.query('SELECT * FROM user WHERE Email = ?', [email], async function(err, user){
//          if (err){
//              res.render("layout", {
//                  template: "login",
//                  error: "problème de récupération de la bdd",
//              });
//          }
//          if (!user.length){
//              res.render("layout", {template: "login", error: "l'utilisateur n'existe pas",})
//          } else {
//             const comparison = await bcrypt.compare(password, user[0].Password);
//             if(comparison){
//                 req.session.user = {
//                     firstname: user[0].FirstName,
//                     role: user[0].Role,
//                 }
//                 req.session.isLogged = true;

//                 if(user[0].Role === "admin"){
//                     res.redirect('/admin');
//                 } else {
//                     res.redirect('/');
//                 }
//             } else {
//                 res.render("layout", {
//                     template: "login",
//                     error: "mauvais mot de passe"
//                 })
//             }
//         }
//     })
//  })


// app.get("/register", (req,res) => {
//     res.render("layout", {template: "register", session: req.session, error: null})
// })

// app.post("/register", async (req,res)=>{
//     const firstName = req.body.firstName
//     const lastName = req.body.lastName
//     const email = req.body.email
//     let password = req.body.password

//    const hash = await bcrypt.hash(password, saltrounds);
//         console.log(hash);
//         pool.query('INSERT INTO user (Email, FirstName, LastName, Password, Role) VALUES (?, ?, ?, ?, "user")', 
//         [email, firstName, lastName, hash], 
//         function (err, result) {
//             if (err){
//                 throw err;
//             }
//             console.log(result);
//             res.redirect("/login");
//         });  
//     })
    
//     app.get('/logout', (req, res) => {
//         req.session.destroy();
//         res.redirect("/");
//     })
    

    
app.listen(PORT, ()=>{
    console.log(`listening at : http://localhost:${PORT}`);
})
