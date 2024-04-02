//window.localStorage.clear();
let allProducts = JSON.parse (localStorage.allProductsJSON || '[]');
let row = document.querySelector ('#productLength');
row.textContent = allProducts.length;

function addToCart (product) {
  let existingProduct = allProducts.find (p => p.id === product.id);
  if (existingProduct) {
    // Om produkten redan finns i kundkorgen, öka kvantiteten
    existingProduct.quantity++;
  } else {
    let selectedProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: 1,
    };
    allProducts.push (selectedProduct);
  }
  console.log (allProducts); //LOGG
  localStorage.setItem ('allProductsJSON', JSON.stringify (allProducts));

  updateCartCount ();
  loadCart ();

  //FOR MOBILE VERSION
  let navbarToggler = document.querySelector ('.navbar-toggler');
  // Kontrollera om navbar-toggler är synlig
  if (window.getComputedStyle (navbarToggler).display !== 'none') {
    // Om den är synlig, trigga ett klick på den
    navbarToggler.click ();
    setTimeout (function () {
      navbarToggler.click ();
    }, 1000);
  }
  dropdownData.scrollTop = dropdownData.scrollHeight;
}

function loadCart () {
  if (allProducts.length > 0) {
    let dropdownData = document.querySelector ('#dropdownData');
    // Rensa dropdownData innan du lägger till nya produkter
    if (dropdownData) {
      dropdownData.innerHTML = '';

      console.log ('ifDropDown');

      let totalPrice = 0;

      allProducts.forEach (function (product) {
        let outerDiv = document.createElement ('div');
        let div = document.createElement ('div');
        let img = document.createElement ('img');
        let title = document.createElement ('h4');
        let price = document.createElement ('p');
        let closeButton = document.createElement ('img');
        let quantityInput = document.createElement ('input'); // Skapa en ny input för kvantitet
        let actionDiv = document.createElement ('div'); // Skapa en ny div för close-knappen och kvantitetsinputen

        outerDiv.className = 'outer-div col-12 d-flex';
        outerDiv.className = 'outer-div col-12';
        div.className = 'dropdown-item col-10 d-fixed';
        img.src = product.image;
        title.textContent = product.title.length > 35
          ? product.title.substring (0, 35) + '...'
          : product.title;
        price.textContent = '$' + product.price;
        closeButton.src = 'assets/close.svg'; // Ange källan till din SVG-ikon
        closeButton.className = 'close-button';
        closeButton.onclick = removeItem (product);
        quantityInput.type = 'number'; // Sätt input-typen till number
        quantityInput.min = '0'; // Sätt minsta tillåtna värde
        quantityInput.value = product.quantity; // Sätt ett initialt värde
        quantityInput.className = 'quantity-input'; // Lägg till col-1 till kvantitetsinputen
        actionDiv.className = 'action-div d-flex flex-column align-items-end';

        quantityInput.onchange = function () {
          // Uppdatera kvantiteten av produkten i allProducts array
          product.quantity = parseInt (this.value);
          // Uppdatera localStorage
          localStorage.setItem (
            'allProductsJSON',
            JSON.stringify (allProducts)
          );
          // Uppdatera kundkorgen
          updateCartCount();
          loadCart ();
          if (quantityInput.value < 1) {
            removeItem (product) ();
          }
        };

        img.style.height = '30px';
        img.style.width = '30px';
        title.style.fontSize = '10px';
        price.style.fontSize = '10px';

        div.appendChild (img);
        div.appendChild (title);
        div.appendChild (price);
        actionDiv.appendChild (quantityInput); // Lägg till kvantitetsinputen till actionDiv
        actionDiv.appendChild (closeButton); // Lägg till "X"-knappen till actionDiv
        outerDiv.appendChild (div);
        outerDiv.appendChild (actionDiv);
        dropdownData.appendChild (outerDiv);

        totalPrice += product.price * product.quantity;
      });
      let totalElement = document.createElement ('li');
      totalElement.textContent = 'Total: $' + totalPrice.toFixed (2);
      totalElement.style.fontWeight = 'bold';
      totalElement.style.marginLeft = '10px';
      dropdownData.appendChild(totalElement);
    }
  }
}

function toggleCart () {
  let dropdownData = document.querySelector ('#dropdownData');
  console.log (dropdownData);
  if (allProducts.length > 0 && dropdownData.style.display !== 'block') {
    console.log ('Toggle Cart');
    dropdownData.style.display = 'block';
  } else {
    dropdownData.style.display = 'none';
    console.log ('Hide Cart');
  }
}

let cartButton = document.querySelector ('#cartDropdown');
/*cartButton.addEventListener('click', function(event) {
    toggleCart();
    event.stopPropagation();  // Förhindra eventet från att bubbla upp till dokumentet
});*/
function updateCartCount() {
    let totalQuantity = allProducts.reduce((sum, product) => sum + product.quantity, 0);
    let row = document.querySelector('#productLength');
    row.textContent = totalQuantity;
}

$ (document).click (function () {
  toggleCart ();
});

function removeItem (product) {
  return function () {
    let index = allProducts.indexOf (product);
    allProducts.splice (index, 1);
    localStorage.setItem ('allProductsJSON', JSON.stringify (allProducts));
    updateCartCount ();
    loadCart ();
    toggleCart ();
  };
}

window.addEventListener ('load', function () {
  loadCart();
});
