import React from "react";

const ChartCard = ({ children, title, subTitle }) => {
  return (
    <div className="card-charts">
      <div className="total-revenue">
        <div className="chart-head">
          <h3>{title}</h3>
          {subTitle && <p>{subTitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
};

export default ChartCard;

// "products": [
//     {
//       "category": "kits",
//       "type": "goalkeeper kit",
//       "gender": "Kids",
//       "price": "2300",
//       "quantity": "2",
//       "title": "PEDRI | UCL Men's home jersey 25/26 - Player's Edition",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "23e",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits4Sub1.jpg",
//         "/img/kits-img/kits4sub4.jpg",
//         "/img/kits-img/kits4sub2.jpg",
//         "/img/kits-img/kits4sub3.jpg",
//         "/img/kits-img/kits4sub5.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "Training Kit",
//       "gender": "men",
//       "price": "2000",
//       "quantity": 5,
//       "title": "UCL Men's home jersey 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p01",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits1.jpg",
//         "/img/kits-img/kitsSub1.jpg",
//         "/img/kits-img/kits1sub2.jpg",
//         "/img/kits-img/kits1sub3.jpg",
//         "/img/kits-img/kits1sub4.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "away kit",
//       "gender": "men",
//       "price": "6600",
//       "quantity": 4,
//       "title": "FC Barcelona home short 25/26",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p02",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits2sub1.jpg",
//         "/img/kits-img/kits2sub2.jpg",
//         "/img/kits-img/kits2sub3.jpg",
//         "/img/kits-img/kits2sub4.jpg",
//         "/img/kits-img/kits2sub5.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "third kit",
//       "gender": "women",
//       "price": "2700",
//       "quantity": 6,
//       "title": "FC Barcelona home short 25/26 - Women",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p03",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits3sub1.jpg",
//         "/img/kits-img/kits3sub2.jpg",
//         "/img/kits-img/kits3sub3.jpg",
//         "/img/kits-img/kits3sub4.jpg",
//         "/img/kits-img/kits3sub5.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "goalkeeper kit",
//       "gender": "kids",
//       "price": "10500",
//       "quantity": 2,
//       "title": "UCL Junior home jersey 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "STADIUM COLLECTION",
//       "id": "p05",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits6sub1.jpg",
//         "/img/kits-img/kits6sub2.jpg",
//         "/img/kits-img/kits6sub3.jpg",
//         "/img/kits-img/kits6sub4.jpg",
//         "/img/kits-img/kits6sub5.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "Home Kit",
//       "gender": "kids",
//       "price": "8500",
//       "quantity": 5,
//       "title": "Barcelona Training Jersey 25/26",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p06",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits7sub1.jpg",
//         "/img/kits-img/kits7sub2.jpg",
//         "/img/kits-img/kits7sub3.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "training kit",
//       "gender": "kids",
//       "price": "9150",
//       "quantity": 0,
//       "title": "Younger kids home kit 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p07",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits8sub1.png",
//         "/img/kits-img/kitsSub1.jpg",
//         "/img/kits-img/kits8sub3.jpg",
//         "/img/kits-img/kits8sub4.jpg",
//         "/img/kits-img/kits8sub2.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "fan kit",
//       "gender": "men",
//       "price": "39300",
//       "quantity": 5,
//       "title": "Men’s Shirt Lamine Yamal 2025 FC Barcelona – Kopa Trophy Edition",
//       "collection": "Match Collection",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p08",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits9sub1.jpg",
//         "/img/kits-img/kits4Sub1.jpg",
//         "/img/kits-img/kits4sub3.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "fan kit",
//       "gender": "women",
//       "price": "19600",
//       "quantity": 10,
//       "collection": "STADIUM COLLECTION",
//       "title": "UCL Women's home jersey 25/26 FC Barcelona - Player's Edition",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "p09",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits10sub1.jpg",
//         "/img/kits-img/kits10sub2.jpg",
//         "/img/kits-img/kits10sub3.jpg",
//         "/img/kits-img/kits10sub4.jpg",
//         "/img/kits-img/kits4sub3.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "fan kit",
//       "gender": "men",
//       "price": "2100",
//       "quantity": 5,
//       "title": "Modernist FC Barcelona Polo - Oversize",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Retro Collection",
//       "id": "p10",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits11sub1-removebg-preview.png",
//         "/img/kits-img/kits11sub2.jpg",
//         "/img/kits-img/kits11sub3.jpg",
//         "/img/kits-img/kits11sub4.jpg",
//         "/img/kits-img/kits11sub5.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "fan kit",
//       "gender": "women",
//       "price": "2650",
//       "quantity": 15,
//       "title": "UCL Women's fourth jersey 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "PLAYER COLLECTION",
//       "id": "p11",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits12sub2.jpg",
//         "/img/kits-img/kits12sub3.jpg",
//         "/img/kits-img/kits12sub1.jpg",
//         "/img/kits-img/kits12sub4.jpg",
//         "/img/kits-img/kits12sub5.jpg"
//       ]
//     },
//     {
//       "category": "kits",
//       "type": "fan kit",
//       "gender": "men",
//       "price": "10150",
//       "quantity": 15,
//       "title": "FC Barcelona home short 25/26 - Player's Edition",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "PLAYER COLLECTION",
//       "id": "q11",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits14Sub1.jpg",
//         "/img/kits-img/kits14sub2.jpg",
//         "/img/kits-img/kits14sub3.jpg",
//         "/img/kits-img/kits14sub4.jpg",
//         "/img/kits-img/kits14sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Jackets",
//       "gender": "women",
//       "price": "4000",
//       "quantity": 5,
//       "title": "UCL Women's home jersey 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "a2",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel1sub1.jpg",
//         "/img/Apparel-Img/apparel1sub2.jpg",
//         "/img/Apparel-Img/apparel1sub3.jpg",
//         "/img/Apparel-Img/apparel1sub4.jpg",
//         "/img/Apparel-Img/apparel1sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Jackets",
//       "gender": "men",
//       "price": "6600",
//       "quantity": 4,
//       "title": "FC Barcelona home short 25/26",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "a3",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel2sub1-removebg-preview.png",
//         "/img/Apparel-Img/apparel2sub2.jpg",
//         "/img/Apparel-Img/apparel2sub3.jpg",
//         "/img/Apparel-Img/apparel2sub4.jpg",
//         "/img/Apparel-Img/apparel2sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Jackets",
//       "gender": "men",
//       "price": "2700",
//       "quantity": 6,
//       "title": "Parka Jacket Nike FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "a4",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel3sub1.png",
//         "/img/Apparel-Img/apparel3sub2.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Jackets",
//       "gender": "women",
//       "price": "10500",
//       "quantity": 3,
//       "title": "Windrunner Barça Nike - Women",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "a5",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel4sub1.jpg",
//         "/img/Apparel-Img/apparel4sub2.jpg",
//         "/img/Apparel-Img/apparel4sub3.jpg",
//         "/img/Apparel-Img/apparel4sub4.jpg",
//         "/img/Apparel-Img/apparel4sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Hoodie",
//       "gender": "men",
//       "price": "11800",
//       "quantity": 2,
//       "title": "Hoodie Zip Black Organic Goals",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "STADIUM COLLECTION",
//       "id": "a6",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel5sub1.png",
//         "/img/Apparel-Img/apparel5sub2.jpg",
//         "/img/Apparel-Img/apparel5sub3.jpg",
//         "/img/Apparel-Img/apparel5sub4.jpg",
//         "/img/Apparel-Img/apparel5sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Hoodie",
//       "gender": "kids",
//       "price": "7900",
//       "quantity": 5,
//       "title": "Hoodie Zip Navy Barça Organic Goals - Junior",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Organic Edit Collection",
//       "id": "a7",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel6sub1.png",
//         "/img/Apparel-Img/apparel6sub2.jpg",
//         "/img/Apparel-Img/apparel6sub3.jpg",
//         "/img/Apparel-Img/apparel6sub4.jpg",
//         "/img/Apparel-Img/apparel6sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Hoodie",
//       "gender": "women",
//       "price": "11800",
//       "quantity": 3,
//       "title": "Hoodie Grey Barça Organic Goals - Women",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Organic Edit Collection",
//       "id": "a8",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel7sub1.png",
//         "/img/Apparel-Img/apparel7sub2.jpg",
//         "/img/Apparel-Img/apparel7sub3.jpg",
//         "/img/Apparel-Img/apparel7sub4.jpg",
//         "/img/Apparel-Img/apparel7sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Hoodie",
//       "gender": "women",
//       "price": "9800",
//       "quantity": 5,
//       "title": "Women’s Shirt Lamine Yamal 2025 FC Barcelona – Kopa Trophy Edition",
//       "collection": "Match Collection",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "a9",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel8sub1.jpg",
//         "/img/Apparel-Img/apparel8sub2.jpg",
//         "/img/Apparel-Img/apparel8sub3.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "Hoodie",
//       "gender": "men",
//       "price": "9600",
//       "quantity": 10,
//       "collection": "STADIUM COLLECTION",
//       "title": "Sweatshirt blue Barça Cruyff ",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "id": "a10",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel9sub5-removebg-preview.png",
//         "/img/Apparel-Img/apparel9sub3.jpg",
//         "/img/Apparel-Img/apparel9sub1.jpg",
//         "/img/Apparel-Img/apparel9sub2.jpg",
//         "/img/Apparel-Img/apparel9sub4.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "fan kit",
//       "gender": "men",
//       "price": "2100",
//       "quantity": 5,
//       "title": "Modernist FC Barcelona Polo - Oversize",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Retro Collection",
//       "id": "a11",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel11sub1.jpg",
//         "/img/Apparel-Img/apparel11sub2.jpg",
//         "/img/Apparel-Img/apparel11sub3.jpg",
//         "/img/Apparel-Img/apparel11sub4.jpg"
//       ]
//     },
//     {
//       "category": "newEra",
//       "type": "fan kit",
//       "gender": "women",
//       "price": "2650",
//       "quantity": 15,
//       "title": "UCL Women's fourth jersey 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "PLAYER COLLECTION",
//       "id": "p12",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/kits-img/kits12sub2.jpg",
//         "/img/kits-img/kits12sub3.jpg",
//         "/img/kits-img/kits12sub1.jpg",
//         "/img/kits-img/kits12sub4.jpg",
//         "/img/kits-img/kits12sub5.jpg"
//       ]
//     },
//     {
//       "category": "Apparel",
//       "type": "T-Shirts", 
//       "gender": "kids", 
//       "price": "3800",
//       "quantity": 15, 
//       "title": "Tee Junior Barça Nike grey",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Retro Collection",
//       "id": "5111",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel12sub2.jpg",
//         "/img/Apparel-Img/apparel12sub1.jpg",
//         "/img/Apparel-Img/apparel12sub3.jpg",
//         "/img/Apparel-Img/apparel12sub4.jpg",
//         "/img/Apparel-Img/apparel12sub5.jpg"
//       ]
//     },
//      {
//       "category": "Apparel",
//       "type": "T-Shirts", 
//       "gender": "kids", 
//       "price": "3800",
//       "quantity": 15, 
//       "title": "T-shirt Junior Navy Barça Organic Goals",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Organic Edit Collection",
//       "id": "901",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel13sub1-removebg-preview.png",
//         "/img/Apparel-Img/apparel13sub2.jpg",
//         "/img/Apparel-Img/apparel13sub3.jpg",
//         "/img/Apparel-Img/apparel13sub4.jpg",
//         "/img/Apparel-Img/apparel13sub5.jpg"
//       ]
//     },
//      {
//       "category": "Apparel",
//       "type": "T-Shirts", 
//       "gender": "men", 
//       "price": "3800",
//       "quantity": 15, 
//       "title": "T-shirt Black Barça Organic Goals",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Organic Edit Collection",
//       "id": "9",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel14sub1.jpg",
//         "/img/Apparel-Img/apparel14sub2.jpg",
//         "/img/Apparel-Img/apparel14sub3.jpg",
//         "/img/Apparel-Img/apparel14sub4.jpg",
//         "/img/Apparel-Img/apparel14sub5.jpg"
//       ]
//     },
//      {
//       "category": "Apparel",
//       "type": "Pants", 
//       "gender": "men", 
//       "price": "3800",
//       "quantity": 15, 
//       "title": "Pants Black Barça Organic Goals",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "Organic Edit Collection",
//       "id": "227",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel15sub1.png",
//         "/img/Apparel-Img/apparel15sub2.jpg",
//         "/img/Apparel-Img/apparel15sub3.jpg",
//         "/img/Apparel-Img/apparel15sub4.jpg",
//         "/img/Apparel-Img/apparel15sub5.jpg"
//       ]
//     },
//      {
//       "category": "kits",
//       "type": "away kit", 
//       "gender": "women", 
//       "price": "3800",
//       "quantity": 15, 
//       "title": "UCL Women's home jersey 25/26 FC Barcelona",
//       "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//       "collection": "STADIUM COLLECTION",
//       "id": "7",
//       "sizes": [
//         "S",
//         "M",
//         "L",
//         "XL"
//       ],
//       "images": [
//         "/img/Apparel-Img/apparel16sub1.jpg",
//         "/img/Apparel-Img/apparel16sub2.jpg",
//         "/img/Apparel-Img/apparel16sub3.jpg",
//         "/img/Apparel-Img/apparel16sub4.jpg",
//         "/img/Apparel-Img/apparel16sub5.jpg"
//       ]
//     }
//   ]