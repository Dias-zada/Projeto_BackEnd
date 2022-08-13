<?php
//Chamando a pagina conexao.php para ter acesso a conexão com banco de dados
include_once "conexao.php";

//Cria o Objeto para realizar conexão com o banco de dados e executar comandos
$con = new Conexao();

//Verificar se tem algo escrito dentro do input, que nesse caso esse input é
if(isset($_POST['input'])){

    $input = $_POST['input'];

    //Comando sql para selecionar o dados
    $sql = "select nome_Produto, referencia_Produto, preco_Produto from Produtos where
     nome_Produto= '".$input."' or referencia_Produto='".$input."' order by referencia_Produto ASC;";
    
    //Executa o comando sql e receba os dados que vem da query
     $res = mysqli_query($con->getConexao(), $sql);
}

$cont = 0;

//Verifica se houve algum resultado no comando sql acima, caso sim começa a criar a tabela dos produtos referente as input
if(mysqli_num_rows($res)>0){?>

    <table class="table table-striped table-light">
        <thead>
            <tr>
                <th scope="col">Nome</th>
                <th scope="col">Referencia</th>
                <th scope="col">Preço</th>
                <th scope="col">Opção 1</th>
            </tr>
        </thead>
        <tbody>
            <?php
            //Laço de repitição para criar os campos da tabela com os dados do mysql dados
                while($rows = mysqli_fetch_assoc($res)){
                    extract($rows);
                    $cont++;
                
                ?>   
                    <tr>
                        <td><?php echo $nome_Produto ?></td>
                        <td><?php echo $referencia_Produto ?></td>
                        <td><?php echo $preco_Produto ?></td>
                        <td><button id='<?php echo "btnVenda".$cont ?>' class='w-100 mb-2 btn btn-lg rounded-4 btn-dark' value ='<?php echo $referencia_Produto ?>' >Venda</button></td>
                    </tr>
            <?php
                }
            ?>
        
        </tbody>                   
    </table>
    <!--Envia o numero de produtos que foram pesquisados-->
    <div id = "cont" class ="test" style = "display: none"><?php echo $cont ?></div>        
<?php
}
?>