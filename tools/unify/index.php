<?php
	$file = "unified.xml";
	file_put_contents($file, "");

	$start = "<Base>\n";
	$end = "</Base>";
	
	$fp = fopen($file, 'a');
	fwrite($fp, $start);

	$fragmentFiles = glob("fragments/*.fragment.xml");
	foreach ($fragmentFiles as $key => $value) {
		fwrite($fp, file_get_contents($value));
	}
	fwrite($fp, $end);
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>unify</title>
    </head>
    <body>
        <a href="unified.xml" target="_blank">unified.xml</a>
    </body>
</html>