<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SleekWears - Streetwear Collection</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg">
        <div class="container">
            <a class="navbar-brand" href="#">SLEEKWEARS</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <button id="colorChanger" class="color-change-btn">
                            <i class="fas fa-palette"></i> Change Vibe
                        </button>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="html/aboutus.html">About us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="html/cart.html"><i class="fas fa-shopping-cart"></i> <span id="cart-count" class="badge bg-danger">0</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="html/login.html">Profile</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <!-- Header Section -->
    <header class="header-container">
        <div class="container">
            <div class="header-top">
                <h1>ELEVATE YOUR STREETWEAR</h1>
                <p>Minimal designs. Maximum impact. Shop our latest collection.</p>
            </div>
            <div class="header-border"></div>
            <div class="header-bottom">
                <a href="#latest-drops" class="vibe-btn three-d-btn">
                    DISCOVER <i class="fas fa-chevron-down"></i>
                </a>
            </div>
        </div>
    </header>

    <!-- Latest Drops Section -->
    <section id="latest-drops" class="latest-drops">
        <div class="container">
            <h2>LATEST DROPS</h2>
            <div class="row">
                <div class="col-lg-3 col-md-6 col-sm-6 product">
                    <div class="product-inner">
                        <img src="pics/all.png" alt="All Products">
                        <h5>PREMIUM COLLECTION</h5>
                        <p>$99.99</p>
                        <div class="product-overlay">
                            <button class="btn btn-dark">View Details</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 product">
                    <div class="product-inner">
                        <img src="pics/sweatshirt.png" alt="Sweatshirt">
                        <h5>ESSENTIAL SWEATSHIRT</h5>
                        <p>$69.99</p>
                        <div class="product-overlay">
                            <button class="btn btn-dark">View Details</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 product">
                    <div class="product-inner">
                        <img src="pics/hoodie.png" alt="Hoodie">
                        <h5>OVERSIZED HOODIE</h5>
                        <p>$79.99</p>
                        <div class="product-overlay">
                            <button class="btn btn-dark">View Details</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6 col-sm-6 product">
                    <div class="product-inner">
                        <img src="pics/pant.png" alt="Stylish Pants">
                        <h5>STYLISH PANTS</h5>
                        <p>$59.99</p>
                        <div class="product-overlay">
                            <button class="btn btn-dark">View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    

    <!-- Newsletter Section -->
    <section class="newsletter">
        <div class="container text-center">
            <h3>Contact us</h3>
            <p>Submit your email to get in touch with us</p>
            <form class="newsletter-form" action="php/submit_email.php" method="POST">
    <input type="email" name="email" placeholder="Your email address" required>
    <button type="submit" class="btn">SUBMIT</button>
</form>

            
            
            
            
        </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-md-4 mb-4 mb-md-0">
                            <h4 class="footer-heading">SLEEKWEARS</h4>
                            <p class="footer-text">Elevating streetwear since 2025</p>
                        </div>
                        <div class="col-md-4 mb-4 mb-md-0">
                            <h4 class="footer-heading">LINKS</h4>
                            <ul class="footer-links">
                                <li><a href="html/aboutus.html">About Us</a></li>
                                <li><a href="html/contact-us.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="col-md-4">
                            <h4 class="footer-heading">CONNECT</h4>
                            <div class="social-icons">
                                <a href="#"><i class="fab fa-instagram"></i></a>
                                <a href="#"><i class="fab fa-twitter"></i></a>
                                <a href="#"><i class="fab fa-facebook-f"></i></a>
                                <a href="#"><i class="fab fa-tiktok"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <div class="col-12 text-center">
                    <p class="copyright">&copy; 2025 SLEEKWEARS. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
