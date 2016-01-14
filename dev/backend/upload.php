<?php
$imageName = $_FILES["image"]["name"]; // Имя файла
$imageTmpLoc = $_FILES["image"]["tmp_name"]; // Файл во временной папке
$imageType = $_FILES["image"]["type"]; // Тип файла
$imageSize = $_FILES["image"]["size"]; // Размер файла в байтах
$imageErrorMsg = $_FILES["uploaded_file"]["error"]; // Проверка на ошибки
$kaboom = explode(".", $imageName); // Разделяет имя файла в массив
$imageExt = end($kaboom); // Берет последний элемент массива

// Начинаем валидацию файла
if (!$imageTmpLoc) { // если файл не выбран
    echo "ОШИБКА: Пожалуйста выберите файл перед отправкой.";
    exit();
} else if($imageSize > 5242880) { // Проверяем если файл не больше 5 мегабайт
    echo "ОШИБКА: ваш файл тяжелее 5 мегабайт.";
    unlink($imageTmpLoc); // Удаляем файл из временной папки
    exit();
} else if (!preg_match("/.(gif|jpg|png)$/i", $imageName) ) {
     // This condition is only if you wish to allow uploading of specific file types    
     echo "ОШИБКА: Ваш файл должен быть в формате .gif, .jpg, или .png.";
     unlink($imageTmpLoc); // Удаляем файл из временной папки
     exit();
} else if ($imageErrorMsg == 1) { 
    echo "ОШИБКА: Ошибка при загрузке, попробуйте заного.";
    exit();
}
// END PHP Image Upload Error Handling ---------------------------------
// Place it into your "uploads" folder mow using the move_uploaded_file() function
$moveResult = move_uploaded_file($imageTmpLoc, "uploads/$imageName");
// Check to make sure the move result is true before continuing
if ($moveResult != true) {
    echo "ERROR: File not uploaded. Try again.";
    exit();
}
// Include the file that houses all of our custom image functions
include_once("ak_php_img_lib_1.0.php");
// ---------- Start Universal Image Resizing Function --------
$target_file = "uploads/$imageName";
$resized_file = "uploads/resized_$imageName";
$wmax = 500;
$hmax = 500;
ak_img_resize($target_file, $resized_file, $wmax, $hmax, $imageExt);
// ----------- End Universal Image Resizing Function ----------
// ---------- Start Convert to JPG Function --------
if (strtolower($imageExt) != "jpg") {
    $target_file = "uploads/resized_$imageName";
    $new_jpg = "uploads/resized_".$kaboom[0].".jpg";
    ak_img_convert_to_jpg($target_file, $new_jpg, $imageExt);
}
// ----------- End Convert to JPG Function -----------
// ---------- Start Image Watermark Function --------
$target_file = "uploads/resized_".$kaboom[0].".jpg";
$wtrmrk_file = "watermark.png";
$new_file = "uploads/protected_".$kaboom[0].".jpg";
ak_img_watermark($target_file, $wtrmrk_file, $new_file);
// ----------- End Image Watermark Function -----------


?>