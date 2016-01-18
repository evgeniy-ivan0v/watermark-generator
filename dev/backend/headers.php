<?php 

$result = "./file/watermarked.jpg";

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
}

