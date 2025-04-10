const wrapper = document.querySelector(".sliderWrapper")
const cartQuantity = document.querySelector('.cartQuantity');

const menuItems = document.querySelectorAll(".menuItem")


const products = [
    {
      id: 1,
      title: "Air Force",
      price: 119,
      colors: [
        {
          code: "black",
          img: "./images/air.png",
        },
        {
          code: "white",
          img: "./images/air2.png",
        },
      ],
    },
    {
      id: 2,
      title: "Air Jordan",
      price: 159,
      colors: [
        {
          code: "lightgray",
          img: "./images/jordan.png",
        },
        {
          code: "green",
          img: "./images/air3.jpg",
        },
      ],
    },
    {
      id: 3,
      title: "Blazer",
      price: 129,
      colors: [
        {
          code: "lightgray",
          img: "./images/blazer.png",
        },
        {
          code: "green",
          img: "./images/blazer2.png",
        },
      ],
    },
    {
      id: 4,
      title: "Crater",
      price: 139,
      colors: [
        {
          code: "black",
          img: "./images/crater.png",
        },
        {
          code: "lightgray",
          img: "./images/crater2.png",
        },
      ],
    },
    {
      id: 5,
      title: "Hippie",
      price: 149,
      colors: [
        {
          code: "gray",
          img: "./images/hippie.png",
        },
        {
          code: "black",
          img: "./images/hippie2.png",
        },
      ],
    },
  ];

  let chosenProduct = products[0]

  const currentProductImg = document.querySelector(".productImg");
  const currentProductTitle = document.querySelector(".productTitle");
  const currentProductPrice = document.querySelector(".productPrice");
  const currentProductColors = document.querySelectorAll(".color");
  const currentProductSizes = document.querySelectorAll(".size");



menuItems.forEach((item,index)=>{
    item.addEventListener("click", ()=>{
        // change the current slide
        console.log("You clicked!" + index);
        wrapper.style.transform= `translateX(${-100 * index}vw)`
        //change the chosen product
        chosenProduct= products[index]

        //change text of current product
        currentProductTitle.textContent= chosenProduct.title
        currentProductPrice.textContent= "$" + chosenProduct.price
        currentProductImg.src = chosenProduct.colors[0].img

        //assigning new colors
        currentProductColors.forEach((color,index)=>{
            color.style.backgroundColor = chosenProduct.colors[index].code;
        })

        


    });
});


currentProductColors.forEach((color,index)=>{
    color.addEventListener("click", ()=>{
        currentProductImg.src = chosenProduct.colors[index].img
    })
}) 

currentProductSizes.forEach((size,index)=>{
    size.addEventListener("click", ()=>{
        currentProductSizes.forEach((size)=>{
            size.style.backgroundColor ="white"
            size.style.color = "black"
        })
        size.style.backgroundColor ="black"
            size.style.color ="white"
    })
})


const productButton = document.querySelector(".productButton");
const cartButton = document.querySelector(".cartButton")
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");



productButton.addEventListener(("click"), ()=>{
    payment.style.display = "flex"
})

close.addEventListener(("click"),()=>{
    payment.style.display="none"
})


// trial

const sidebar = document.querySelector('.sidebar');
const openSidebarButton = document.querySelector('.cartIcon');

// const closeSidebarButton = document.querySelector('.closeSidebar');
const closeSidebarFooterButton = document.querySelector('.closeSidebarFooter');
const checkoutButton = document.querySelector('.checkoutButton');
const cartItemsContainer = document.getElementById('cartItemsContainer');

let cartItems = [];

// Open the sidebar
openSidebarButton.addEventListener('click', () => {
    sidebar.classList.add('open');
    renderCartItems();
});

cartButton.addEventListener('click', () => {
  sidebar.classList.add('open');
  renderCartItems();
});
checkoutButton.addEventListener(("click"), ()=>{
     payment.style.display = "flex"
 })
  


// Close the sidebar
// closeSidebarButton.addEventListener('click', () => {
//     sidebar.classList.remove('open');
// });

// Close sidebar footer button
closeSidebarFooterButton.addEventListener('click', () => {
    sidebar.classList.remove('open');
});


function renderCartItems() {
  cartItemsContainer.innerHTML = '';
  let totalQuantity = 0; 
  
  cartItems.forEach((item, index) => {
      const cartItemElement = document.createElement('div');
      cartItemElement.classList.add('cartItem');
      cartItemElement.innerHTML = `
          <img src="${item.img}" alt="${item.title}">
          <div class="cartItemDetails">
              <div class="cartItemTitle">${item.title}</div>
              <div class="cartItemPrice">$${item.price}</div>
              
              <div class="cartItemQuantity">
                  <button class="quantity-btn decrement" min="0" data-index="${index}">-</button>
                  <span class="quantity-value">${item.quantity}</span>
                  <button class="quantity-btn increment" data-index="${index}">+</button>
              </div>
          </div>
      `;
      cartItemsContainer.appendChild(cartItemElement);
      totalQuantity += item.quantity;
  });

  cartQuantity.textContent = totalQuantity;

  const decrementButtons = cartItemsContainer.querySelectorAll('.decrement');
  const incrementButtons = cartItemsContainer.querySelectorAll('.increment');

  decrementButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = parseInt(event.target.getAttribute('data-index'));
      if (cartItems[index].quantity > 1) {
              cartItems[index].quantity -= 1;
            } else {
              removeFromCart(index); 
            }
            updateCartQuantity();
            renderCartItems();
    });
    button.classList.add('quantity-btn');
    button.classList.add('decrement');
    
  });

  incrementButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = parseInt(event.target.getAttribute('data-index'));
      cartItems[index].quantity += 1;
      updateCartQuantity();
      renderCartItems();
    });
    button.classList.add('quantity-btn');
    button.classList.add('increment');

  });
  

  // Add event listener for each quantity input
  const quantityInputs = cartItemsContainer.querySelectorAll('input[type="number"]');
  quantityInputs.forEach(input => {
    input.addEventListener('change', (event) => {
      const newQuantity = parseInt(event.target.value);
      const index = parseInt(event.target.getAttribute('data-index'));

      if (newQuantity < 1) {
        removeFromCart(index); // Remove item if quantity is less than 1
      } else {
        cartItems[index].quantity = newQuantity;
        updateCartQuantity(); // Update the quantity in the cart display
      }

      // Render cart items again to reflect changes
      renderCartItems();
    });
  });
}



// Add item to cart
function addToCart(product) {
  const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
  if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
  } else {
      cartItems.push({
          id: product.id,
          title: product.title,
          price: product.price,
          img: product.colors[0].img, // Default image
          quantity: 1
      });
  }
  updateCartQuantity();
  
  if (sidebar.classList.contains('open')) {
      renderCartItems();
  }
}
function removeFromCart(index) {
  cartItems.splice(index, 1); // Remove the item from the cart array
  updateCartQuantity(); // Update the total cart quantity display
  renderCartItems(); // Render the cart items after removal
}



function updateCartQuantity() {
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  cartQuantity.textContent = totalQuantity;
}



// Add product to cart when "Buy" button is clicked
cartButton.addEventListener('click', () => {
  addToCart(chosenProduct);
});

checkoutButton.addEventListener("click", () => {
  // Select the target section you want to scroll to, e.g., the payment section
  const targetSection = document.querySelector(".payment");

  // Scroll to the target section smoothly
  targetSection.scrollIntoView({ behavior: "smooth" });
});



document.addEventListener('click', (event) => {
  // Check if the click is outside the sidebar, cart button, or sidebar open button
  if (!sidebar.contains(event.target) && 
      !openSidebarButton.contains(event.target) && 
      !cartButton.contains(event.target)) {
    sidebar.classList.remove('open');
  }
});


sidebar.addEventListener('click', (event) => {
  event.stopPropagation(); // Stop the click event from propagating to the document
});

// Variables to handle inactivity timer
let inactivityTimer;

// Function to start the inactivity timer
function startInactivityTimer() {
  // Clear any existing timer
  clearTimeout(inactivityTimer);
  
  // Set a new timer to close the sidebar after 5 seconds (5000 milliseconds)
  inactivityTimer = setTimeout(() => {
    sidebar.classList.remove('open');
  }, 5000);
}

// Function to reset the inactivity timer
function resetInactivityTimer() {
  clearTimeout(inactivityTimer); // Clear existing timer
  startInactivityTimer();        // Restart the timer
}

// Attach the inactivity timer reset to relevant events
document.addEventListener('click', resetInactivityTimer);
sidebar.addEventListener('mouseenter', resetInactivityTimer);
sidebar.addEventListener('mouseleave', resetInactivityTimer);

// Start the inactivity timer initially
startInactivityTimer();
