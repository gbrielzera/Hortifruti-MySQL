// Importações
import * as mysql from 'mysql2/promise';
const promptSync = require('prompt-sync');

// Configuração do prompt
const prompt = promptSync();

// Configuração da conexão MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_produtos'
};

let connection: mysql.Connection;

// Interfaces
interface Categoria {
    id?: number;
    nome: string;
    descricao: string;
    data_criacao?: string;
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

// Funções auxiliares
function inputNumber(mensagem: string): number {
    while (true) {
        const input = prompt(mensagem);
        const numero = Number(input);
        if (!isNaN(numero)) return numero;
        console.log("Valor inválido! Digite um número.");
    }
}

// Funções CRUD para Categorias
async function criarCategoria(categoria: Categoria) {
    const [result] = await connection.execute(
        'INSERT INTO categorias (nome, descricao) VALUES (?, ?)',
        [categoria.nome, categoria.descricao]
    );
    return result;
}

async function listarCategorias() {
    const [rows] = await connection.query('SELECT * FROM categorias');
    return rows;
}

async function buscarCategoriaPorId(id: number) {
    const [rows] = await connection.query('SELECT * FROM categorias WHERE id = ?', [id]);
    return rows;
}

async function atualizarCategoria(id: number, categoria: Categoria) {
    const [result] = await connection.execute(
        'UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?',
        [categoria.nome, categoria.descricao, id]
    );
    return result;
}

async function removerCategoria(id: number) {
    const [result] = await connection.execute('DELETE FROM categorias WHERE id = ?', [id]);
    return result;
}

// Funções CRUD para Produtos
async function criarProduto(produto: Produto) {
    const [result] = await connection.execute(
        'INSERT INTO produtos (nome, descricao, preco, quantidade, categoria_id) VALUES (?, ?, ?, ?, ?)',
        [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria_id]
    );
    return result;
}

async function listarProdutos() {
    const [rows] = await connection.query('SELECT * FROM produtos');
    return rows;
}

async function buscarProdutoPorId(id: number) {
    const [rows] = await connection.query('SELECT * FROM produtos WHERE id = ?', [id]);
    return rows;
}

async function atualizarProduto(id: number, produto: Produto) {
    const [result] = await connection.execute(
        'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria_id = ?, data_atualizacao = NOW() WHERE id = ?',
        [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria_id, id]
    );
    return result;
}

async function removerProduto(id: number) {
    const [result] = await connection.execute('DELETE FROM produtos WHERE id = ?', [id]);
    return result;
}

// Funções de interface para produtos
async function criarProdutoInterface() {
    console.log("\nCriar novo produto:");
    const nome = prompt("Nome: ");
    const descricao = prompt("Descrição: ");
    const preco = inputNumber("Preço: ");
    const quantidade = inputNumber("Quantidade: ");
    const categoria_id = inputNumber("ID da Categoria: ");

    const produto: Produto = {
        nome,
        descricao,
        preco,
        quantidade,
        categoria_id
    };

    try {
        await criarProduto(produto);
        console.log("Produto criado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar produto:", error);
    }
}

async function listarProdutosInterface() {
    try {
        const produtos = await listarProdutos();
        console.log("\nLista de Produtos:");
        console.table(produtos);
    } catch (error) {
        console.error("Erro ao listar produtos:", error);
    }
}

async function buscarProdutoInterface() {
    console.log("\nBuscar produto por:");
    console.log("1 - ID");
    console.log("2 - Nome");
    console.log("3 - Categoria");
    
    const opcao = inputNumber("Escolha: ");
    
    try {
        switch (opcao) {
            case 1:
                const id = inputNumber("ID do produto: ");
                const produto = await buscarProdutoPorId(id);
                console.table(produto);
                break;
                
            case 2:
                const nome = prompt("Nome do produto: ");
                const [produtosNome] = await connection.query('SELECT * FROM produtos WHERE nome LIKE ?', [`%${nome}%`]);
                console.table(produtosNome);
                break;
                
            case 3:
                const categoriaId = inputNumber("ID da categoria: ");
                const [produtosCategoria] = await connection.query('SELECT * FROM produtos WHERE categoria_id = ?', [categoriaId]);
                console.table(produtosCategoria);
                break;
                
            default:
                console.log("Opção inválida!");
        }
    } catch (error) {
        console.error("Erro ao buscar produto:", error);
    }
}

async function atualizarProdutoInterface() {
    const id = inputNumber("ID do produto a atualizar: ");
    
    try {
        const [produtos]: any = await buscarProdutoPorId(id);
        
        if (produtos.length === 0) {
            console.log("Produto não encontrado!");
            return;
        }
        
        const produto = produtos[0];
        
        console.log("\nDeixe em branco para manter o valor atual");
        const nome = prompt(`Novo nome [${produto.nome}]: `) || produto.nome;
        const descricao = prompt(`Nova descrição [${produto.descricao}]: `) || produto.descricao;
        const preco = Number(prompt(`Novo preço [${produto.preco}]: `) || produto.preco);
        const quantidade = Number(prompt(`Nova quantidade [${produto.quantidade}]: `) || produto.quantidade);
        const categoria_id = Number(prompt(`Nova categoria ID [${produto.categoria_id}]: `) || produto.categoria_id);
        
        await atualizarProduto(id, {
            nome,
            descricao,
            preco,
            quantidade,
            categoria_id
        });
        
        console.log("Produto atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
    }
}

async function removerProdutoInterface() {
    const id = inputNumber("ID do produto a remover: ");
    
    try {
        // Busca o produto para confirmar a existência
        const [produtos]: any = await connection.query('SELECT * FROM produtos WHERE id = ?', [id]);
        
        if (!produtos || produtos.length === 0) {
            console.log("Produto não encontrado!");
            return;
        }

        const produto = produtos[0];
        
        // Confirmação visual antes de remover
        console.log("\nProduto encontrado:");
        console.table([produto]);
        
        const confirmacao = prompt(`\nTem certeza que deseja remover o produto "${produto.nome}"? (s/n) `);
        if (confirmacao.toLowerCase() !== 's') {
            console.log("Operação cancelada!");
            return;
        }
        
        // Executa a remoção
        await connection.execute('DELETE FROM produtos WHERE id = ?', [id]);
        console.log("Produto removido com sucesso!");
    } catch (error) {
        console.error("Erro ao remover produto:", error);
    }
}

// Funções de interface para categorias
async function criarCategoriaInterface() {
    console.log("\nCriar nova categoria:");
    const nome = prompt("Nome: ");
    const descricao = prompt("Descrição: ");

    const categoria: Categoria = {
        nome,
        descricao
    };

    try {
        await criarCategoria(categoria);
        console.log("Categoria criada com sucesso!");
    } catch (error) {
        console.error("Erro ao criar categoria:", error);
    }
}

async function listarCategoriasInterface() {
    try {
        const categorias = await listarCategorias();
        console.log("\nLista de Categorias:");
        console.table(categorias);
    } catch (error) {
        console.error("Erro ao listar categorias:", error);
    }
}

async function buscarCategoriaInterface() {
    console.log("\nBuscar categoria por:");
    console.log("1 - ID");
    console.log("2 - Nome");
    
    const opcao = inputNumber("Escolha: ");
    
    try {
        switch (opcao) {
            case 1:
                const id = inputNumber("ID da categoria: ");
                const categoria = await buscarCategoriaPorId(id);
                console.table(categoria);
                break;
                
            case 2:
                const nome = prompt("Nome da categoria: ");
                const [categoriasNome] = await connection.query('SELECT * FROM categorias WHERE nome LIKE ?', [`%${nome}%`]);
                console.table(categoriasNome);
                break;
                
            default:
                console.log("Opção inválida!");
        }
    } catch (error) {
        console.error("Erro ao buscar categoria:", error);
    }
}

async function atualizarCategoriaInterface() {
    const id = inputNumber("ID da categoria a atualizar: ");
    
    try {
        const [categorias]: any = await buscarCategoriaPorId(id);
        
        if (categorias.length === 0) {
            console.log("Categoria não encontrada!");
            return;
        }
        
        const categoria = categorias[0];
        
        console.log("\nDeixe em branco para manter o valor atual");
        const nome = prompt(`Novo nome [${categoria.nome}]: `) || categoria.nome;
        const descricao = prompt(`Nova descrição [${categoria.descricao}]: `) || categoria.descricao;
        
        await atualizarCategoria(id, {
            nome,
            descricao
        });
        
        console.log("Categoria atualizada com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
    }
}

async function removerCategoriaInterface() {
    const id = inputNumber("ID da categoria a remover: ");
    
    try {
        // Busca a categoria para confirmar existência
        const [categorias]: any = await connection.query('SELECT * FROM categorias WHERE id = ?', [id]);
        
        if (!categorias || categorias.length === 0) {
            console.log("Categoria não encontrada!");
            return;
        }

        const categoria = categorias[0];
        
        // Verifica se existem produtos vinculados
        const [produtos]: any = await connection.query('SELECT id, nome FROM produtos WHERE categoria_id = ?', [id]);
        
        if (produtos && produtos.length > 0) {
            console.log("\nNão é possível remover. Existem produtos vinculados:");
            console.table(produtos);
            return;
        }

        // Confirmação visual antes de remover
        console.log("\nCategoria encontrada:");
        console.table([categoria]);
        
        const confirmacao = prompt(`\nTem certeza que deseja remover a categoria "${categoria.nome}"? (s/n) `);
        if (confirmacao.toLowerCase() !== 's') {
            console.log("Operação cancelada!");
            return;
        }
        
        // Executa a remoção
        await connection.execute('DELETE FROM categorias WHERE id = ?', [id]);
        console.log("Categoria removida com sucesso!");
    } catch (error) {
        console.error("Erro ao remover categoria:", error);
    }
}

// Funções de menu
function exibirMenu() {
    console.log("\nEscolha o que quer fazer:");
    console.log("1 - Criar");
    console.log("2 - Exibir");
    console.log("3 - Buscar");
    console.log("4 - Atualizar");
    console.log("5 - Remover");
    console.log("6 - Voltar ao menu anterior");
}

async function menuProdutos() {
    let opcao: number;
    do {
        console.log("\nMenu de Produtos");
        exibirMenu();
        
        opcao = inputNumber("Insira sua opção: ");

        switch (opcao) {
            case 1: await criarProdutoInterface(); break;
            case 2: await listarProdutosInterface(); break;
            case 3: await buscarProdutoInterface(); break;
            case 4: await atualizarProdutoInterface(); break;
            case 5: await removerProdutoInterface(); break;
            case 6: console.log("Voltando ao menu principal..."); break;
            default: console.log("Opção inválida!");
        }
    } while (opcao !== 6);
}

async function menuCategorias() {
    let opcao: number;
    do {
        console.log("\nMenu de Categorias");
        exibirMenu();
        
        opcao = inputNumber("Insira sua opção: ");

        switch (opcao) {
            case 1: await criarCategoriaInterface(); break;
            case 2: await listarCategoriasInterface(); break;
            case 3: await buscarCategoriaInterface(); break;
            case 4: await atualizarCategoriaInterface(); break;
            case 5: await removerCategoriaInterface(); break;
            case 6: console.log("Voltando ao menu principal..."); break;
            default: console.log("Opção inválida!");
        }
    } while (opcao !== 6);
}

async function menuPrincipal() {
    try {
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
        if (connection) await connection.end();
    }
}

// Iniciar o sistema
menuPrincipal().catch(console.error);