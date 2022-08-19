var sqlTotal = "";
var cont = 0;

if(localStorage.cont){
    criarTabela(contFinal2,cont);
    var contFinal2 = localStorage.getItem("cont", cont);
}

//Criando uma função assincrona para listar todos os produtos e apresenta em uma tabela
const listarProdutos = async () =>{
    const tbody = document.querySelector("#tabela");
    const dados = await fetch("./tabela.php");
    const reposta = await dados.text();
    tbody.innerHTML = reposta;
}

//Chamando listarProdutos
listarProdutos();

//Comando inicia junto do site
$(document).ready(function(){

    //Caso alguma tecla for digitada dentro do input com id serach 
    $("#search").keyup(function(){
        var input = $(this).val();
        //Verifica se o input está vazio ou não, caso não ele envia um requisão ajax para o 
        //produto.php 
        if(input != ""){
            $.ajax({

                url:"produtos.php",
                method:"POST",
                data:{input:input},
                
                //Se ocorrer tudo certo, será apresenta as informações do produto pesquisado
                success:function(data){
                    $("#teste").css("display", "block");
                    $("#teste").html(data);
                    clickarBotao();
                }
            });    
        }else{
            $("#teste").css("display", "none");
        }
    });

});

function clickarBotao(){
    const popup = document.querySelector('.popup-wrapper');
    //const closeButton = document.querySelector('.popup-close');

    //Evento que verifica se foi clicado em algum componente com a classe igual a 'popup-close' ou 'popup-wrapper'
    //se algum componente for clickado, será alterado o display do popup tornando-o none e ficando "invisivel"
    popup.addEventListener('click', ()=>{
        const classNameOfClickedElement = event.target.classList[0];
        const className = ['popup-close', 'popup-wrapper'];
        const shouldClosePopup = className.some(className=>className===classNameOfClickedElement);
        if(shouldClosePopup){
            popup.style.display = 'none'
            limparFormulario();
        }
    })

    //Se o esc for clickado ele fecha o popup tbm
    document.onkeyup = function(e){
        if (e.keyCode == 27) {
            popup.style.display = 'none'
          }
    }


    //Pega o texto de algum componente de tenha id test.
    //O texto dessa div vem do produtos.php, para ter o coontrole do numero de resposta que veio do pesquisador
    var div = parseInt($(".test").text());
    for(var x = 0; x<=div; x++){
        const numero = "btnVenda"+x;
        const button = document.getElementById(numero);
        
        //Pega valor de cada btnVenda e inseri em uma div com id txtId
        if(button){
            button.addEventListener('click',()=>{
                popup.style.display = 'block';
                const btn = document.getElementById(numero).value;
                document.getElementById('txtId').value = btn;
                const date = new Date();
                const dia = date.getDate();
                var mes = date.getMonth() + 1;
                if(mes<10){
                    mes = "0"+mes;
                }
                const ano = date.getFullYear()
                document.getElementById('txtDataVenda').value = dia+"-"+mes+"-"+ano;
                cep();
            });
        }
    }
}

//Função para para preencher os campos relacionados ao cpf 
function cep(){

    //Evento que ocorre quando o input do CEP é deselecionado, ativo o focusout
    document.getElementById('txtCEP')
    .addEventListener('focusout',async()=>{
        //Pega o valor que esta dentro do input do CEP
        const cep = document.getElementById('txtCEP').value;
        //Pega o json dos dados de endereço vindo da WebApi viacep
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        //Manda para uma função que verifica se não tem letra no cep, caso for True um fetch com a url
        //para a WebApi, se o cep que foi junto com a url estiver errado entra no if e mostrara que não encotro o cep
        //caso o cep estaja certo ele chama a função preencherFormulario
        if(cepValido(cep)){
            const dados = await fetch(url);
            const endereco = await dados.json();
            if(endereco.hasOwnProperty('erro')){
                document.getElementById('txtRua').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtBairro').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtCidade').value = "CEP NÃO ENCONTRADO";
                document.getElementById('txtEstado').value = "CEP NÃO ENCONTRADO";
            }else{
                preencherFormulario(endereco);
            }
        }else{
            document.getElementById('endereco').value = "CEP incorreto!";
        }
    
    });

}

const cepValido = (cep) =>  /^[0-9]+$/.test(cep);

//Preenche os input com dados do endereço do CEP
const preencherFormulario= (endereco) =>{
    document.getElementById('txtRua').value = endereco.logradouro;
    document.getElementById('txtBairro').value = endereco.bairro;
    document.getElementById('txtCidade').value = endereco.localidade;
    document.getElementById('txtEstado').value = endereco.uf;

}

//Limpa os dados que estão no input
const limparFormulario= () =>{
    document.getElementById('txtDataVenda').value = '';
    document.getElementById('txtCEP').value = '';
    document.getElementById('txtRua').value = '';
    document.getElementById('txtBairro').value = '';
    document.getElementById('txtCidade').value = '';
    document.getElementById('txtEstado').value = '';

}

//Função que é usada para criar a tabela das vendas, recebe um json com as informações de cada venda
function criarTabela(contFinal,cont){
    if(cont == 0){
        var cont2 = 1;
    }else{
        var cont2 = cont;
    }
    for(var x = cont2; x<=contFinal;x++){
        //Nessa function é usado o createElement para criar o local na table onde os dados vindo do json serão posto
        const corpoTabela = document.getElementById("corpoTabela");
        const linhaTabela = document.createElement("tr");

        const elemento1Tabela = document.createElement("td");
        const elemento2Tabela = document.createElement("td");
        const elemento3Tabela = document.createElement("td");

        //Adiciona os dados da Venda
        elemento1Tabela.appendChild(document.createTextNode(localStorage.getItem('nome'+x)));
        elemento2Tabela.appendChild(document.createTextNode(localStorage.getItem('preco'+x)));
        elemento3Tabela.appendChild(document.createTextNode(localStorage.getItem('fornecedores'+x)));

        linhaTabela.appendChild(elemento1Tabela);
        linhaTabela.appendChild(elemento2Tabela);
        linhaTabela.appendChild(elemento3Tabela);

        corpoTabela.appendChild(linhaTabela);
        //No json vem o dado que informa o preço final das vendas, que é passado como parametro para o contarPreco
    }
}

function salvarDados(json){
    cont++;
    localStorage.setItem("cont", cont);
    localStorage.setItem("nome"+cont, json['nome']);
    localStorage.setItem("preco"+cont, json['preco']);
    localStorage.setItem("fornecedores"+cont, json['fornecedores']);
    sqlTotal = sqlTotal+"/"+(json['sql']);
    const numeroTeste = json['precoFinal'];
    var contFinal = localStorage.getItem("cont", cont)
    criarTabela(contFinal,cont);
    contarPreco(numeroTeste);
}

//Função que recebe o preço final das vendas e insere numa div
function contarPreco(numeroTeste){
    document.getElementById('precoTabela').innerHTML = "Preço Total: "+numeroTeste; 
}

//pega o form inteiro que sera lido pelo FormData
const form = document.getElementById("form");

//Colocando um listener que é ativado quando o botão para cadastrar a venda presnete no 
//Formulario da Venda é apertado
form.addEventListener("submit", function(event){
    event.preventDefault();

    //FormData é um metodo que ja consegue trabalhar com os dados vindo de um form, sem ter que escrever dado por dado que será enviado
    let data = new FormData(form);

    //Objeto Xml para realizar a requisão com o vendas.php
    let httpRequest = new XMLHttpRequest();

    //Logistica para realizar a requisição, realizando a requisição com vendas.php e setando o metodo POST 
    httpRequest.open("POST", "vendas.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    //Envia os dados
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        //Estrutura condicionais para verificar a requisição foi feita e não ocorreu nenhum erro
        if(this.readyState == 4){
            if(this.status == 200){
                //Trata o json que é enviado do vendas.php
                const json = JSON.parse(this.response);
                //Fecha o popup
                const popup = document.querySelector('.popup-wrapper');
                //Envia json como paramentro para criar tabela de vendas
                salvarDados(json);
                popup.style.display = 'none'
                limparFormulario();
            }
        }
    }
});


const botaoVenda = document.getElementById("venda");

botaoVenda.addEventListener("click", function(event){
    $.ajax({

        url:"vendaFinal.php",
        method:"POST",
        data:{input:sqlTotal},
        
        //Se ocorrer tudo certo, será apresenta as informações do produto pesquisado
        success:function(data){
            alert("Vendas realizadas com sucesso");
            tabelaPreco();
        }
    });    
    
})

function tabelaPreco(){
    localStorage.clear();
    document.location.reload(true);
}