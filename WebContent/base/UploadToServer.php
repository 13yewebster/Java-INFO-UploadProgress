<?php
    $file_path = "D:\\xampp\tomcat\webapps\fileupload\base\media\\";
    // $file_path = "/Applications/XAMPP/xamppfiles/htdocs/linkedin/upload/";


    $file_path = $file_path . basename( $_FILES['uploaded_file']['name']);
    if(move_uploaded_file($_FILES['uploaded_file']['tmp_name'], $file_path)) {
        echo "success";
    } else{
        echo "fail";
    }
 ?>
