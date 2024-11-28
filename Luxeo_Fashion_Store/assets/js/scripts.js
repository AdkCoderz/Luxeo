// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1200, // Animation duration in ms
    once: true,     // Run animation only once
});

// Smooth Scrolling for navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector(e.target.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// JavaScript to toggle the navigation menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});

// Function to handle "Add to Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        alert('Item added to the cart!');
        // In a real application, we would add the item to the cart here
    });
});
 
// Function to handle "Buy Now"
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function() {
        alert('Proceeding to checkout!');
        // In a real application, you would redirect to the checkout page here
        window.location.href = "pages/checkout.html"; // Example checkout page redirect
    });
});

// Add to Cart Action
function addToCart() {
    const userId = 1; // Replace with logged-in user's ID
    const quantity = 1; // Default quantity for now

    fetch('http://localhost:3000/api/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            productId: selectedProductId,
            quantity: quantity,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            alert('Product added to cart!');
            closeModal();
        })
        .catch((error) => {
            console.error('Error adding to cart:', error);
        });
}
function buyNow() {
    const checkoutUrl = `pages/checkout.html?productId=${selectedProductId}`;
    window.location.href = checkoutUrl;
}

