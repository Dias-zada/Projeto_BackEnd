<?php
include_once "conexao.php";

$con = new Conexao();

$cep = $_POST['CEP'];
$DataVenda = $_POST['DataVenda'];
$Estado = $_POST['Estado'];
$Cidade = $_POST['Cidade'];
$Bairro = $_POST['Bairro'];
$Rua = $_POST['Rua'];
$Id = $_POST['Id'];


$sql = "insert into vendas (data_Venda, estado_Venda, cidade_Venda, bairro_Venda, rua_Venda, cep_Venda, id_Produto) 
values ('".$DataVenda."','".$Estado."','".$Cidade."','".$Bairro."','".$Rua."','".$cep."','".$Id."');";

$res = mysqli_query($con->getConexao(), $sql);
     
?>