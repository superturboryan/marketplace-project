let express = require("express")
let cors = require("cors")
let multer = require("multer")
let upload = multer()
let app = express()
let cookieParser = require('cookie-parser')
const MongoClient = require("mongodb").MongoClient;

//Local server storage:
let data = require("./mockData.js")

let items = data.items
let reviews = data.reviews
let users = data.users

let url = "mongodb+srv://admin:12345@cluster0-nswep.mongodb.net/test?retryWrites=true"

//Remote db storage:
let itemsCollection
let usersCollection
let reviewsCollection
let sessionsCollection
MongoClient.connect(url, (err, allDbs) => {
   if (err) throw err;
   marketplaceDB = allDbs.db("Marketplace-DB")
   itemsCollection = marketplaceDB.collection("Items")
   usersCollection = marketplaceDB.collection("Users")
   reviewsCollection = marketplaceDB.collection("Reviews")
   sessionsCollection = marketplaceDB.collection("Sessions")
})

let sessions = {}

app.use(cookieParser());

//Config for local cors
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
//Config for remote server cors
// app.use(cors({ credentials: true, origin: "http://134.209.119.133:3000" }))


app.get("/get-all-items", function (req, res) {
   console.log("Returning  all items...")

   res.send(JSON.stringify(items))
})

app.get("/get-single-item", function (req, res) {
   //Get item from query in fetch path
   let searchedItemId = req.query.search

   let searchedItem = items.find(item => {
      return item.itemId === searchedItemId
   })

   res.send(JSON.stringify(searchedItem))
})

app.get("get-items-by-user", function (req, res) {
   let sessionId = req.cookies.sid

   let currentUserName = sessions[sessionId]

   let

})

//Will have to verify that username does not already exist!
app.post("/signup", upload.none(), function (req, res) {

   let newUserName = req.body.name
   let newUserPass = req.body.password
   let newUserId = generateId()
   let newUser = { username: newUserName, password: newUserPass, userId: newUserId }
   //Add new users to local users object
   users = users.concat(newUser)
   res.send({ success: true })

})

app.post("/login", upload.none(), function (req, res) {

   let enteredName = req.body.name
   let enteredPass = req.body.password
   //Check users array to find corresponding password

   let expectedPass

   let expectedPassUser = users.find(user => {
      return user.name === enteredName
   })

   if (expectedPassUser !== undefined) {
      expectedPass = expectedPassUser.password
   }

   //Check that password matches
   if (enteredPass !== expectedPass) {
      console.log("Passwords did not match!")
      res.send({ success: false })
      return
   }

   //Add new sessionId to sessions object
   let newSessionId = generateId()
   sessions[newSessionId] = enteredName

   console.log(`Logging in user ${enteredName}`)
   //Send back set-cookie and successful response
   res.cookie('sid', sessionId);
   res.send({ success: true })

})

app.post("/add-item", upload.single(), function (req, res) {

   let sessionId = req.cookies.sid

   let currentUserName = sessions[sessionId]

   //Get userId from mock
   let newItemUser = users.find(user => {
      return user.name === currentUserName
   })

   let newItemUserId

   if (newItemUser !== undefined) {
      newItemUserId = newItemUser.userId
   }

   let newItemTitle = req.body.title
   let newItemDetails = req.body.description
   let newItemPrice = req.body.price
   let newItemImages = req.body.images
   let newItemStock = req.body.stock
   let newItemCity = req.body.city
   let newItemProvince = req.body.province
   let newItemCountry = req.body.country

   let newItem = {
      title: newItemTitle,
      details: newItemDetails,
      price: newItemPrice,
      images: newItemImages,
      stock: newItemStock,
      itemId: generateId(),
      userId: newItemUserId,
      city: newItemCity,
      province: newItemProvince,
      country: newItemCountry
   }

   //Add new item to local object
   items = items.concat(newItem)

   //Add item to database
   itemsCollection.insertOne(newItem, (err, result) => {
      if (err) throw err;
      console.log("DB: Successfully inserted entry into Items collection")
   })

   res.send({ success: true })
})

app.post("/add-review", upload.none(), function (req, res) {

   let sessionId = req.cookies.sid
   let currentUserName = sessions[sessionId]

   let newReviewUserId = users.find(user => {
      return user.name === currentUserName
   }).userId

   let newReviewItemId = req.body.itemId
   let newReviewRating = req.body.rating
   let newReviewTitle = req.body.title
   let newReviewContent = req.body.content

   let newReviewToAdd = {
      userId: newReviewUserId,
      username: currentUserName,
      itemId: newReviewItemId,
      rating: newReviewRating,
      title: newReviewTitle,
      content: newReviewContent
   }

   reviews.concat(newReviewToAdd)

   res.send({ success: true })
})

//GET REVIEWS FILTERED BY EITHER USERID OR ITEMID
app.get("/get-reviews-for-id", function (req, res) {

   let itemId = req.query.itemId
   let sellerId = req.query.sellerId

   let reviewsToReturn

   //GET REVIEWS BY SELLER
   if (itemId === undefined) {
      reviewsToReturn = reviews.filter(review => {
         return review.userId = userId
      })
   }
   //OTHERWISE GET REVIEWS BY ITEM
   else if (sellerId === undefined) {
      reviewsToReturn = reviews.filter(review => {
         return review.itemId = itemId
      })
   }

   res.send(JSON.stringify(reviewsToReturn))
})


//USE WITH REMOTE SERVER! 
// app.listen(4000, "0.0.0.0", () => {
//    console.log("Running on port 4000 , 0.0.0.0")
// })

//USE WITH LOCAL SERVER!
app.listen(4000, () => {
   console.log("Running on port 4000")
})

//Returns random number
let generateId = () => {
   return "" + Math.floor(Math.random() * 100000000)
}