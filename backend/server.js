//Import statements

let express = require("express");
let cors = require("cors");
let multer = require("multer");
let fs = require("fs");
let app = express();
let cookieParser = require("cookie-parser");
const MongoClient = require("mongodb").MongoClient;

let upload = multer({
   //Set file upload destination
   dest: __dirname + "/uploads/"
});

let imagePath = "/images/";

//Files in local folder uploads have endpoints as /images/x
app.use("/images", express.static(__dirname + "/uploads"));

//Local server storage:
let data = require("./mockData.js");

let items = data.items;
let reviews = data.reviews;
let users = data.users;

let url =
   "mongodb+srv://admin:12345@cluster0-nswep.mongodb.net/test?retryWrites=true";

//Remote db storage:
let itemsCollection;
let usersCollection;
let reviewsCollection;
let sessionsCollection;
//Add option useNewUrlParser to get rid of console warning message
MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
   if (err) throw err;
   marketplaceDB = allDbs.db("Marketplace-DB");
   itemsCollection = marketplaceDB.collection("Items");
   usersCollection = marketplaceDB.collection("Users");
   reviewsCollection = marketplaceDB.collection("Reviews");
   sessionsCollection = marketplaceDB.collection("Sessions");
});

let sessions = {};

app.use(cookieParser());

//Config for local cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
//Config for remote server cors
// app.use(cors({ credentials: true, origin: "http://134.209.119.133:3000" }))

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/get-all-items", function (req, res) {
   console.log("Returning  all items...");
   //Get items from DB
   itemsCollection.find({}).toArray((err, resultArr) => {
      if (err) throw err;

      res.send(JSON.stringify(resultArr))
   })

   //Get items from local object
   // res.send(JSON.stringify(items));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/get-single-item", function (req, res) {
   //Get item from query in fetch path
   let searchedItemId = req.query.search;

   //Search for item in local object
   let searchedItem = items.find(item => {
      return item.itemId === searchedItemId;
   });
   res.send(JSON.stringify(searchedItem));

   //Search for item in database
   // itemsCollection.findOne({ itemId: searchedItemId}).toArray((err, result) => {
   //    if (err) throw err;
   //    let searchedItem = result[0]
   //    res.send(JSON.stringify(searchedItem))
   // })
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("get-items-by-user", function (req, res) {
   let searchedUserId = req.query.userId;

   //Search for item in local object
   // let searchedItems = items.filter(item => {
   //    return item.userId === searchedUserId;
   // });
   // res.send(JSON.stringify(searchedItems));

   //Search for item in database
   itemsCollection.find({ userId: searchedUserId }).toArray((err, result) => {
      if (err) throw err;
      let searchedItems = result
      res.send(JSON.stringify(searchedItems))
   })
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/signup", upload.none(), function (req, res) {

   //Check user collection in remote database to see if username already exists
   usersCollection.find({ username: req.body.username }).toArray((err, result) => {
      if (result[0] !== undefined) {
         console.log("DB: Name already being used! Try something original...")
         res.send(JSON.stringify({ success: false }))
         return;
      }

      let newUser = {
         username: req.body.username,
         password: req.body.password,
         userId: generateId()
      };

      //Add new users to local users object
      users = users.concat(newUser);

      //Add new user to remote database
      usersCollection.insertOne(newUser, (err, result) => {
         if (err) throw err;
         console.log("DB: Successfully inserted entry into Users collection");
      });
      res.send(JSON.stringify({ success: true }));
   })
});

app.post("/login", upload.none(), function (req, res) {

   let enteredName = req.body.username;
   let enteredPass = req.body.password;
   let expectedPass;

   //Check remote users collection in db
   usersCollection.find({ username: enteredName }).toArray((err, result) => {
      console.log("DB: Retrieving expected password for user")
      if (err) throw err;
      if (result[0] === undefined) {
         console.log("DB: User not found")
         res.send(JSON.stringify({ success: false }));
         return;
      }
      expectedPass = result[0].password
      //Check that password matches
      if (enteredPass !== expectedPass) {
         console.log("Passwords did not match!");
         res.send(JSON.stringify({ success: false }));
         return;
      }
      //Generate random number for cookie
      let newSessionId = generateId();

      //Add new session to local sessions object
      sessions[newSessionId] = enteredName;
      //Add new session to remote database
      sessionsCollection.insertOne(
         { sessionId: newSessionId, user: enteredName },
         (err, result) => {
            if (err) throw err;
            console.log("DB: Successfully added entry to Sessions collection");
         }
      );

      console.log(`Logging in user ${enteredName}`);
      //Send back set-cookie and successful response
      res.cookie("sid", newSessionId);
      res.send(JSON.stringify({ success: true }));
   })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/logout", upload.none(), function (req, res) {
   console.log("Logging out...");

   //Remove from local sessions object
   delete sessions[req.cookies.sid];

   //Remove from remote database
   sessionsCollection.deleteOne(
      { sessionId: req.cookies.sid },
      (err, result) => {
         if (err) throw err;
         console.log("DB: Successfully removed entry from sessions collection!");
      }
   );
   res.send(JSON.stringify({ success: true }));
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/add-item", upload.array("images"), function (req, res) {
   //Find username from remote database
   sessionsCollection.find({ sessionId: req.cookies.sid }).toArray((err, result) => {
      if (err) throw err;
      let currentUserName = result[0].user;

      //Handle image uploads
      let imageCount = req.files.length;
      let newItemImagePaths = [];
      for (let x = 0; x < imageCount; x++) {
         console.log(`FILE # ${x} : `, req.files[x]);
         let file = req.files[x];
         let ext = file.originalname.split(".").pop();
         let newFileName = `${file.filename}.${ext}`;
         fs.renameSync(file.path, `${__dirname}/uploads/${newFileName}`);
         //Add image path to array
         newItemImagePaths.push(imagePath + newFileName);
      }

      //Find user's id from database
      usersCollection.find({ username: currentUserName }).toArray((err, result) => {
         if (err) throw err;

         let newItemUserId = result[0].userId

         let newItem = {
            title: req.body.title,
            details: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            itemId: generateId(),
            userId: newItemUserId,
            city: req.body.city,
            province: req.body.province,
            country: req.body.country,
            images: newItemImagePaths
         };

         //Add new item to local object
         items = items.concat(newItem);

         //Add item to database
         itemsCollection.insertOne(newItem, (err, result) => {
            if (err) throw err;
            console.log("DB: Successfully inserted entry into Items collection");
         });
         res.send(JSON.stringify({ success: true }));
      })
   });
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/add-review", upload.none(), function (req, res) {
   let sessionId = req.cookies.sid;

   //Get username from remote sessions colleciton
   sessionsCollection.find({ sessionId: sessionId }).toArray((err, result) => {
      if (err) throw err;

      let currentUserName = result[0].user
      //Get userId from users collection
      usersCollection.find({ username: currentUserName }).toArray((err, result) => {

         let currentUserId = result[0].userId

         let newReview = {
            userId: currentUserId,
            username: currentUserName,
            itemId: req.body.itemId,
            rating: req.body.rating,
            title: req.body.title,
            content: req.body.content
         };
         //Add entry to reviews collection
         reviewsCollection.insertOne(newReview, (err, result) => {
            if (err) throw err;
            console.log("DB: Successfully added entry to Reviews collection")
            res.send(JSON.stringify({ success: true }));
         })
      })
   })
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//GET REVIEWS FILTERED BY EITHER USERID OR ITEMID
app.get("/get-reviews-for-id", function (req, res) {
   let itemId = req.query.itemId;
   let userId = req.query.userId;

   //GET REVIEWS BY USER/SELLER
   if (itemId === undefined) {

      usersCollection.find({ userId: userId }).toArray((err, result) => {
         if (err) throw err;
         if (result[0] === undefined) {
            console.log("DB: No reviews found that match the userId provided")
            res.send(JSON.stringify({ success: false }))
         }
         let username = result[0].username

         reviewsCollection.find({ username: username }).toArray((err, result) => {
            if (err) throw err;
            console.log("DB: Sending back reviews that match userId in response")
            res.send(JSON.stringify(result))
         })
      })
   }
   //OTHERWISE GET REVIEWS BY ITEM
   else if (sellerId === undefined) {
      reviewsCollection.find({ itemId: itemId }).toArray((err, result) => {
         if (err) throw err;
         if (result[0] === undefined) {
            console.log("DB: No reviews found that match the itemId provided")
            res.send(JSON.stringify({ success: false }))
         }
         console.log("DB: Sending back reviews that match itemId in response")
         res.send(JSON.stringify(result))
      })
   }
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//USE WITH REMOTE SERVER!
// app.listen(4000, "0.0.0.0", () => {
//    console.log("Running on port 4000 , 0.0.0.0")
// })

//USE WITH LOCAL SERVER!
app.listen(4000, () => {
   console.log("Running on port 4000");
});

//Returns random number
let generateId = () => {
   return "" + Math.floor(Math.random() * 100000000);
};
