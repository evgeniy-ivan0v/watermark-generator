<?php 

$result = './file/watermarked.jpg';
$uploaddir = 'file/';
$fileSaveDuration = 60 * 60; // 1 час

if (file_exists($result)) {
	ob_clean();
	header('Content-Description: File Transfer');
    header('Content-Type: image/jpg');
    header('Content-Disposition: attachment; filename=' . basename($result));
    header('Content-Transfer-Encoding: binary');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');

	if ($fd = fopen($result, 'rb')) {
		while (!feof($fd)) {
			print fread($fd, 1024);
		}
		
		fclose($fd);
	}

	// Чистим файлы в папке загрузок которые лежат там дольше 1 часа
	if (file_exists($uploaddir)) {
		foreach (new DirectoryIterator($uploaddir) as $fileInfo) {
	        if ($fileInfo->isDot()) {
	        	continue;
	        }
	        if (time() - $fileInfo->getCTime() >= $fileSaveDuration) {
	            unlink($fileInfo->getRealPath());
	        }
	    }
	}
}

