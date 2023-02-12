<?php
	$myArray = array();
	$servername = "localhost";
	$username = "proyectoAdmin";
	$password = "0448dbx";
	$dbname = "proyectoAsir";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
    		die("Connection failed: " . $conn->connect_error);
	}

	$sql = "SELECT DATE_FORMAT(fecha,'%d-%m %H:%i') as fecha, temperatura, humedad FROM datos order by fecha asc;";
	$result= $conn->query($sql);
	while($row = $result->fetch_assoc()){
		$myArray[] = $row;
	}
	echo json_encode($myArray);
   ?>
