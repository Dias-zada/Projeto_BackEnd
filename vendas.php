<?php
//Chamando a pagina conexao.php para ter acesso a conexão com banco de dados
include_once "conexao.php";

//Inicia a session para pegar obter/tratar o preço final da venda
session_start();

//Cria o Objeto para realizar conexão com o banco de dados e executar comandos
$con = new Conexao();

//Obtem os valores vindo do POST
$cep = $_POST['CEP'];
$DataVenda = $_POST['DataVenda'];
$Estado = $_POST['Estado'];
$Cidade = $_POST['Cidade'];
$Bairro = $_POST['Bairro'];
$Rua = $_POST['Rua'];
$Id = $_POST['Id'];
$precoFinal = $_SESSION['precoFinal'];

//Inserir os dados da Venda no banco de dados
$sql = "insert into vendas (data_Venda, estado_Venda, cidade_Venda, bairro_Venda, rua_Venda, cep_Venda, referencia_Produto) 
values ('".$DataVenda."','".$Estado."','".$Cidade."','".$Bairro."','".$Rua."','".$cep."','".$Id."');";

//Executa o comando sql e receba os dados que vem da query
$res = mysqli_query($con->getConexao(), $sql);


//Comando sql para pegar o nome dos fornecedores
$sql = "select nome_Fornecedor from fornecedor where referencia_Produto = '".$Id."';";
$res = mysqli_query($con->getConexao(), $sql);

$fornecedor="";

//Laço de repetição para pegar o dados presentes no $res e inserir numa variavel para uso
while($rows = mysqli_fetch_assoc($res)){
    $fornecedor .= $rows['nome_Fornecedor'].", ";
}
$fornecedor = rtrim($fornecedor, ", ");

//Fim do sql

//Comando sql para pegar o nome do produto
$sql = "select nome_Produto, preco_Produto from produtos where referencia_Produto = '".$Id."';";
$res = mysqli_query($con->getConexao(), $sql);

//Laço de repetição para pegar o dados presentes no $res e inserir em variavel para uso
while($rows = mysqli_fetch_assoc($res)){
    $nome = $rows['nome_Produto'];
    $preco = $rows['preco_Produto'];
}

//Fim do sql

//Soma o preço do produto atual com os anteriores e insere um novo valor na session
$precoTabela = $precoFinal+$preco;
$_SESSION["precoFinal"]= $precoTabela;

//Cria uma array dos dados para formar a tabela, à transforma em um json e retorna o json
$dados = array(
    "nome" => $nome,
    "preco" => $preco,
    "fornecedores" => $fornecedor,
    "precoFinal" => $precoTabela
);
$json = json_encode($dados);
echo ($json);
return;
     
?>