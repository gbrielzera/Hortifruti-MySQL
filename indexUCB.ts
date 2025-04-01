// Importação das bibliotecas necessárias
import * as mysql from 'mysql2/promise'; // Biblioteca para conexão assíncrona com MySQL
const promptSync = require('prompt-sync'); // Biblioteca para capturar entrada do usuário pelo terminal

// Configuração do prompt para capturar entrada do usuário
const prompt = promptSync();

// Configuração da conexão com o banco de dados MySQL
const dbConfig = {
    host: 'localhost', // Endereço do servidor MySQL
    port: 3307, // Porta do servidor MySQL
    user: 'root', // Nome do usuário do banco de dados
    password: 'catolica', // Senha do banco de dados (deve ser configurada corretamente)
    database: 'gestao_produtos' // Nome do banco de dados a ser utilizado
};

let connection: mysql.Connection; // Variável global para armazenar a conexão com o banco

// Definição das interfaces para estruturar os dados de Categoria e Produto
interface Categoria {
    id?: number; // ID opcional, pois é gerado automaticamente pelo banco
    nome: string;
    descricao: string;
    data_criacao?: string; // Data opcional, preenchida pelo banco
}

interface Produto {
    id?: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria_id: number;
    data_criacao?: string;
    data_atualizacao?: string | null;
}

// Função auxiliar para validar entrada numérica
function inputNumber(mensagem: string): number {
    while (true) {
        const input = prompt(mensagem);
        const numero = Number(input);
        if (!isNaN(numero)) return numero;
        console.log("Valor inválido! Digite um número.");
    }
}

// ============================ CRUD PARA CATEGORIAS ============================

// Função para criar uma nova categoria no banco de dados
async function criarCategoria(categoria: Categoria) {
    const [result] = await connection.execute(
        'INSERT INTO categorias (nome, descricao) VALUES (?, ?)',
        [categoria.nome, categoria.descricao]
    );
    return result;
}

// Função para listar todas as categorias do banco de dados
async function listarCategorias() {
    const [rows] = await connection.query('SELECT * FROM categorias');
    return rows;
}

// Função para buscar uma categoria pelo ID
async function buscarCategoriaPorId(id: number) {
    const [rows] = await connection.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows;
}

// Função para atualizar uma categoria existente
async function atualizarCategoria(id: number, categoria: Categoria) {
    const [result] = await connection.execute(
        'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?',
        [categoria.nome, categoria.descricao, id]
    );
    return result;
}

// Função para remover uma categoria pelo ID
async function removerCategoria(id: number) {
    const [result] = await connection.execute('DELETE FROM categorias WHERE id = ?', [id]);
    return result;
}

// ============================ CRUD PARA PRODUTOS ============================

// Função para criar um novo produto no banco de dados
async function criarProduto(produto: Produto) {
    const [result] = await connection.execute(
        'INSERT INTO produtos (nome, descricao, preco, quantidade, categoria_id) VALUES (?, ?, ?, ?, ?)',
        [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria_id]
    );
    return result;
}

// Função para listar todos os produtos
async function listarProdutos() {
    const [rows] = await connection.query('SELECT * FROM produtos');
    return rows;
}

// Função para buscar um produto pelo ID
async function buscarProdutoPorId(id: number) {
    const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows;
}

// Função para atualizar um produto existente
async function atualizarProduto(id: number, produto: Produto) {
    const [result] = await connection.execute(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria_id = ?, data_atualizacao = NOW() WHERE id = ?',
        [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria_id, id]
    );
    return result;
}

// Função para remover um produto pelo ID
async function removerProduto(id: number) {
    const [result] = await connection.execute('DELETE FROM produtos WHERE id = ?', [id]);
    return result;
}
// ============================ MENU DE PRODUTOS ============================
async function menuProdutos() {
    let opcao: number;
    do {
        console.log("\n=== MENU DE PRODUTOS ===");
        console.log("1 - Listar produtos");
        console.log("2 - Adicionar produto");
        console.log("3 - Editar produto");
        console.log("4 - Remover produto");
        console.log("5 - Voltar ao menu principal");
        
        opcao = inputNumber("Escolha: ");
        
        switch (opcao) {
            case 1: 
                const produtos = await listarProdutos();
                console.log("\nLista de Produtos:");
                console.table(produtos);
                break;
            case 2:
                console.log("\nAdicionar novo produto:");
                const novoProduto: Produto = {
                    nome: prompt("Nome: "),
                    descricao: prompt("Descrição: "),
                    preco: inputNumber("Preço: "),
                    quantidade: inputNumber("Quantidade: "),
                    categoria_id: inputNumber("ID da Categoria: ")
                };
                await criarProduto(novoProduto);
                console.log("Produto adicionado com sucesso!");
                break;
            case 3:
                const idEditar = inputNumber("ID do produto a editar: ");
                const produtoEditar: Produto = {
                    nome: prompt("Novo nome: "),
                    descricao: prompt("Nova descrição: "),
                    preco: inputNumber("Novo preço: "),
                    quantidade: inputNumber("Nova quantidade: "),
                    categoria_id: inputNumber("Novo ID da Categoria: ")
                };
                await atualizarProduto(idEditar, produtoEditar);
                console.log("Produto atualizado com sucesso!");
                break;
            case 4:
                const idRemover = inputNumber("ID do produto a remover: ");
                await removerProduto(idRemover);
                console.log("Produto removido com sucesso!");
                break;
            case 5: break;
            default: console.log("Opção inválida!");
        }
    } while (opcao !== 5);
}

// ============================ MENU DE CATEGORIAS ============================
async function menuCategorias() {
    let opcao: number;
    do {
        console.log("\n=== MENU DE CATEGORIAS ===");
        console.log("1 - Listar categorias");
        console.log("2 - Adicionar categoria");
        console.log("3 - Editar categoria");
        console.log("4 - Remover categoria");
        console.log("5 - Voltar ao menu principal");
        
        opcao = inputNumber("Escolha: ");
        
        switch (opcao) {
            case 1: 
                const categorias = await listarCategorias();
                console.log("\nLista de Categorias:");
                console.table(categorias);
                break;
            case 2:
                console.log("\nAdicionar nova categoria:");
                const novaCategoria: Categoria = {
                    nome: prompt("Nome: "),
                    descricao: prompt("Descrição: ")
                };
                await criarCategoria(novaCategoria);
                console.log("Categoria adicionada com sucesso!");
                break;
            case 3:
                const idEditar = inputNumber("ID da categoria a editar: ");
                const categoriaEditar: Categoria = {
                    nome: prompt("Novo nome: "),
                    descricao: prompt("Nova descrição: ")
                };
                await atualizarCategoria(idEditar, categoriaEditar);
                console.log("Categoria atualizada com sucesso!");
                break;
            case 4:
                const idRemover = inputNumber("ID da categoria a remover: ");
                await removerCategoria(idRemover);
                console.log("Categoria removida com sucesso!");
                break;
            case 5: break;
            default: console.log("Opção inválida!");
        }
    } while (opcao !== 5);
}


// ============================ MENU PRINCIPAL ============================

async function menuPrincipal() {
    try {
        // Estabelecendo conexão com o banco de dados
        connection = await mysql.createConnection(dbConfig);
        console.log('Conectado ao MySQL!');

        let opcao: number;
        do {
            console.log("\n=== MENU PRINCIPAL ===");
            console.log("1 - Gestão de Produtos");
            console.log("2 - Gestão de Categorias");
            console.log("3 - Sair");
            
            opcao = inputNumber("Escolha: ");
            
            switch (opcao) {
                case 1: await menuProdutos(); break;
                case 2: await menuCategorias(); break;
                case 3: console.log("Saindo do sistema..."); break;
                default: console.log("Opção inválida!");
            }
        } while (opcao !== 3);
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    } finally {
        if (connection) await connection.end(); // Fechando conexão ao sair
    }
}

// Iniciar o sistema chamando o menu principal
menuPrincipal().catch(console.error);
