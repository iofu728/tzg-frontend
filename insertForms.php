<?php
$name = $_POST['name'];
$workCompany = $_POST['workCompany'];
$startYear = $_POST['startYear'];
$educationLevel = $_POST['educationLevel'];
$phoneNum = $_POST['phoneNum'];
$email = $_POST['email'];
$con = mysql_connect("localhost","root","root");
if (!$con)
 {
 die('Could not connect: ' . mysql_error());
 }
mysql_select_db("schoolmates", $con);
mysql_query("INSERT INTO forms (name, work_company, enter_year, education_level, phone_num, email)
VALUES ('$name', '$workCompany','$startYear','$educationLevel','$phoneNum','$email')");

mysql_close($con);
?>