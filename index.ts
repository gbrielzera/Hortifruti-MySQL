// Importação das bibliotecas necessárias
import * as mysql from 'mysql2/promise'; // Biblioteca para conexão assíncrona com MySQL
const promptSync = require('prompt-sync'); // Biblioteca para capturar entrada do usuário pelo terminal

// Configuração do prompt para capturar entrada do usuário
const prompt = promptSync();

// Configuração da conexão com o banco de dados MySQL
const dbConfig = {
    host: 'localhost', // Endereço do servidor MySQL
    user: 'root', // Nome do usuário do banco de dados
    password: '', // Senha do banco de dados (deve ser configurada corretamente)
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
