document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    // Update cart count in navbar
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + parseInt(item.quantity), 0);
        document.querySelectorAll('#cart-count').forEach(el => {
            el.textContent = count || 0;
        });
    }

    // ====== THEME SWITCHER FUNCTIONALITY ======
    const colorChanger = document.getElementById('colorChanger');
    if (colorChanger) {
        // Array of vibrant colors
        const colors = [
            '#FF5733', '#33FF57', '#3357FF', '#F033FF',
            '#FF33A8', '#33FFF5', '#8A2BE2', '#FF8C00',
            '#4B0082', '#20B2AA', '#9370DB', '#32CD32',
            '#FF4500', '#9400D3', '#008080', '#FFD700'
        ];

        // Apply theme colors
        function applyTheme(primaryColor, textColor) {
            document.documentElement.style.setProperty('--theme-primary', primaryColor);
            document.documentElement.style.setProperty('--theme-footer-bg', primaryColor);
            document.documentElement.style.setProperty('--theme-secondary', textColor);
            document.documentElement.style.setProperty('--theme-light-text', 
                textColor === '#111' ? '#666' : 'rgba(255,255,255,0.7)');

            // Update all text colors immediately (no transition)
            const header = document.querySelector('header');
            const footer = document.querySelector('footer');
            if (header) header.style.color = textColor;
            if (footer) footer.style.color = textColor;

            // Update link colors
            const headerLinks = header ? header.querySelectorAll('a') : [];
            const footerLinks = footer ? footer.querySelectorAll('a') : [];

            headerLinks.forEach(link => link.style.color = textColor);
            footerLinks.forEach(link => link.style.color = textColor);
        }

        // Load saved theme if exists
        if (localStorage.getItem('themePrimary')) {
            applyTheme(
                localStorage.getItem('themePrimary'),
                localStorage.getItem('themeTextColor')
            );
        }

        colorChanger.addEventListener('click', function() {
            // Get a random color (excluding colors too similar to current)
            let randomColor;
            const currentColor = localStorage.getItem('themePrimary') || '#000000';

            do {
                randomColor = colors[Math.floor(Math.random() * colors.length)];
            } while (randomColor === currentColor && colors.length > 1);

            // Calculate appropriate text color
            const brightness = getBrightness(randomColor);
            const textColor = brightness > 130 ? '#111' : '#fff';

            applyTheme(randomColor, textColor);

            // Save to localStorage
            localStorage.setItem('themePrimary', randomColor);
            localStorage.setItem('themeTextColor', textColor);
        });

        // Helper function to determine color brightness
        function getBrightness(hexColor) {
            // Convert hex to RGB
            const r = parseInt(hexColor.substr(1, 2), 16);
            const g = parseInt(hexColor.substr(3, 2), 16);
            const b = parseInt(hexColor.substr(5, 2), 16);

            // Calculate brightness (perceived luminance)
            return (r * 299 + g * 587 + b * 114) / 1000;
        }
    }

    // ====== EXISTING CART FUNCTIONALITY ======
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

    // Handle checkout page (order summary update)
    else if (window.location.pathname.includes('checkout.html')) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        let subtotal = 0;
        const shipping = 5.00; // Fixed shipping fee
        
        cart.forEach(item => {
            const price = parseFloat(item.price.replace('$', '').trim());
            const quantity = parseInt(item.quantity);
            subtotal += price * quantity;
        });

        const tax = subtotal * 0.1;
        const total = subtotal + shipping + tax;

        // Update order summary
        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total-amount').textContent = `$${total.toFixed(2)}`;
    }

    // Handle home page
    else {
        const products = document.querySelectorAll('.product-inner');
        products.forEach(product => {
            product.addEventListener('click', function() {
                const name = this.querySelector('h5').textContent;
                const price = this.querySelector('p').textContent;
                const image = this.querySelector('img').src;
                
                window.location.href = `html/product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
            });
        });
        
        updateCartCount();
    }

    // Apply theme immediately on page load for all pages
    if (localStorage.getItem('themePrimary')) {
        const root = document.documentElement;
        root.style.setProperty('--theme-primary', localStorage.getItem('themePrimary'));
        root.style.setProperty('--theme-footer-bg', localStorage.getItem('themePrimary'));
        root.style.setProperty('--theme-secondary', localStorage.getItem('themeTextColor'));
        root.style.setProperty('--theme-light-text', 
            localStorage.getItem('themeTextColor') === '#111' ? '#666' : 'rgba(255,255,255,0.7)');
    }
});
