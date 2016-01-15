<?php
	namespace abeautifulsite;
	use Exception;

	require 'SimpleImage.php';
	$uploaddir = 'file/';
	$uploadfile = $uploaddir.basename($_FILES['main']['name']);

	$originX = $_POST['originX'];
    $originY = $_POST['originY'];
    $opacity = $_POST['opacity'];

    $mode = $_POST['mode'];




	// print_r (getimagesize($_FILES['main']['name']));


	$watermarkfile = $uploaddir.basename($_FILES['watermark']['name']);

	if (copy($_FILES['main']['tmp_name'], $uploadfile) && copy($_FILES['watermark']['tmp_name'], $watermarkfile)) {	
		$imageSize = getimagesize($uploadfile);
		$watermarkSize = getimagesize($watermarkfile);
		$imagewidth = $imageSize[0];
		$imageheight = $imageSize[1];
		$wtwidth = $watermarkSize[0];
		$wtheight = $watermarkSize[1];
		// echo "<h3> Главное изображение " . (string)$imagewidth . "x" . (string)$imageheight . "</h3>";

		if ($mode == "single") {
    		$img = new SimpleImage($uploadfile);
			$img->overlay($watermarkfile, 'top left', $opacity, $originX, $originY);
			$img->save('./file/new-image.jpg');

    	} else if ($mode == "till") {
			$pozX = -100;
			$pozY = -100;
			$marX = 50;
			$marY = 30;
			$widMain = 1500;
			$heigMain = 1500;
			$widWat = 256;
			$heigWat = 256;
    		$img = new SimpleImage($uploadfile);
    		$newPozX = $pozX;


    		while ($newPozX < $widMain) {
    			$newPozY = $pozY;
    			// echo $newPozX . " - X <br>";

    			while ($newPozY < $heigMain) {
    				$img->overlay($watermarkfile, 'top left', $opacity, $newPozX, $newPozY);
    				$newPozY += $heigWat + $marY;
    				// echo $newPozY . " - Y <br>";
    			}
    			$newPozX += $widWat + $marX;
    		}

    		$img->save('./file/new-image.jpg');
    	}

		

		//отдаем файл на скачивание

		$result = $uploaddir . 'new-image.jpg';

		if (file_exists($result)) {
			header('Content-Description: File Transfer');
			header('Content-Type: application/octet-stream');
			header('Content-Disposition: attachment; filename='. 'new-image.jpg');
			header('Expires: 0');
			header('Cache-Control: must-revalidate');
			header('Pragma: public');
			header('Content-Length: '.filesize($result));
			
			if ($fd = fopen($result, 'rb')) {
				while (!feof($fd)) {
				print fread($fd, 1024);
				}
			fclose($fd);
    		}
    		exit;
		}
		// echo "<img src=" . $result . ">";
	}
	
	else { 
		echo "<h3>Ошибка! Не удалось загрузить файл на сервер!</h3>"; 
		exit; 
	}

 ?>