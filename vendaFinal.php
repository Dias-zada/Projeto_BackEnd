<?php
//Chamando a pagina conexao.php para ter acesso a conexão com banco de dados
include_once "conexao.php";
$con = new Conexao();

$cep = $_POST["input"];
$teste = explode("/", $cep);
$result = count($teste);
for($x=1;$x<=$result-1; $x++){
    $res = mysqli_query($con->getConexao(), $teste[$x]);
}

?>
