#Projeto_BackEnd
Projeto desenvolvido por João Vitor Dias, focado em BackEnd para Cadastro de Venda

Para criar o banco de dado pasta copiar o codigo abaixo, nele tambem já estão incluidos insert dos produtos e fornecedores
Tambem o ER do banco de dados esta contindo na pasta recursos como um png

COMANDO MYSQL PARA CRIAR BANCO:
----------------------------------------------------------------------------
create database projeto_backend;
use projeto_backend;

create table Produtos(
referencia_Produto int primary key auto_increment not null,
nome_Produto varchar(50) not null,
preco_Produto double not null
);

create table Vendas(
id_Venda int primary key auto_increment not null,
data_Venda varchar(50) not null,
estado_Venda varchar(50) not null,
cidade_Venda varchar(50) not null,
bairro_Venda varchar(50) not null,
rua_Venda varchar(50) not null,
cep_Venda int not null,
referencia_Produto int not null,
FOREIGN KEY (referencia_Produto) REFERENCES Produtos (referencia_Produto)
);

create table Fornecedor(
id_Fornecedor int primary key auto_increment not null,
nome_Fornecedor varchar(50) not null,
referencia_Produto int not null,
FOREIGN KEY (referencia_Produto) REFERENCES Produtos (referencia_Produto)
)

#A partir daqui serão adicionados os insert para produtos e para fornecedores

insert into  produtos (referencia_Produto, nome_Produto, preco_Produto) VALUES (1, 'A', 10);
insert into  produtos (referencia_Produto, nome_Produto, preco_Produto) VALUES (2, 'B', 10);
insert into  produtos (referencia_Produto, nome_Produto, preco_Produto) VALUES (3, 'C', 30);
insert into  produtos (referencia_Produto, nome_Produto, preco_Produto) VALUES (4, 'D', 20);
insert into  produtos (referencia_Produto, nome_Produto, preco_Produto) VALUES (5, 'A', 40);

insert into  fornecedor (id_Fornecedor, nome_Fornecedor, referencia_Produto) VALUES (1, 'Forn A', 1);
insert into  fornecedor (id_Fornecedor, nome_Fornecedor, referencia_Produto) VALUES (2, 'Forn B', 2);
insert into  fornecedor (id_Fornecedor, nome_Fornecedor, referencia_Produto) VALUES (3, 'Forn C', 1);
insert into  fornecedor (id_Fornecedor, nome_Fornecedor, referencia_Produto) VALUES (4, 'Forn D', 4);
insert into  fornecedor (id_Fornecedor, nome_Fornecedor, referencia_Produto) VALUES (5, 'Forn A', 5);

----------------------------------------------------------------------------

EXPLICAÇÃO DO SITE:

Ao entra no site tem uma tabela que informa todos os produtos existente e uma caixa de texto, que é usada para pesquisar o produto que se é desejado vender,
após digitar tanto o nome do produto quanto refencia, ira aparecer em outra tabela os produto(s) com o mesmo nome ou referencia do digitado. O ultimo item da tabela é um botão, que ao ser clickado vai abrir uma janela onde você deve adicionar a data da venda e o cep da mesma para que possa concluir a venda. Com todas as informações corretas é necessario que clicke no botão Venda, adiante irá aparecer mais uma tabela com a informação de todas as sua vendas e o valor total delas
