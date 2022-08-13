<?php
    //Chamando a pagina conexao.php para ter acesso a conexão com banco de dados
    include_once "conexao.php";

    //Cria uma session para pegar o valor final das vendas
    session_start();
    $_SESSION["precoFinal"]= 0;

    //Cria o Objeto para realizar conexão com o banco de dados e executar comandos
    $con = new Conexao();

    //Comando sql para selecionar os dados do produto
    $sql = "select nome_Produto, referencia_Produto, preco_Produto from produtos";
    
    //Executa o comando sql e receba os dados que vem da query
    $res = mysqli_query($con->getConexao(), $sql);

    $dados = "";
    //Com a o valor do $res é feito um while que ira adicionar 
    //os dados do produto em uma tabela
    while($rows = mysqli_fetch_assoc($res)){
        extract($rows);
        $dados .= "<tr>
                        <td>$nome_Produto</td>
                        <td>$referencia_Produto</td>
                        <td>$preco_Produto</td>
                    </tr>";
    }
    echo $dados;
?>