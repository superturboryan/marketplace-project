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

//Remote db storage:
// let itemsCollection
// let usersCollection
// let reviewsCollection
// let sessionsCollection
// MongoClient.connect(url, (err, allDbs) => {
//    if (err) throw err;
//    marketplaceDB = allDbs.db("Marketplace-DB")
//    itemsCollection = marketplaceDB.collection("Items")
//    usersCollection = marketplaceDB.collection("Users")
//    reviewsCollection = marketplaceDB.collection("Reviews")
//    sessionsCollection = marketplaceDB.collection("Sessions")
// })

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

   let searchedItem = mockItems.find(item => {
      return item.itemId === searchedItemId
   })
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
   let expectedPass = users.find(user => {
      return user.name === enteredName
   }).password

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
   let newItemUserId = users.find(user => {
      return user.name === currentUserName
   }).userId

   let newItemTitle = req.body.title
   let newItemDetails = req.body.details
   let newItemPrice = req.body.price
   let newItemImages = req.body.images
   let newItemStock = req.body.stock
   let newItemCity = req.body.location.city
   let newItemProvince = req.body.location.province
   let newItemCountry = req.body.location.country

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

   let reviewsToReturn

   //GET REVIEWS BY SELLER
   if (req.body.itemId === undefined) {
      reviewsToReturn = reviews.filter(review => {
         return review.userId = req.body.userId
      })
   }
   //OTHERWISE GET REVIEWS BY ITEM
   else if (req.body.userId === undefined) {
      reviewsToReturn = reviews.filter(review => {
         return review.itemId = req.body.itemId
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