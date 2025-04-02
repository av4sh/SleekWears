// This will handle the product click functionality
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the product details page
    if (window.location.pathname.includes('product-details.html')) {
        // Get product details from URL parameters
        const params = new URLSearchParams(window.location.search);
        const productName = params.get('name');
        const productPrice = params.get('price');
        const productImage = params.get('image');
        const productDescription = params.get('description');

        // Set the product details on the page
        document.getElementById('detail-product-title').textContent = productName;
        document.getElementById('detail-product-price').textContent = productPrice;
        document.getElementById('detail-product-image').src = productImage;
        
        // Set description based on product type
        let description = "";
        switch(productName) {
            case "PREMIUM COLLECTION":
                description = "Our premium collection combines luxury materials with streetwear aesthetics. Each piece is crafted with attention to detail for the ultimate urban look.";
                break;
            case "ESSENTIAL SWEATSHIRT":
                description = "The essential sweatshirt is made from heavyweight cotton for maximum comfort. Features ribbed cuffs and hem for a classic fit.";
                break;
            case "OVERSIZED HOODIE":
                description = "Our oversized hoodie offers a relaxed fit with premium fleece lining. Features an adjustable drawstring hood and kangaroo pocket.";
                break;
            case "STYLISH PANTS":
                description = "These stylish pants combine comfort and fashion with a tapered fit. Made from durable cotton blend with reinforced stitching.";
                break;
            default:
                description = "Premium quality streetwear designed for comfort and style.";
        }
        document.getElementById('detail-product-description').textContent = description;
    } else {
        // Add click handlers to product cards on the home page
        const products = document.querySelectorAll('.product-inner');
        products.forEach(product => {
            product.addEventListener('click', function() {
                const name = this.querySelector('h5').textContent;
                const price = this.querySelector('p').textContent;
                const image = this.querySelector('img').src;
                
                // Redirect to product details page with parameters
                window.location.href = `product-details.html?name=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}&image=${encodeURIComponent(image)}`;
            });
        });
    }
});