<?php
$title = $_POST['title'];
$url = $_POST['url'];
$con = mysql_connect("localhost","root","root");
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
mysql_select_db("test", $con);
mysql_query("INSERT INTO test (title, url)
VALUES ('$title', '$url')");

mysql_close($con);
?>