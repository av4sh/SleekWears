document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Update cart count in navbar
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = cart.reduce((total, item) => total + parseInt(item.quantity), 0);
        });
    }

    // Handle product details page
    if (window.location.pathname.includes('product-details.html')) {
        const params = new URLSearchParams(window.location.search);
        const productName = params.get('name');
        const productPrice = params.get('price');
        const productImage = params.get('image');

        document.getElementById('detail-product-title').textContent = productName;
        document.getElementById('detail-product-price').textContent = productPrice;
        document.getElementById('detail-product-image').src = productImage;
        
        let description = "";
        switch(productName) {
            case "PREMIUM COLLECTION":
                description = "Our premium collection combines luxury materials with streetwear aesthetics.";
                break;
            case "ESSENTIAL SWEATSHIRT":
                description = "The essential sweatshirt is made from heavyweight cotton for maximum comfort.";
                break;
            case "OVERSIZED HOODIE":
                description = "Our oversized hoodie offers a relaxed fit with premium fleece lining.";
                break;
            case "STYLISH PANTS":
                description = "These stylish pants combine comfort and fashion with a tapered fit.";
                break;
            default:
                description = "Premium quality streetwear designed for comfort and style.";
        }
        document.getElementById('detail-product-description').textContent = description;

        // Handle add to cart button
        document.querySelector('.btn-lg').addEventListener('click', function() {
            const size = document.querySelector('.form-select').value;
            const quantity = document.querySelectorAll('.form-select')[1].value;
            
            const cart = JSON.parse(localStorage.getItem('cart'));
            cart.push({
                name: productName,
                price: productPrice,
                image: productImage,
                size: size,
                quantity: quantity
            });
            
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            window.location.href = 'cart.html';
        });
    }
    // Handle cart page
    else if (window.location.pathname.includes('cart.html')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        const cartItems = document.getElementById('cart-items');
        
        if (cart.length > 0) {
            cartItems.innerHTML = '';
            
            let subtotal = 0;
            
            cart.forEach((item, index) => {
                const price = parseFloat(item.price.replace('$', ''));
                const quantity = parseInt(item.quantity);
                const itemTotal = price * quantity;
                subtotal += itemTotal;
                
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item mb-4 pb-4 border-bottom';
                itemElement.innerHTML = `
                    <div class="row">
                        <div class="col-md-2">
                            <img src="${item.image}" alt="${item.name}" class="img-fluid">
                        </div>
                        <div class="col-md-6">
                            <h5>${item.name}</h5>
                            <p class="mb-1">Size: ${item.size}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                        <div class="col-md-2 text-end">
                            <p>${item.price}</p>
                        </div>
                        <div class="col-md-2 text-end">
                            <button class="btn btn-sm btn-outline-danger remove-item" data-index="${index}">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `;
                cartItems.appendChild(itemElement);
            });
            
            // Calculate totals
            const shipping = 5.00;
            const tax = subtotal * 0.1; // 10% tax
            const total = subtotal + shipping + tax;
            
            document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
            document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
            document.getElementById('total').textContent = `$${total.toFixed(2)}`;
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    const cart = JSON.parse(localStorage.getItem('cart'));
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.location.reload(); // Refresh to show updated cart
                });
            });
        }
        
        updateCartCount();
    }
    // Handle home page
    else {
        // Add click handlers to product cards
        const products = document.querySelectorAll('.product-inner');
        products.forEach(product => {
            product.addEventListener('click', function() {
                const name = this.querySelector('h5').textContent;
                const price = this.querySelector('p').textContent;
                const image = this.querySelector('img').src;
                
                window.location.href = `product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
            });
        });
        
        updateCartCount();
    }
});