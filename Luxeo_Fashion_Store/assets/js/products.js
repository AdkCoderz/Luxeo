function filterCategory(category) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card) => {
        if (category === 'all') {
            card.style.display = 'block';
        } else if (card.classList.contains(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Function to show the product details modal
function showProductDetails(productName, productImage, productDescription, productPrice) {
    // Get modal elements
    const modal = document.getElementById("productModal");
    const modalName = document.getElementById("modalProductName");
    const modalImage = document.getElementById("modalProductImage");
    const modalDescription = document.getElementById("modalProductDescription");
    const modalPrice = document.getElementById("modalProductPrice");

    // Set the modal content
    modalName.textContent = productName;
    modalImage.src = productImage;
    modalDescription.textContent = productDescription;
    modalPrice.textContent = productPrice;

    // Show the modal
    modal.style.display = "flex";
}

// Function to close the modal
document.querySelector(".close-btn").addEventListener("click", function() {
    const modal = document.getElementById("productModal");
    modal.style.display = "none";
});

// Close the modal if the user clicks outside of the modal
window.onclick = function(event) {
    const modal = document.getElementById("productModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

let selectedProductId = null;

// Set the product ID when showing the modal
function showProductDetails(name, image, price, description, category) {
    document.getElementById('productImage').src = image;
    document.getElementById('productDescription').innerText = description;
    document.getElementById('productPrice').innerText = price;
    document.getElementById('productModal').style.display = 'block';

    // Store the selected product ID (you'll pass it as an argument)
    selectedProductId = productId; // Replace with the actual product ID
}



