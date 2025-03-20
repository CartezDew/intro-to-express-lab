import express from "express";
// Initialize express server
const app = express();

// 1. Be Polite, Greet the User

app.get("/greet/:name", (req, res) => {
    const names = [
      {id: 1, name: "Cartez"},
      {id: 2, name: "Theresa"},
      {id: 3, name: "Marcus"},
      {id: 4, name: "Katie"},
    ]

    let person = names.find((el) => {
      return el.name === req.params.name;
    })
  
    res.send(`<h1>What a delight it is to see you once more, ${person.name}</h1>`)
  })

 // 2. Rolling the Dice
  app.get("/roll/:number", (req, res) => {
    const { number } = req.params;
    const num = Number(number);


  if (isNaN(num) ) {
    return res.send("<h1>You must specify a number.</h1>");
  }
  res.send(`<h1>You rolled a ${number}.</h1>`);
});


// 3. I Want THAT One!

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];

  app.get("/collectibles/:index", (req, res) => {
    const { index } = req.params;
    const itemIndex = Number(index);
  
    if (isNaN(itemIndex) || itemIndex < 0 || itemIndex >= collectibles.length) {
      return res.send("<h1>This item is not yet in stock. Check back soon!</h1>");
    }
  
    const item = collectibles[itemIndex];
  
    res.send(`<h1>So, you want the ${item.name}? For ${item.price}, it can be yours!</h1>`);
  });


app.listen(3000, () => {
    console.log("Express app is running on port 3000... test");
  });

  
//4. Filter Shoes by Query Parameters
  

app.get('/hello', (req, res) => {
  res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});

const shoes = [
  { name: "Birkenstocks", price: 50, type: "sandal" },
  { name: "Air Jordans", price: 500, type: "sneaker" },
  { name: "Air Mahomeses", price: 501, type: "sneaker" },
  { name: "Utility Boots", price: 20, type: "boot" },
  { name: "Velcro Sandals", price: 15, type: "sandal" },
  { name: "Jet Boots", price: 1000, type: "boot" },
  { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes;

  // Get query parameters
  const minPrice = parseFloat(req.query["min-price"]);
  const maxPrice = parseFloat(req.query["max-price"]);
  const type = req.query.type;

  // Filter by min-price
  if (!isNaN(minPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
  }

  // Filter by max-price
  if (!isNaN(maxPrice)) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
  }

  // Filter by type
  if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type.toLowerCase() === type.toLowerCase());
  }

  res.json(filteredShoes);
});
