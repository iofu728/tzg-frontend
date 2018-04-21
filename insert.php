<?php

   $name = $_POST['name'];
   $workCompany = $_POST['workCompany'];
   $startYear = $_POST['startYear'];
   $educationLevel = $_POST['educationLevel'];
   $phoneNum = $_POST['phoneNum'];
   $email = $_POST['email'];

  echo "$name <br>";
  echo "$workCompany <br>";
  echo "$startYear <br>";
  echo "$educationLevel <br>";
  echo "$phoneNum <br>";
  echo "$email <br>";

  $db = new mysqli('localhost','root','root','schoolmates');
  if(!$db){
  echo "连接失败！";
  }
  $db->query("set names utf8");
  $query = "insert into forms (name, work_company, enter_year, education_level, phone_num, email) values ('".$name."','".$workCompany."','".$startYear."','".$educationLevel."','".$phoneNum."','".$email."')";
  $result = $db->query($query);
  if ($result){
  echo "上传成功！";
  }
  else {
  echo "失败！";
  }
  $db->close();

?>