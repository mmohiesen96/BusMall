'use strict';
// Hiding the button 


document.getElementById('btn').style.visibility = 'hidden';

// getting elements 


let leftImage = document.getElementById('left-img');
let midImage = document.getElementById('mid-img');
let rightImage = document.getElementById('right-img');

//Counters and attempts
let maxAttempts = 25;
let attemptCounter = 0;

// indexing elements
let leftIndex;
let midIndex;
let rightIndex;
// Chart arrays
let namesArr = [];
let votesArr = [];
let shownArr = [];
// Constructor function

function Product(name, url) {
    this.name = name;
    this.url = url;
    this.percentage = 0;
    this.votes = 0;
    this.shown = 0;
    Product.allProducts.push(this);
    namesArr.push(this.name);
}
Product.allProducts = [];

// Product.prototype.percentages = function () {
//     if (this.shown > 0) {
//         this.percentage = (this.votes / this.shown) * 100;
//         this.percentage = Number.parseFloat(this.percentage).toFixed(2);
//     }
// }
// Initializing Products
new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('char', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');

// Random Number Generator
function random() {
    return (Math.floor(Math.random() * Product.allProducts.length));
}

// Rendering function 
let prevImages = [];
let c = 0;
function render() {
    //Generating random indexes .
    leftIndex = random();
    midIndex = random();
    rightIndex = random();

    // Checking if three images are not equal.
    while ((leftIndex === midIndex) || (rightIndex === midIndex) || (rightIndex === leftIndex) || (prevImages.includes(leftIndex)) || (prevImages.includes(rightIndex)) || (prevImages.includes(midIndex))) {
        leftIndex = random();
        midIndex = random();
        rightIndex = random();
    }
    prevImages = [];
    prevImages.push(leftIndex);
    prevImages.push(rightIndex);
    prevImages.push(midIndex);



    console.log(prevImages);
    leftImage.src = Product.allProducts[leftIndex].url;
    Product.allProducts[leftIndex].shown++;
    midImage.src = Product.allProducts[midIndex].url;
    Product.allProducts[midIndex].shown++;
    rightImage.src = Product.allProducts[rightIndex].url;
    Product.allProducts[rightIndex].shown++;
}

// Rendering

render();

// Getting the image container 
// Adding listener to the container

document.getElementById('img-container').addEventListener('click', generate);

// Listener function

function generate(event) {
    // Checking the user clicks an image

    if (event.target.id === 'img-container') {
        alert('click an image please');
    }

    else {
        if (attemptCounter < maxAttempts) {
            if (event.target.id === 'left-img') {
                Product.allProducts[leftIndex].votes++;
                render();
            }
            else if (event.target.id === 'mid-img') {
                Product.allProducts[midIndex].votes++;
                render();
            }
            else {
                Product.allProducts[rightIndex].votes++;
                render();
            }
            attemptCounter++;
            console.log(attemptCounter);
        }
        else {
            document.getElementById('btn').style = 'visible'
            document.getElementById('img-container').removeEventListener('click', generate);
        }

        setStorage();
    }
}



// Button handler

document.getElementById('btn').addEventListener('click', listRender);
// Rendering the Results
function listRender(event) {
    event.preventDefault();
    // Rendering percentages

    // for (let i = 0; i < Product.allProducts.length; i++) {
    //     Product.allProducts[i].percentages();
    // }

    // Results
    let parent = document.getElementById('results');
    for (let i = 0; i < Product.allProducts.length; i++) {
        let x = document.createElement('li');
        parent.appendChild(document.createElement('li')).textContent = `${Product.allProducts[i].name} was shown ${Product.allProducts[i].shown} times,and voted ${Product.allProducts[i].votes} times, with ${Product.allProducts[i].percentage}  %.`;
    }
    for (let i = 0; i < Product.allProducts.length; i++) {
        votesArr.push(Product.allProducts[i].votes);
        shownArr.push(Product.allProducts[i].shown);
    
    }
    chart();
    document.getElementById('btn').removeEventListener('click', listRender);
}


function setStorage() {

    let storage = JSON.stringify(Product.allProducts);
    console.log(storage)
    localStorage.setItem('Products', storage);
}


function getStorage() {

    let products = localStorage.getItem('Products');
    let objProducts = JSON.parse(products);
    if (objProducts !== null) {
        Product.allProducts = objProducts;
    }
    console.log(objProducts);

}


// Chart
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        type: 'bar',

        data: {
            labels: namesArr,

            datasets: [
                {
                    label: 'Products votes',
                    data: votesArr,
                    backgroundColor: [
                        'rgba(18, 110, 130,0.3)',
                    ],

                    borderWidth: 2
                },

                {
                    label: 'Products shown',
                    data: shownArr,
                    backgroundColor: [
                        'rgba(81, 196, 211,0.2)',
                    ],

                    borderWidth: 2
                }

            ]
        },
        options: {}
    });

}

getStorage();