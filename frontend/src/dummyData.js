//dummy data for testing. Took it from marketplace...

let initialItems = [
  {
    title: "Boat",
    description: "Nice boats. 50% off. wow.", //rename to details
    price: 100000,
    images: ["./../uploads/boat.gif"],
    stock: 1,
    id: "asewq",
    sellerId: "ewio"
  },
  {
    id: "wqwasq",
    title: "Lawn Chair",
    description: "Lawn chairs",
    price: 50,
    stock: 5,
    images: ["./../uploads/lawnchair.jpg"],
    sellerId: "xcvb"
  },
  {
    title: "Shirt",
    description: "Best shirt for shirting around",
    stock: 42,
    price: 10000,
    images: ["./../uploads/shirt.png"],
    id: "qwer",
    sellerId: "ewio"
  },
  {
    id: "123rtyh",
    stock: 13,
    title: "Running Shoes",
    description: "For those baby steps...",
    price: 50,
    images: ["./../uploads/shoes.jfif"],
    sellerId: "xcvb"
  },
  {
    title: "Hat",
    description: "Stylish much?",
    stock: 21,
    price: 10,
    images: ["./../uploads/hat.jpg"],
    id: "765hf",
    sellerId: "ewio"
  },
  {
    id: "5tyhgr6",
    stock: 11,
    title: "Coffee mug",
    description: "Keeping your fuel warm.",
    price: 15,
    images: ["./../uploads/coffeemug.jpg"],
    sellerId: "xcvb"
  },
  {
    title: "Galaxy S10",
    description: "A new phone",
    price: 1000,
    stock: 3,
    images: [
      "./../uploads/gs10_3.png",
      "./../uploads/gs10_2.png",
      "./../uploads/gs10_4.png",
      "./../uploads/gs10_5.png",
      "./../uploads/gs10_1.png"
    ],
    id: "765y",
    sellerId: "ewio"
  },
  {
    id: "hjhjhgh",
    stock: 17,
    title: "Katana set",
    description: "Don't use this at home. Decoration only",
    price: 800,
    images: ["./../uploads/katanaset.jpg"],
    sellerId: "xcvb"
  },
  {
    title: "Drizzt Shirt",
    description: "Drizzt Shirt from the Legend of Drizzt novels.",
    price: 40,
    stock: 71,
    images: ["./../uploads/drizztshirt.jpg"],
    id: "artemis",
    sellerId: "ewio"
  },
  {
    id: "567",
    title: "Helmet",
    description: "Safety first!",
    price: 50,
    stock: 1,
    images: ["./../uploads/helmet.jpg"],
    sellerId: "xcvb"
  },
  {
    title: "Beanie hat",
    description: "Cool beans",
    stock: 99,
    price: 10,
    images: ["./../uploads/hat.jfif"],
    id: "0987",
    sellerId: "ewio"
  },
  {
    id: "4242",
    title: "Drizzt mug",
    description: "Have a drink while reading your favorite fantasy novel",
    stock: 13,
    price: 25,
    images: ["./../uploads/drizztmug.jpg"],
    sellerId: "xcvb"
  }
];

let initialUsers = [
  {
    id: "ewio",
    name: "Jack Frost"
  },
  {
    id: "xcvb",
    name: "Hank Green"
  },
  {
    id: "123abc",
    name: "Judge Judy"
  },
  {
    id: "456def",
    name: "Dr. Phil"
  }
];

let initialSellers = [
  {
    id: "ewio"
  },
  {
    id: "xcvb"
  }
];

let initialReviewers = [
  {
    id: "123abc"
  },
  {
    id: "456def"
  }
];

let itemReviews = [
  {
    itemID: "0987",
    reviewString: "I like this item a lot. Much wow. Such special.",
    rating: 5,
    reviewerId: "456def"
  },
  {
    itemID: "4242",
    reviewString: " Much wow. Such special.",
    rating: 4,
    reviewerId: "123abc"
  },
  {
    itemID: "0987",
    reviewString: "Super duper.",
    rating: 3,
    reviewerId: "123abc"
  },
  {
    itemID: "artemis",
    reviewString: "60% of the time it works all the time :)",
    rating: 2,
    reviewerId: "123abc"
  }
];

export {
  initialItems,
  initialSellers,
  initialReviewers,
  itemReviews,
  initialUsers
};
