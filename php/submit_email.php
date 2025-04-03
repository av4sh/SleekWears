<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Check if the form was submitted using POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Check if the email field is set and not empty
    if (!isset($_POST['email']) || empty(trim($_POST['email']))) {
        die("❌ No email address provided.");
    }

    $email = trim($_POST['email']);

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("❌ Invalid email format.");
    }

    // Connect to the MySQL database
    $conn = new mysqli("localhost", "root", "", "sleekwears");

    // Check for database connection errors
    if ($conn->connect_error) {
        die("❌ Database connection failed: " . $conn->connect_error);
    }

    // Check if the email already exists in the database
    $checkStmt = $conn->prepare("SELECT * FROM subscribers WHERE email = ?");
    $checkStmt->bind_param("s", $email);
    $checkStmt->execute();
    $result = $checkStmt->get_result();

    if ($result->num_rows > 0) {
        echo "⚠️ This email is already subscribed!";
    } else {
        // Insert the email into the database
        $stmt = $conn->prepare("INSERT INTO subscribers (email) VALUES (?)");
        $stmt->bind_param("s", $email);

        if ($stmt->execute()) {
            echo "✅ Email submitted successfully!";
        } else {
            echo "❌ Error: " . $stmt->error;
        }

        $stmt->close();
    }

    // Close database connections
    $checkStmt->close();
    $conn->close();
} else {
    die("❌ This script only handles POST requests.");
}
?>
