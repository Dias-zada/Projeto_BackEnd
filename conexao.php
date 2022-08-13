<?php

class Conexao{
    //Setando parametros para o acesso ao banco de dados 
    private $host = "localhost";
    private $user = "root";
    private $pass = "";
    private $db = "projeto_backend";
    private $con;

    //O método die é executado quando ocorre um erro na conexão, ele manda uma mensagem sobre o erro
    function __construct(){
        $this->con = mysqli_connect($this->host, $this->user, $this->pass, $this->db) or die
        ($this->con->error."\nSem conexão com o servidor, Host=".$this->host." User=".$this->user." Pass=".$this->pass." Db=".$this->db);
    }

    //Pegar o valor da conexão;
    function getConexao(){
        return $this->con;
    }

    //Fechar a conexão do mysql quando chamado
    function FecharConexao(){
        mysqli_close($this->con);
    }
}

?>