window.onload = function() {
    // Hämta den valda produkten från localStorage
    let selectedProduct = JSON.parse(localStorage.getItem('selectedProduct'));

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
    let row = document.querySelector('#start-list');
    row.appendChild(productImage);
    row.appendChild(title);
    title.appendChild(linkA);
    title.appendChild(price);
    row.appendChild(totalPriceHead);
    row.appendChild(totalPriceTitle);
    totalPrice.appendChild(boldTotalPrice);
    totalPriceTitle.appendChild(totalPrice);
};
