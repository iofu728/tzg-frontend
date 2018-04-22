<?php
$title = $_POST['title'];
$con = mysqli_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysqli_select_db($con,"test");
mysqli_query($con,"INSERT INTO test (title)
VALUES ('$title')");

mysqli_close($con);
?>