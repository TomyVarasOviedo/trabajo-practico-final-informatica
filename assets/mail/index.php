$nombre = $_POST['name'];
$correo = $_POST['email'];
$mensaje = $_POST['message'];

if(!empty($nombre) && !empty($correo) && !empty($mensaje)){
    $asunto = "Consulta sobre procesadores de ".$nombre;
    $header = "From: tomas.varas@comunidad.ub.edu.ar" . "\r\n";
    $header .= "Reply-to: tomas.varas@comunidad.ub.edu.ar";
    $header .= "X-mailer: PHP/". phpversion();
    $mail = mail($correo, $asunto, $mensaje, $header);
    if($mail){
        echo "Enviado";
    }
}