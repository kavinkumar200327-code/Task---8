let allProducts = [];
let filteredProducts = [];

let container = document.querySelector("#Products");
let loader = document.querySelector("#loader");
let error = document.querySelector("#error");

function getproducts() {
    loader.style.display = "block";

    fetch("https://fakestoreapi.com/products")
    .then(result => result.json())
    .then(data => {
        allProducts = data;
        filteredProducts = data;

        displayProducts(data);

        loader.style.display = "none";
    })
    .catch(err => {
        loader.style.display = "none";

        error.textContent = "Error Occurs";
        error.style.color = "red";
    });
}
function displayProducts(Products){
    container.innerHTML = " ";
    Products.forEach(p => {
        let card = document.createElement("div");
        card.className = "card"
        card.innerHTML = `<img src="${p.image}">
            <h3>${p.title.substring(0,20)}...</h3>
            <p>${p.description.substring(0,60)}...</p>
            <button>₹${p.price}</button>
            <br><br>
            <button onclick="viewDetails(${p.id})">View More</button>
        `;

        container.appendChild(card);
    });
}

document.getElementById("search").addEventListener("input",(e) => {
    let value = e.target.value.toLowerCase();
    let result = filteredProducts.filter(p => p.title.toLowerCase().includes(value));

    displayProducts(result);
});

document.querySelector("#Category").addEventListener("change",(e) =>{
    let value = e.target.value;
    if(value === "all")
    {
        filteredProducts = allProducts;
    }
    else
    {
        filteredProducts = allProducts.filter (p => p.category === value);
    }

    displayProducts(filteredProducts)
});

function sortLow(){
    let sorted = [...filteredProducts].sort((a,b) => a.price - b.price);
    displayProducts(sorted)
};

function sortHigh(){
    let sorted = [...filteredProducts].sort((a,b) => b.price - a.price);
    displayProducts(sorted)
};

function viewDetails(id){
    let product = allProducts.find (p => p.id === id);
    document.querySelector("#modal").style.display = "block";

    document.querySelector("#modalBody").innerHTML =
        `<h2>${product.title}</h2>
        <img src="${product.image}" width="150">
        <p>${product.description}</p>
        <h3>₹${product.price}</h3>
        <p>Category: ${product.category}</p>`;
}

function closeModal(){
    document.querySelector("#modal").style.display = "none"
}

getproducts();