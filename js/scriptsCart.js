window.addEventListener('load', function() {
    // Hämta alla produkter från localStorage
    let allProducts = JSON.parse(localStorage.getItem('allProductsJSON'));

    // Skapa ett element för att visa den totala summan
    let totalPrice = 0;

    // Iterera över alla produkter
    allProducts.forEach(function(product) {
        // Skapa nya element för att visa produktinformation
        let linkA = document.createElement('a');
        let productImage = document.createElement('img');
        let title = document.createElement('p');
        let price = document.createElement('span');

        linkA.setAttribute("href", "#");
        productImage.setAttribute("src", product.image);
        productImage.style.height = '30px';
        productImage.style.width = '30px'; 
        productImage.style.objectFit = 'cover';
        productImage.style.float = 'left';
        productImage.style.marginRight = "10px";

        // Ange textinnehållet för de nya elementen
        title.textContent = product.title;
        price.textContent = '$' + product.price;

        // Lägg till de nya elementen i dokumentet
        let row = document.querySelector('#start-list');
        row.appendChild(productImage);
        row.appendChild(title);
        title.appendChild(linkA);
        title.appendChild(price);

        // Lägg till produktens pris till den totala summan
        totalPrice += product.price;
    });

    // Skapa nya element för att visa den totala summan
    let totalPriceElement = document.createElement('p');
    let boldTotalPrice = document.createElement('b');

    totalPriceElement.style.fontWeight = "bold";
    totalPriceElement.style.fontSize = "22px";
    totalPriceElement.style.marginBottom = "-1px";
    totalPriceElement.textContent = 'Total: ';

    boldTotalPrice.textContent = '$' + totalPrice.toFixed(2);
    boldTotalPrice.style.fontSize = "16px";
    boldTotalPrice.style.color = "black";

    // Lägg till de nya elementen i dokumentet
    let row = document.querySelector('#product-list');
    row.appendChild(totalPriceElement);
    totalPriceElement.appendChild(boldTotalPrice);
});