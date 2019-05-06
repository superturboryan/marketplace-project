let exportData = {

   items: [
      {
         title: "Hat",
         details: "round yellow sun hat",
         price: 50,
         images: [],
         stock: 10,
         //
         itemId: "abc",
         //UserId identifies who is selling item
         userId: 123,
         city: "Montreal",
         province: "Kweebek",
         country: "Canada"
      },
      {
         title: "Socks",
         details: "Tube athletic",
         price: 10,
         images: [],
         stock: 10,
         itemId: "def",
         userId: 123,
         city: "Montreal",
         province: "Kweebek",
         country: "Canada"
      },
      {
         title: "Hat",
         details: "redsox baseball cap",
         price: 40,
         images: [],
         stock: 10,
         itemId: "ghi",
         userId: 123,
         city: "Montreal",
         province: "Kweebek",
         country: "Canada"
      }
   ],

   reviews: [
      {
         //UserId identifies who posted the review
         userId: 123,
         username: "kenton",
         itemId: "abc",
         rating: 5,
         title: "Great Hat!",
         content: "Fit was great, delivered on time!",
      },
      {
         userId: 123,
         username: "kenton",
         itemId: "def",
         rating: 5,
         title: "Nice socks!",
         content: "Loved the athletic cut!"
      },
      {
         userId: 123,
         username: "kenton",
         itemId: "ghi",
         rating: 5,
         title: "Great baseball cap!",
         content: "Fit was great, delivered on time!"
      },
   ],

   users: [
      {
         name: "kenton",
         password: "test",
         userId: "123"
      },
      {
         name: "sam",
         password: "test",
         userId: "2"
      },
      {
         name: "daniel",
         password: "test",
         userId: "3"
      },
      {
         name: "ryan",
         password: "test",
         userId: "4"
      }
   ]

}



module.exports = exportData