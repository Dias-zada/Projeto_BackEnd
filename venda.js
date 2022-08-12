
$(document).ready(function(){
    $("#search").keyup(function(){
        var input = $(this).val();
        if(input != ""){
            $.ajax({

                url:"produtos.php",
                method:"POST",
                data:{input:input},

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

    popup.addEventListener('click', ()=>{
        const classNameOfClickedElement = event.target.classList[0];
        const className = ['popup-close', 'popup-wrapper'];
        const shouldClosePopup = className.some(className=>className===classNameOfClickedElement);
        if(shouldClosePopup){
            popup.style.display = 'none'
            limparFormulario();
        }
    })

    document.onkeyup = function(e){
        if (e.keyCode == 27) {
            popup.style.display = 'none'
          }
    }

    var div = parseInt($(".test").text());
    for(var x = 0; x<=div; x++){
        const numero = "btnVenda"+x;
        const button = document.getElementById(numero);
        if(button){
            button.addEventListener('click',()=>{
                popup.style.display = 'block';
                const btn = document.getElementById(numero).value;
                document.getElementById('txtId').value = btn;
                cep();
            });
        }
    }
}

function cep(){
    document.getElementById('txtCEP')
    .addEventListener('focusout',async()=>{
        const cep = document.getElementById('txtCEP').value;
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        //fetch(url).then(responde => responde.json()).then(console.log);
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

const preencherFormulario= (endereco) =>{
    document.getElementById('txtRua').value = endereco.logradouro;
    document.getElementById('txtBairro').value = endereco.bairro;
    document.getElementById('txtCidade').value = endereco.localidade;
    document.getElementById('txtEstado').value = endereco.uf;

}

const limparFormulario= () =>{
    document.getElementById('txtDataVenda').value = '';
    document.getElementById('txtCEP').value = '';
    document.getElementById('txtRua').value = '';
    document.getElementById('txtBairro').value = '';
    document.getElementById('txtCidade').value = '';
    document.getElementById('txtEstado').value = '';

}


const form = document.getElementById("form");

//Colocando um listener para alterar o comportamento do Form
form.addEventListener("submit", function(event){
    event.preventDefault();

    let data = new FormData(form);
    let httpRequest = new XMLHttpRequest();

    httpRequest.open("POST", "vendas.php");
    httpRequest.setRequestHeader("X-Content-Type-Options", "multipart/form-data");
    httpRequest.send(data);
    httpRequest.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                limparFormulario();
                alert("Venda Registrada");
            }else{
            }
        }
    }
});


