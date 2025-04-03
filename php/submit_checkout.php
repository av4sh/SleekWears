<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "sleekwears";
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $firstName = htmlspecialchars($_POST['firstName']);
    $lastName = htmlspecialchars($_POST['lastName']);
    $email = htmlspecialchars($_POST['email']);
    $address = htmlspecialchars($_POST['address']);
    $city = htmlspecialchars($_POST['city']);
    $zipCode = htmlspecialchars($_POST['zipCode']);
    $cardName = htmlspecialchars($_POST['cardName']);
    $cardNumber = htmlspecialchars($_POST['cardNumber']);
    $expDate = htmlspecialchars($_POST['expDate']);
    $cvv = htmlspecialchars($_POST['cvv']);
    $paymentMethod = htmlspecialchars($_POST['paymentMethod']);

    // Prepare and bind the statement
    $stmt = $conn->prepare("INSERT INTO orders (first_name, last_name, email, address, city, zip_code, card_name, card_number, exp_date, cvv, payment_method) 
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssssss", $firstName, $lastName, $email, $address, $city, $zipCode, $cardName, $cardNumber, $expDate, $cvv, $paymentMethod);

    // Execute the prepared statement
    if ($stmt->execute()) {
        echo "Order Placed!";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the prepared statement and connection
    $stmt->close();
    $conn->close();
}
?>
