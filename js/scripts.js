//window.localStorage.clear();
let allProducts = JSON.parse (localStorage.allProductsJSON || '[]');
let row = document.querySelector ('#productLength');
row.textContent = allProducts.length;

function addToCart (product, quantity) {
  let existingProduct = allProducts.find (p => p.id === product.id);
  if (existingProduct) {
    // Om produkten redan finns i kundkorgen, öka kvantiteten
    existingProduct.quantity += quantity;
  } else {
    let selectedProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: quantity,
    };
    allProducts.push (selectedProduct);
  }
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
    if (dropdownData) {
      // Rensa dropdownData innan du lägger till nya produkter
      dropdownData.innerHTML = '';

      let totalPrice = 0;

      allProducts.forEach (function (product) {
        let outerDiv = document.createElement ('div');
        let div = document.createElement ('div');
        let img = document.createElement ('img');
        let title = document.createElement ('h4');
        let price = document.createElement ('p');
        let closeButton = document.createElement ('img');
        let quantityInput = document.createElement ('input');
        let actionDiv = document.createElement ('div');

        outerDiv.className = 'outer-div col-12 d-flex';
        outerDiv.className = 'outer-div col-12';
        div.className = 'dropdown-item col-10 d-fixed';
        img.src = product.image;
        title.textContent = product.title.length > 35
          ? product.title.substring (0, 35) + '...'
          : product.title;
        price.textContent =
          '$' +
          product.price +
          '    x ' +
          product.quantity +
          '  =  $' +
          product.quantity * product.price;
        closeButton.src = 'assets/close.svg';
        closeButton.className = 'close-button';
        closeButton.onclick = removeItem (product);
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = product.quantity;
        quantityInput.className = 'quantity-input';
        actionDiv.className = 'action-div d-flex flex-column align-items-end';

        quantityInput.onchange = function () {
          // Uppdatera kvantiteten av produkten i allProducts array
          product.quantity = parseInt (this.value);
          if (quantityInput.value === 0) {
            removeItem (product);
          }
          // Uppdatera localStorage
          localStorage.setItem (
            'allProductsJSON',
            JSON.stringify (allProducts)
          );
          // Uppdatera kundkorgen
          updateCartCount ();
          loadCart ();
        };

        img.style.height = '30px';
        img.style.width = '30px';
        title.style.fontSize = '10px';
        price.style.fontSize = '10px';

        div.appendChild (img);
        div.appendChild (title);
        div.appendChild (price);
        actionDiv.appendChild (quantityInput);
        actionDiv.appendChild (closeButton);
        outerDiv.appendChild (div);
        outerDiv.appendChild (actionDiv);
        dropdownData.appendChild (outerDiv);

        totalPrice += product.price * product.quantity;
      });

      let checkOut = document.createElement ('button');
      let removeAllItems = document.createElement ('button');
      let innerDiv = document.createElement ('div');
      let checkOutDiv = document.createElement ('div');

      innerDiv.style.display = 'flex';
      innerDiv.style.justifyContent = 'space-between';

      checkOut.textContent = 'Checkout';
      checkOut.className = 'btn btn-outline-dark mt-auto col-8';
      checkOut.style.fontSize = '1em';
      checkOut.style.marginLeft = '40px';
      checkOutDiv.style.marginTop = '20px';

      checkOutDiv.appendChild (checkOut);

      checkOut.addEventListener ('click', function (event) {
        event.preventDefault ();
        openCheckout ();
        event.stopPropagation ();
      });

      removeAllItems.textContent = 'Empty cart';
      removeAllItems.style.scale = '0.65';
      removeAllItems.className = 'btn btn-secondary btn-sm col-6';
      removeAllItems.style.marginLeft = '85px';

      removeAllItems.addEventListener ('click', function (event) {
        event.preventDefault ();
        console.log ('removeAllItems');
        localStorage.clear();
        allProducts = [];
        updateCartCount ();
        loadCart ();
        toggleCart ();
        toggleCart ();

        event.stopPropagation ();
      });

      let totalPriceElement = document.createElement ('li');
      totalPriceElement.textContent = 'Total: $' + totalPrice.toFixed (2);
      totalPriceElement.style.fontWeight = 'bold';
      totalPriceElement.style.marginLeft = '20px';
      totalPriceElement.style.marginTop = '15px';

      checkOutDiv.appendChild(removeAllItems);
      innerDiv.appendChild (totalPriceElement);
      innerDiv.appendChild (checkOutDiv);


      dropdownData.appendChild (innerDiv);
    }
  }
}

function toggleCart () {
  let dropdownData = document.querySelector ('#dropdownData');
  if (allProducts.length > 0 && dropdownData.style.display !== 'block') {
    dropdownData.style.display = 'block';
    dropdownData.scrollTop = dropdownData.scrollHeight;
  } else {
    dropdownData.style.display = 'none';
  }
}

let cartButton = document.querySelector ('#cartDropdown');
cartButton.addEventListener ('click', function (event) {
  toggleCart ();
  event.stopPropagation (); // Förhindra eventet från att bubbla upp till dokumentet
});

function updateCartCount () {
  let totalQuantity = allProducts.reduce (
    (sum, product) => sum + product.quantity,
    0
  );
  let row = document.querySelector ('#productLength');
  row.textContent = totalQuantity;
}

//$ (document).click (function () {});

function removeItem (product) {
  return function () {
    let index = allProducts.indexOf (product);
    allProducts.splice (index, 1);
    localStorage.setItem ('allProductsJSON', JSON.stringify (allProducts));
    updateCartCount ();
    loadCart ();
    toggleCart ();
    toggleCart ();
    if (product.quantity >= 1) {
      toggleCart ();
      toggleCart ();
    }
  };
}

function openCheckout () {
  window.open ('cart.html', '_self');
}

window.addEventListener ('load', function () {
  loadCart ();
});
