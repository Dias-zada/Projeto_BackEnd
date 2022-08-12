<?php
include_once "conexao.php";

$con = new Conexao();

if(isset($_POST['input'])){

    $input = $_POST['input'];
    $sql = "select id_Produto, nome_Produto, referencia_Produto, preco_Produto from Produtos where
     nome_Produto= '".$input."' or referencia_Produto='".$input."' order by id_Produto ASC;";
    $res = mysqli_query($con->getConexao(), $sql);
}

$cont = 0;

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
                while($rows = mysqli_fetch_assoc($res)){
                    extract($rows);
                    $cont++;
                
                ?>   
                    <tr>
                        <td><?php echo $nome_Produto ?></td>
                        <td><?php echo $referencia_Produto ?></td>
                        <td><?php echo $preco_Produto ?></td>
                        <td><button id='<?php echo "btnVenda".$cont ?>' class='w-100 mb-2 btn btn-lg rounded-4 btn-dark' value ='<?php echo $id_Produto ?>' >Venda</button></td>
                    </tr>
            <?php
                }
            ?>
        
        </tbody>                   
    </table>
    <div id = "cont" class ="test" style = "display: none"><?php echo $cont ?></div>        
<?php
}
?>