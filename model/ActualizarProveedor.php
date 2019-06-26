
<?php

require 'DatosBD.php';

$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];

$_lifnr=$_POST['lifnr'];
$_brsch=$_POST['brsch'];
$_kunnr=$_POST['kunnr'];
$_stcd1=$_POST['stcd1'];
$_stcd2=$_POST['stcd2'];
$_vbund=$_POST['vbund'];
$_fiskn=$_POST['fiskn'];
$_lzone=$_POST['lzone'];
$_fityp=$_POST['fityp'];
$_stcdt=$_POST['stcdt'];
$_j_1kfrepre=$_POST['j_1kfrepre'];
$_ftbus=$_POST['ftbus'];
$_ftind=$_POST['ftind'];

$_title_medi=$_POST['title_medi'];
$_name1=$_POST['name1'];		
$_sort1=$_POST['sort1']; 		
$_str_suppl1=$_POST['str_suppl1']; 
$_street=$_POST['street'];		
$_city2=$_POST['city2'];		
$_post_code1=$_POST['post_code1'];
$_country=$_POST['country'];		
$_region=$_POST['region'];

$_ekorg=$_POST['ekorg'];
$_waers=$_POST['waers'];
$_verkf=$_POST['verkf'];
$_telf1=$_POST['telf1'];
$_minbw=$_POST['minbw'];
$_zterm=$_POST['zterm'];
$_inco1=$_POST['inco1'];
$_inco2=$_POST['inco2'];
$_kalsk=$_POST['kalsk'];
$_expvz=$_POST['expvz'];
$_zolla=$_POST['zolla'];
$_meprf=$_POST['meprf'];
$_ekgrp=$_POST['ekgrp'];
$_plifz=$_POST['plifz'];
$_skrit=$_POST['skrit'];
$_bstae=$_POST['bstae'];
$_rdprf=$_POST['rdprf'];
$_vensl=$_POST['vensl'];

$con = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor,$_Base_datos);

$sql = "update lfa1
		set brsch='".$_brsch."',
			kunnr='".$_kunnr."',
			stcd1='".$_stcd1."',
			stcd2='".$_stcd2."',
			vbund='".$_vbund."',
			fiskn='".$_fiskn."',
			lzone='".$_lzone."',
			fityp='".$_fityp."',
			stcdt='".$_stcdt."',
			j_1kfrepre='".$_j_1kfrepre."',
			ftbus='".$_ftbus."',
			ftind='".$_ftind."',

			title_medi='".$_title_medi."',
			name1='".$_name1."',		
			sort1='".$_sort1."', 		
			str_suppl1='".$_str_suppl1."', 
			street='".$_street."',		
			city2='".$_city2."',		
			post_code1='".$_post_code1."',
			country='".$_country."',		
			region='".$_region."'	 	

		where lifnr='".$_lifnr."'";

$result = mysqli_query($con,$sql);

$sql = "update lfm1
		set waers='".$_waers."',
			verkf='".$_verkf."',
			telf1='".$_telf1."',
			minbw='".$_minbw."',
			zterm='".$_zterm."',
			inco1='".$_inco1."',
			inco2='".$_inco2."',
			kalsk='".$_kalsk."',
			expvz='".$_expvz."',
			zolla='".$_zolla."',
			meprf='".$_meprf."',
			ekgrp='".$_ekgrp."',
			plifz='".$_plifz."',
			skrit='".$_skrit."',
			bstae='".$_bstae."',
			rdprf='".$_rdprf."',
			vensl='".$_vensl."'
		where lifnr = '".$_lifnr."' and
		      ekorg = '".$_ekorg."'";

$result = mysqli_query($con,$sql);

close_conection($con);

echo $result;

?>