<?php
namespace abeautifulsite;
use Exception;


require 'SimpleImage.php';

$uploaddir = 'file/';

if (!file_exists('file')) {
    mkdir('file', 0700, true);
}

$answer = array();

$uploadfile			= $uploaddir.basename($_FILES['mainImg']['name']);
$watermarkfile 		= $uploaddir.basename($_FILES['wtImg']['name']);

$mode 		 		= $_POST['mode'];
$originX		 	= $_POST['posX'];
$originY		 	= $_POST['posY'];
$marginX	 		= $_POST['marginX'];
$marginY	 		= $_POST['marginY'];
$opacity	 		= $_POST['opacity'];



// Files upload

$max_size = 10485760; // 10MB

// Чистим файлы в папке загрузок если они "старше" 2 дней
// if (file_exists($uploaddir)) {
// 	foreach (new DirectoryIterator($uploaddir) as $fileInfo) {
//         if ($fileInfo->isDot()) {
//         	continue;
//         }
//         if (time() - $fileInfo->getCTime() >= 100) {
//             unlink($fileInfo->getRealPath());
//         }
//     }
// }

//Загружаем расширение файлов в переменные
$imageFileType = pathinfo($uploadfile, PATHINFO_EXTENSION);
$wtFileType = pathinfo($watermarkfile, PATHINFO_EXTENSION);
// Validating input
$uploadOk = 1;

//Проверяем являются ли загруженые файлы изображениями
if (isset($_POST["submit"])) {
		$checkMain = getimagesize($_FILES["mainImg"]["tmp_name"]);
		$checkWT = getimagesize($_FILES['wtImg']["tmp_name"]);
		if ($checkMain == false) {
			$uploadOk = 0;
			$answer['status'] = 'error';
			$answer['text'] = 'Ваш файл не является изображением';
		} else if ($checkWT == false) {
			$uploadOk = 0;
			$answer['status'] = 'error';
			$answer['text'] = "Ваш файл водяного знака не является изображением.";
		} else {
			$uploadOk = 1;
		}
}
// Проверяем размер файлов
if ($_FILES["mainImg"]["size"] > $max_size || $_FILES['wtImg']["size"] > $max_size) {
    $answer['status'] = 'error';
	$answer['text'] = "Ваши файлы слишком большие, максимальный размер файлов не должен превышать 10МБ";
    $uploadOk = 0;
}
// Проверяем если файлы соответствуют нужным форматам
$fileTypes = array("jpg", "png", "jpeg", "gif");
if(!in_array($imageFileType, $fileTypes) || !in_array($wtFileType, $fileTypes)) {
    $answer['status'] = 'error';
	$answer['text'] = "Разрешены только изображения форматов JPG, JPEG, PNG & GIF.";
    $uploadOk = 0;
}
if ($uploadOk === 1) {
	move_uploaded_file($_FILES['mainImg']['tmp_name'], $uploadfile);
	move_uploaded_file($_FILES['wtImg']['tmp_name'], $watermarkfile);
	$imageSize = getimagesize($uploadfile);
	$watermarkSize = getimagesize($watermarkfile);
	$imagewidth = $imageSize[0];
	$imageheight = $imageSize[1];
	$wtwidth = $watermarkSize[0];
	$wtheight = $watermarkSize[1];

	if ($mode == "single") {
		$img = new SimpleImage($uploadfile);
		$img->overlay($watermarkfile, 'top left', $opacity, $originX, $originY);
		$img->save('./file/watermarked.jpg');
  	} else if ($mode == "tile") {
		$pozX = $originX;
		$pozY = $originY;
		$marX = $marginX;
		$marY = $marginY;
		$widMain = $imagewidth;
		$heigMain = $imageheight;
		$widWat = $wtwidth;
		$heigWat = $wtheight;
  		$img = new SimpleImage($uploadfile);
  		$newPozX = $pozX;
  		while ($newPozX < $widMain) {
  			$newPozY = $pozY;
  			while ($newPozY < $heigMain) {
  				$img->overlay($watermarkfile, 'top left', $opacity, $newPozX, $newPozY);
  				$newPozY += $heigWat + $marX;
  			}
  			$newPozX += $widWat + $marY;
  		}
  		$img->save('./file/watermarked.jpg');
  	}
	
}

// else { 
// 	echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; 
// 	exit; 
// }


header("Content-Type: application/json");
echo json_encode($answer);
?>