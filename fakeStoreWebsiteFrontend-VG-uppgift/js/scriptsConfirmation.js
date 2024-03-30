window.onload = function() {

    let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

    let orderConfirmText = document.createElement('div');
    let ordernumber = document.createElement('b');
    let orderItems = document.createElement('div');
    let rowSpace = document.createElement('p');

    orderConfirmText.textContent = "Thank you for your order with order number: "
    ordernumber.textContent = orderNumberRNG();

    let row = document.querySelector('#orderConfirmation');

    row.appendChild(orderConfirmText);
    orderConfirmText.appendChild(ordernumber);
    row.appendChild(orderItems);
    row.appendChild(rowSpace);

// Skapa nya element för att visa produktinformation
let linkA = document.createElement('a');
let productImage = document.createElement('img');
let title = document.createElement('p');
let price = document.createElement('span');
let totalPrice = document.createElement('span');
let totalPriceTitle = document.createElement('p');
let totalPriceHead = document.createElement('hr');
let boldTotalPrice = document.createElement('b');

totalPriceTitle.style.fontWeight = "bold";
totalPrice.className = 'price';
totalPrice.style.color = "black";
totalPriceTitle.style.fontSize = "22px";
totalPriceTitle.style.marginBottom = "-1px";
totalPrice.style.fontSize = "16px";
title.style.marginLeft = "20px";
title.style.fontWeight = "bold";
title.style.fontSize = "14px";
price.setAttribute("class", "price");
linkA.setAttribute("href", "#");
productImage.setAttribute("src", selectedProduct.image,);
productImage.style.height = '30px';
productImage.style.width = '30px'; // inline css
productImage.style.objectFit = 'cover';
productImage.style.float = 'left';
productImage.style.marginRight = "10px";

// Ange textinnehållet för de nya elementen
title.textContent = selectedProduct.title;
price.textContent = '$' + selectedProduct.price;
totalPriceTitle.textContent = 'Total';
boldTotalPrice.textContent = '$' + selectedProduct.price;

// Lägg till de nya elementen i dokumentet
let row2 = document.querySelector('#start-list');
row2.appendChild(productImage);
row2.appendChild(title);
title.appendChild(linkA);
title.appendChild(price);
row2.appendChild(totalPriceHead);
row2.appendChild(totalPriceTitle);
totalPrice.appendChild(boldTotalPrice);
totalPriceTitle.appendChild(totalPrice);
};


function orderNumberRNG() {
        return Math.floor(Math.random() * (99999 - 1 + 1)) + 1;
}