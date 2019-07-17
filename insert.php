<?php

   $name = $_POST['name'];
   $workCompany = $_POST['workCompany'];
   $startYear = $_POST['startYear'];
   $educationLevel = $_POST['educationLevel'];
   $phoneNum = $_POST['phoneNum'];
   $email = $_POST['email'];

   $con = mysqli_connect("localhost","root","root");

if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }

mysqli_select_db($con,"schoolmates");
mysqli_query($con,"INSERT INTO forms (name, work_company, enter_year, education_level, phone_num, email)
VALUES ('$name','$workCompany','$startYear','$educationLevel','$phoneNum','$email')");

mysqli_close($con);
?>