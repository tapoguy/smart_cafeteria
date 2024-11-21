<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Menu Items</title>
    <link rel="stylesheet" href="displaymenu.css">
</head>
<body>
    <header>
     <?php
     include 'header.php';
     include 'sidebar.php';
     ?>
   
    </header>
    <main class="menu-container">
        <?php
    
        $servername = "localhost";
        $username = "root";
        $password = "";
        $database = "cafeteria";

        $conn = new mysqli($servername, $username, $password, $database);

        // Check connection
        if(!$conn){
            echo "connection yakana";
        }
       
        // retriving menu items
        
        
        $sql = "SELECT name, description, price, image_path FROM menuss";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            // Output data of each row
            while ($row = $result->fetch_assoc()) {
                echo "
                <div class='menu-item'>
                    <img src='" . htmlspecialchars($row['image_path']) . "' alt='Menu Image'i>
                    <div class='menu-details'>
                        <h2>" . htmlspecialchars($row['name']) . "</h2>
                        <p>" . htmlspecialchars($row['description']) . "</p>
                        <span class='price'>MK " . htmlspecialchars($row['price']) . "</span>
                    </div>
                </div>
                ";
            }
        } else {
            echo "<p>No menu items found.</p>";
        }

        $conn->close();
        ?>
    </main>
</body>
</html>
