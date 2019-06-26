<?php 


require '../../security.php';
require_once '../../assets/vendor/autoload.php';
require '../DatosBD.php';

/*$_Ip = $_POST['_Ip'];
$_Usuario_servidor = $_POST['_Usuario_servidor'];
$_Pass_servidor = $_POST['_Pass_servidor'];
$_Base_datos = $_POST['_Base_datos'];*/


$_mblnr = $_GET['mblnr'];
$_mjahr = $_GET['mjahr'];
$_empresa = $_GET['empresa'];


$con = open_conection($host, $user, $pass, "erp");
//$conEmpresa  = open_conection($_Ip,$_Usuario_servidor,$_Pass_servidor, "erp_main");

//$sqlEmpresa = "select descripcion from empresa where empresa = '".$_empresa."'"

$sqlMkpf = "select * from mkpf where mblnr = '".$_mblnr."' and mjahr = '".$_mjahr."'";

$sqlMseg = "select * from mseg where mblnr = '".$_mblnr."' and mjahr = '".$_mjahr."'";

//$resultEmpresa = mysqli_query($conEmpresa, $sqlEmpresa);

//$row = mysqli_fetch_array($resultEmpresa);

//$nombrEmpresa = $row['descripcion'];

$resultMkpf = mysqli_query($con,$sqlMkpf);



$rowMkpf = mysqli_fetch_array($resultMkpf);

  $mblnr=$rowMkpf['mblnr'];
  $mjahr=$rowMkpf['mjahr'];
  $bldat= date_create($rowMkpf['bldat']);
  $budat= date_create($rowMkpf['budat']);
  $mtsnr=$rowMkpf['mtsnr'];
  $bktxt=$rowMkpf['bktxt'];



$resultMseg = mysqli_query($con,$sqlMseg);

$mseg = array();

while($row = mysqli_fetch_array($resultMseg)){       

  $mblnr=$row['mblnr'];
  $mjahr=$row['mjahr'];
  $zeile=$row['zeile'];
  $matnr=$row['matnr'];
  $maktx=$row['maktx'];
  $menge=$row['menge'];
  $meins=$row['meins'];
  $lgort=$row['lgort'];
  $kostl=$row['kostl'];
  $sakto=$row['sakto'];
  $charg=$row['charg'];
  $bwtar=$row['bwtar'];
  $bwart=$row['bwart'];
  $shkzg=$row['shkzg'];
  $insmk=$row['insmk'];
  $kunnr=$row['kunnr'];
  $lifnr=$row['lifnr'];
  $werks=$row['werks'];
  $umwrk=$row['umwrk'];
  $umlgo=$row['umlgo'];

    $mseg[] = array(
              'mblnr'=>$mblnr,
              'mjahr'=>$mjahr,
              'zeile'=>$zeile,
              'matnr'=>$matnr,
              'maktx'=>$maktx,
              'menge'=>$menge,
              'meins'=>$meins,
              'lgort'=>$lgort,
              'kostl'=>$kostl,
              'sakto'=>$sakto,
              'charg'=>$charg,
              'bwtar'=>$bwtar,
              'bwart'=>$bwart,
              'shkzg'=>$shkzg,
              'insmk'=>$insmk,
              'kunnr'=>$kunnr,
              'lifnr'=>$lifnr,
              'werks'=>$werks,
              'umwrk'=>$umwrk,
              'umlgo'=>$umlgo

               );
}

$clase = $mseg[0]['bwart'];
$centro = $mseg[0]['werks'];
$almacen = $mseg[0]['lgort'];


$sqlClase = "select * from t156 where bwart = '". $clase ."'";

$resultClase = mysqli_query($con,$sqlClase);

$rowClase = mysqli_fetch_array($resultClase);

$btext=$rowClase['btext'];





$sqlCentro = "select * from t001w where werks = '". $centro ."'";

$resultCentro = mysqli_query($con,$sqlCentro);

$rowCentro = mysqli_fetch_array($resultCentro);

$name1=$rowCentro['name1'];



$sqlAlmacen = "select * from t001l where lgort = '". $almacen ."'";

$resultAlmacen = mysqli_query($con,$sqlAlmacen);

$rowAlmacen = mysqli_fetch_array($resultAlmacen);

$lgobe=$rowAlmacen['lgobe'];


$html = '<header class="clearfix">
      <h1>'.$_empresa.'</h1>
      <div id="cabecera1" class="clearfix">
        <p><label>Documento Material: </label>'.$mseg[0]["bwart"].' - '.$btext.'</p>
        <p><label>Código del Documento: </label>'.$_mblnr.'</p>
        <p><label>Año: </label>'.$_mjahr.'</p>
        <p><label>Centro: </label>'.$mseg[0]["werks"].' - '.$name1.'</p>
        <p><label>Almacén: </label>'.$mseg[0]["lgort"].' - '.$lgobe.'</p>
      </div>
      <div id="cabecera2">
        <p><label>Fecha Documento: </label>'.date_format($bldat, "d/m/Y").'</p>
        <p><label>Fecha Contab.: </label>'.date_format($budat, "d/m/Y").'</p>
        <p><label>Vale Material: </label>'.$mtsnr.'</p>
        <p><label>Ref. Proyecto: </label>'.$bktxt.'</p>';

if ($mseg[0]['bwart'] == '101' || $mseg[0]['bwart'] == '102') {

  $html .= '<p><label>Centro - Destino: </label>'.$mseg[0]["umwrk"].'</p>
            <p><label>Almacén - Destino: </label>'.$mseg[0]["umlgo"].'</p>';
  
}
        
        
$html .='</div>
    </header>
    <main>
      <table>
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nº de material</th>
            <th>Txt. breve mat.</th>
            <th>Cantidad</th>
            <th>Unidad de medida</th>
            <th>Centro de Coste</th>
            <th>Cta. Mayor</th>
            <th>Lote</th>
            <th>Clase de Valoración</th>
            <th>Clase de Movimiento</th>
            <th>Debe/Haber</th>
            <th>Tipo de Stock</th>
            <th>Cliente</th>
            <th>Proveedor</th>
          </tr>
        </thead>
        <tbody>';

$max = sizeof($mseg);

for ($i=0; $i < $max ; $i++) { 

  $html .= "<tr>
            <td>".$mseg[$i]['zeile']."</td>
            <td>".$mseg[$i]['matnr']."</td>
            <td>".$mseg[$i]['maktx']."</td>
            <td>".$mseg[$i]['menge']."</td>
            <td>".$mseg[$i]['meins']."</td>
            <td>".$mseg[$i]['kostl']."</td>
            <td>".$mseg[$i]['sakto']."</td>
            <td>".$mseg[$i]['charg']."</td>
            <td>".$mseg[$i]['bwtar']."</td>
            <td>".$mseg[$i]['bwart']."</td>
            <td>".$mseg[$i]['shkzg']."</td>
            <td>".$mseg[$i]['insmk']."</td>
            <td>".$mseg[$i]['kunnr']."</td>
            <td>".$mseg[$i]['lifnr']."</td>
            </tr>";
  
}



//close_conection($conEmpresa);
close_conection($con);

$html .= "</tbody></table>";

$mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8', 
        'format' => [190, 236], 
        'orientation' => 'L'
]);
$css = file_get_contents('../../assets/estiloPdf.css');
$mpdf -> WriteHTML($css, 1);
$mpdf -> WriteHTML($html);
$mpdf -> WriteHTML('</main>
    <footer>
      <p>SI SE CONTABILIZA</p>
    </footer>');
$mpdf -> Output('reporte.pdf', 'I');



 ?>