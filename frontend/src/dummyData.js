//dummy data for testing. Took it from marketplace...

let initialItems = [
  {
    description: "Nice boats. 50% off. wow.",
    price: 100000,
    image: "./../uploads/boat.gif",
    stock: 1,
    id: "asewq",
    sellerId: "ewio"
  },
  {
    id: "wqwasq",
    description: "Lawn chairs",
    price: 50,
    stock: 5,
    image: "./../uploads/lawnchair.jpg",
    sellerId: "xcvb"
  },
  {
    description: "Shirt",
    stock: 42,
    price: 10000,
    image: "./../uploads/shirt.png",
    id: "qwer",
    sellerId: "ewio"
  },
  {
    id: "123rtyh",
    stock: 13,
    description: "Shoes",
    price: 50,
    image: "./../uploads/shoes.jfif",
    sellerId: "xcvb"
  },
  {
    description: "hat",
    stock: 21,
    price: 10,
    image: "./../uploads/hat.jpg",
    id: "765hf",
    sellerId: "ewio"
  },
  {
    id: "5tyhgr6",
    stock: 11,
    description: "coffe mug",
    price: 15,
    image: "./../uploads/coffeemug.jpg",
    sellerId: "xcvb"
  },
  {
    description: "Galaxy S10",
    price: 1000,
    stock: 3,
    image: "./../uploads/gs10.png",
    id: "765y",
    sellerId: "ewio"
  },
  {
    id: "hjhjhgh",
    stock: 17,
    description: "Katana Set",
    price: 800,
    image: "./../uploads/katanaset.jpg",
    sellerId: "xcvb"
  },
  {
    description: "Drizzt Shirt",
    price: 40,
    stock: 71,
    image: "./../uploads/drizztshirt.jpg",
    id: "artemis",
    sellerId: "ewio"
  },
  {
    id: "567",
    description: "Helmet",
    price: 50,
    stock: 1,
    image: "./../uploads/helmet.jpg",
    sellerId: "xcvb"
  },
  {
    description: "beanie hat",
    stock: 99,
    price: 10,
    image: "./../uploads/hat.jfif",
    id: "0987",
    sellerId: "ewio"
  },
  {
    id: "4242",
    description: "Drizzt mug",
    stock: 13,
    price: 25,
    image: "./../uploads/drizztmug.jpg",
    sellerId: "xcvb"
  }
];

let initialSellers = [
  {
    id: "ewio",
    name: "Jack Frost",
    rating: "5 stars"
  },
  {
    id: "xcvb",
    name: "Hank Green",
    rating: "2 stars"
  }
];

let initialReviewers = [
  {
    id: "123abc",
    name: "Judge Judy",
    rating: "5 stars"
  },
  {
    id: "456def",
    name: "Dr. Phil",
    rating: "5 stars"
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
    reviewerId: "456def"
  },
  {
    itemID: "artemis",
    reviewString: "60% of the time it works aall the time :)",
    rating: 2,
    reviewerId: "123abc"
  }
];

export { initialItems, initialSellers, initialReviewers, itemReviews };
