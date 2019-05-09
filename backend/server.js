///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// IMPORTED GOODS /////////////////////////////////////////////////////////////////////////////////////////////////////////

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const MongoClient = require("mongodb").MongoClient;
const app = express();

// PATHS //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const upload = multer({ dest: __dirname + "/uploads/" }); // Set file upload destination
const imagePath = "/images/";
const url =
   "mongodb+srv://admin:12345@cluster0-nswep.mongodb.net/test?retryWrites=true"; // URI for remote database!

// app.listen(4000, "0.0.0.0", () => { // REMOTE SERVER/DROPLET
//    console.log("Running on port 4000 , 0.0.0.0")
// })

app.listen(4000, () => {
   // LOCAL SERVER
   console.log("Running on port 4000");
});

// MIDDLEWARES ////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.use("/images", express.static(__dirname + "/uploads")); // Files in local folder uploads have endpoints as /images/x
app.use(cors());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3000" })); // CONFIG FOR LOCAL SERVER
// app.use(cors({ credentials: true, origin: "http://134.209.119.133:3000" })) // CONFIG FOR REMOTE SERVER

// STORAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Server storage:
let userCarts = []; // Cart-Example: { userID: 123, item: [ {itemId: 456, quantity: 2} , {itemId: 789, quantity: 5} ] }

// Remote db storage:
let itemsCollection;
let usersCollection;
let reviewsCollection;
let sessionsCollection;
let cartCollection;
//Connection to DB, do not close!
MongoClient.connect(url, { useNewUrlParser: true }, (err, allDbs) => {
   // Add option useNewUrlParser to get rid of console warning message
   if (err) throw err;
   marketplaceDB = allDbs.db("Marketplace-DB");
   itemsCollection = marketplaceDB.collection("Items");
   usersCollection = marketplaceDB.collection("Users");
   reviewsCollection = marketplaceDB.collection("Reviews");
   sessionsCollection = marketplaceDB.collection("Sessions");
   cartCollection = marketplaceDB.collection("Cart")
});

// ENDPOINTS //////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get("/get-items", function (req, res) {
   const decodedSearch = decodeURIComponent(req.query.search);
   if (decodedSearch === undefined) {
      // If not query is provided, return all items!
      console.log("DB: No query provided, returning ALL items...");
      itemsCollection.find({}).toArray((err, resultArr) => {
         if (err) throw err;
         res.send(JSON.stringify(resultArr));
         return;
      });
   }
   const searchWordsArray = decodedSearch.split(" ");
   const query = [
      {
         $match: {
            $or: [
               {
                  title: {
                     $regex: new RegExp("(" + searchWordsArray.join("|") + ")"),
                     $options: "$i"
                  }
               },
               {
                  details: {
                     $regex: new RegExp("(" + searchWordsArray.join("|") + ")"),
                     $options: "$i"
                  }
               }
            ]
         }
      }
   ];
   itemsCollection.aggregate(query).toArray((err, resultArr) => {
      if (err) throw err;
      console.log(`DB: Returning items that match provided query`);
      res.send(JSON.stringify(resultArr));
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.get("/get-single-item", function (req, res) {
   const itemId = req.query.itemId; // Get item from query in fetch path
   //Search for item in database
   itemsCollection.find({ itemId: itemId }).toArray((err, result) => {
      if (err) throw err;
      if (result[0] === undefined) {
         console.log("DB: No such item found!");
         res.send(JSON.stringify({ success: false }));
      }
      const searchedItem = result[0];
      res.send(JSON.stringify(searchedItem));
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.get("/get-items-by-user", function (req, res) {
   const userId = req.query.userId;

   let query = [
      {
         $match: {
            userId: userId
         }
      },
      {
         $lookup: {
            from: "Users",
            localField: "userId",
            foreignField: "userId",
            as: "user"
         }
      }
   ];

   itemsCollection.aggregate(query).toArray((err, result) => {
      if (err) throw err;
      res.send(JSON.stringify(result));
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.post("/signup", upload.none(), function (req, res) {
   //Check user collection in remote database to see if username already exists
   usersCollection
      .find({ username: req.body.username })
      .toArray((err, result) => {
         if (result[0] !== undefined) {
            // If database return any entry, user exists already!
            console.log("DB: Be yourself! Try something original...");
            res.send(JSON.stringify({ success: false }));
            return;
         }
         const newUser = {
            username: req.body.username,
            password: req.body.password,
            userId: generateId()
         };
         usersCollection.insertOne(newUser, (err, result) => {
            //Add new user to remote database
            if (err) throw err;
            console.log(
               `DB: Successfully inserted user ${
               req.body.username
               } into Users collection`
            );
            const newSessionId = generateId(); //Generate random number for cookie
            sessionsCollection.insertOne(
               { sessionId: newSessionId, user: req.body.username },
               (err, result) => {
                  if (err) throw err;
                  console.log("DB: Successfully added entry to Sessions collection");
                  res.cookie("sid", newSessionId);
                  res.send(
                     JSON.stringify({ success: true, username: req.body.username })
                  );
               }
            );
         });
      });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.post("/login", upload.none(), function (req, res) {
   const { username: enteredName, password: enteredPass } = req.body;
   // Check remote users collection in db
   usersCollection.find({ username: enteredName }).toArray((err, result) => {
      console.log("DB: Retrieving expected password for user");
      if (err) throw err;
      if (result[0] === undefined) {
         console.log("DB: User not found");
         res.send(JSON.stringify({ success: false }));
         return;
      }
      const expectedPass = result[0].password;
      if (enteredPass !== expectedPass) {
         // Check that password matches
         console.log("Passwords did not match!");
         res.send(JSON.stringify({ success: false }));
         return;
      }
      const newSessionId = generateId(); // Generate random number for sid cookie
      sessionsCollection.insertOne(
         { sessionId: newSessionId, user: enteredName },
         (err, result) => {
            if (err) throw err;
            console.log("DB: Successfully added entry to Sessions collection");
         }
      );
      console.log(`Logging in user ${enteredName}`);
      res.cookie("sid", newSessionId); // Send back set-cookie and successful response
      res.send(JSON.stringify({ success: true, username: enteredName }));
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.get("/logout", upload.none(), function (req, res) {
   console.log("Logging out...");
   sessionsCollection.deleteOne(
      { sessionId: req.cookies.sid },
      (err, result) => {
         // Remove from remote database
         if (err) throw err;
         console.log("DB: Successfully removed entry from sessions collection!");
      }
   );
   res.send(JSON.stringify({ success: true }));
});

//-----------------------------------------------------------------------------------------------------------------------//

app.post("/add-item", upload.array("images"), function (req, res) {
   const {
      title,
      description,
      price,
      stock,
      city,
      province,
      country
   } = req.body; // GET VARIABLES FROM REQ.BODY
   // Find user's name from remote database
   sessionsCollection
      .find({ sessionId: req.cookies.sid })
      .toArray((err, result) => {
         if (err) throw err;
         const currentUserName = result[0].user; // Store in variable to use in query
         const imageCount = req.files.length; // Handle image uploads
         let newItemImagePaths = [];
         for (let x = 0; x < imageCount; x++) {
            const file = req.files[x]; // Get file in loop
            const ext = file.originalname.split(".").pop(); // Get file extension
            const newFileName = `${file.filename}.${ext}`; // Store new filename
            fs.renameSync(file.path, `${__dirname}/uploads/${newFileName}`); // Change filepath
            newItemImagePaths.push(imagePath + newFileName); //Add image path to array
         }
         //Find user's id from database
         usersCollection
            .find({ username: currentUserName })
            .toArray((err, result) => {
               if (err) throw err;
               const newItemUserId = result[0].userId;
               const newItem = {
                  title: title,
                  details: description,
                  price: price,
                  stock: stock,
                  itemId: generateId(),
                  userId: newItemUserId, // Result of searching userCollection
                  city: city,
                  province: province,
                  country: country,
                  images: newItemImagePaths //Array of image paths
               };
               itemsCollection.insertOne(newItem, (err, result) => {
                  //Add item to database
                  if (err) throw err;
                  console.log(
                     `DB: Successfully inserted user ${currentUserName}'s item "${title}" into Items collection`
                  );
               });
               res.send(JSON.stringify({ success: true }));
            });
      });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.post("/add-review", upload.none(), function (req, res) {
   const sessionId = req.cookies.sid;
   const { itemId, rating, title, content } = req.body;
   console.log(req.body.itemId);
   //Get username from remote sessions colleciton
   sessionsCollection.find({ sessionId: sessionId }).toArray((err, result) => {
      if (err) throw err;
      const currentUserName = result[0].user;
      //Get userId from users collection
      usersCollection
         .find({ username: currentUserName })
         .toArray((err, result) => {
            const currentUserId = result[0].userId;
            const newReview = {
               userId: currentUserId,
               username: currentUserName,
               itemId: itemId,
               rating: rating,
               title: title,
               content: content
            };
            reviewsCollection.insertOne(newReview, (err, result) => {
               // Add entry to reviews collection
               if (err) throw err;
               console.log("DB: Successfully added entry to Reviews collection");
               res.send(JSON.stringify({ success: true }));
            });
         });
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.get("/get-reviews-for-id", function (req, res) {
   // GET REVIEWS FILTERED BY EITHER USERID OR ITEMID
   const itemId = req.query.itemId;
   const userId = req.query.userId;

   if (itemId === undefined) {
      // GET REVIEWS BY SELLER
      reviewsCollection.find({ userId: userId }).toArray((err, result) => {
         if (err) throw err;
         console.log("DB: Sending back reviews that match userId in response");
         res.send(JSON.stringify(result));
      });
   } else if (userId === undefined) {
      // OTHERWISE GET REVIEWS BY ITEM
      reviewsCollection.find({ itemId: itemId }).toArray((err, result) => {
         if (err) throw err;
         if (result[0] === undefined) {
            console.log("DB: No reviews found that match the itemId provided");
            res.send(JSON.stringify({ success: false }));
            return;
         }
         console.log("DB: Sending back reviews that match itemId in response");
         res.send(JSON.stringify(result));
      });
   }
});

//-----------------------------------------------------------------------------------------------------------------------//

app.get("/get-cart", function (req, res) {
   const sessionId = req.cookies.sid;
   //Get username from remote sessions colleciton
   sessionsCollection.find({ sessionId: sessionId }).toArray((err, result) => {
      if (err) throw err;
      const currentUserName = result[0].user;
      //Get userId from users collection
      usersCollection.find({ username: currentUserName }).toArray((err, result) => {

         const currentUserId = result[0].userId;

         cartCollection.find({ cartUserId: currentUserId }).toArray((err, result) => {
            console.log("DB: Searching for items in cart that match userId")
            res.send(JSON.stringify(result))
         })
      });
   });
})

// app.get("/get-cart", function (req, res) {
//    const sessionId = req.cookies.sid;
//    //Get username from remote sessions colleciton
//    sessionsCollection.find({ sessionId: sessionId }).toArray((err, result) => {
//       if (err) throw err;
//       const currentUserName = result[0].user;
//       //Get userId from users collection
//       usersCollection
//          .find({ username: currentUserName })
//          .toArray((err, result) => {
//             const currentUserId = result[0].userId;

//             const currentUserCart = userCarts.find(cart => {
//                return cart.userId === currentUserId;
//             });

//             if (currentUserCart === undefined) {
//                res.send(JSON.stringify({ success: false }));
//                return;
//             }

//             const itemIdArray = currentUserCart.itemIds;

//             let cartItems = [];

//             const query = {
//                itemId: {
//                   $regex: new RegExp("(" + itemIdArray.join("|") + ")")
//                }
//             };

//             itemsCollection.find(query).toArray((err, result) => {
//                cartItems.push(result);
//                res.send(JSON.stringify(result));
//             });
//          });
//    });
// });

//-----------------------------------------------------------------------------------------------------------------------//

app.post("/set-cart", upload.none(), function (req, res) {

   const { itemId, quantity } = req.body
   const currentCookie = req.cookies.sid

   console.log("ItemId: ", itemId)
   console.log("Quantity: ", quantity)

   //Get username from remote sessions colleciton
   sessionsCollection.find({ sessionId: currentCookie }).toArray((err, result) => {
      if (err) throw err;
      const currentUserName = result[0].user;
      //Get userId from users collection
      usersCollection.find({ username: currentUserName }).toArray((err, result) => {
         if (err) throw err;
         const currentUserId = result[0].userId;
         itemsCollection.find({ itemId: itemId }).toArray((err, result) => {
            if (err) throw err;
            let newCartItem = { ...result[0], _id: generateId(), quantity: quantity, cartUserId: currentUserId }
            let newCartItemStock = result[0].stock
            if (newCartItemStock < quantity) {
               console.log("DB: Item cannot be added to cart, not enough in stock!")
               res.send(JSON.stringify({ success: false }))
               return;
            }
            cartCollection.insertOne(newCartItem, (err, result) => {
               if (err) throw err;
               console.log(`DB: Successfully added entry to cart collection`)

               itemsCollection.updateOne({ itemId: itemId }, { $set: { stock: newCartItemStock - quantity } }, (err, result) => {
                  if (err) throw err;
                  console.log("DB: Successfully updated item's stock in Items collection")
                  res.send(JSON.stringify({ success: true }))
               })
            })
         })
      });
   });
})


// app.post("/set-cart", upload.none(), function (req, res) {
//    const { itemId, quantity } = req.body;

//    console.log(req.body.itemId);

//    let addItem = { itemId: itemId, quantity: quantity };

//    const currentCookie = req.cookies.sid;

//    //Get username from remote sessions colleciton
//    sessionsCollection
//       .find({ sessionId: currentCookie })
//       .toArray((err, result) => {
//          if (err) throw err;
//          const currentUserName = result[0].user;
//          //Get userId from users collection
//          usersCollection
//             .find({ username: currentUserName })
//             .toArray((err, result) => {
//                const currentUserId = result[0].userId;
//                const currentUserCart = userCarts.find(cart => {
//                   return cart.userId === currentUserId;
//                });
//                // Check if cart is empty/undefined
//                if (currentUserCart === undefined) {
//                   userCarts.push({ userId: currentUserId, items: [addItem] });
//                   console.log(`New cart created for user ${currentUserName}`);
//                   res.send(JSON.stringify({ success: true }));
//                   return;
//                }
//                //Otherwise add item to user's cart
//                currentUserCart.items = currentUserCart.items.concat(addItem);
//                console.log(`Cart successfully updated for user ${currentUserName}`);
//                res.send(JSON.stringify({ success: true }));
//             });
//       });
// });

//-----------------------------------------------------------------------------------------------------------------------//

app.get("clear-cart", function (req, res) {
   const sessionId = req.cookies.sid;
   //Get username from remote sessions colleciton
   sessionsCollection.find({ sessionId: sessionId }).toArray((err, result) => {
      if (err) throw err;
      const currentUserName = result[0].user;
      //Get userId from users collection
      usersCollection
         .find({ username: currentUserName })
         .toArray((err, result) => {
            const currentUserId = result[0].userId;
            const currentUserCart = userCarts.find(cart => {
               return cart.userId === currentUserId;
            });
            currentUserCart.itemIds = [];
            console.log("User's cart has been cleared!");
         });
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.get("/verify-cookie", function (req, res) {
   const currentCookie = req.cookies.sid;
   let query = [
      {
         $match: {
            sessionId: currentCookie
         }
      },
      {
         $lookup: {
            from: "Users",
            localField: "user",
            foreignField: "username",
            as: "user"
         }
      }
   ];
   sessionsCollection.aggregate(query).toArray((err, result) => {
      if (err) throw err;
      if (result === undefined || result.length === 0) {
         res.send(JSON.stringify({ success: false }));
         return;
      }

      res.send(
         JSON.stringify({ success: true, username: result[0].user[0].username })
      );
   });
});

//-----------------------------------------------------------------------------------------------------------------------//

app.post("checkout", function (req, res) {



});

// UTILITY FUNCTIONS //////////////////////////////////////////////////////////////////////////////////////////////////////

//Returns random number
const generateId = () => {
   return "" + Math.floor(Math.random() * 100000000);
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////