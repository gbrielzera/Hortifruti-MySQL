"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Importações
var mysql = require("mysql2/promise");
var promptSync = require('prompt-sync');
// Configuração do prompt
var prompt = promptSync();
// Configuração da conexão MySQL
var dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_produtos'
};
var connection;
// Funções auxiliares
function inputNumber(mensagem) {
    while (true) {
        var input = prompt(mensagem);
        var numero = Number(input);
        if (!isNaN(numero))
            return numero;
        console.log("Valor inválido! Digite um número.");
    }
}
// Funções CRUD para Categorias
function criarCategoria(categoria) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.execute('INSERT INTO categorias (nome, descricao) VALUES (?, ?)', [categoria.nome, categoria.descricao])];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
            }
        });
    });
}
function listarCategorias() {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.query('SELECT * FROM categorias')];
                case 1:
                    rows = (_a.sent())[0];
                    return [2 /*return*/, rows];
            }
        });
    });
}
function buscarCategoriaPorId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.query('SELECT * FROM categorias WHERE id = ?', [id])];
                case 1:
                    rows = (_a.sent())[0];
                    return [2 /*return*/, rows];
            }
        });
    });
}
function atualizarCategoria(id, categoria) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.execute('UPDATE categorias SET nome = ?, descricao = ? WHERE id = ?', [categoria.nome, categoria.descricao, id])];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
            }
        });
    });
}
function removerCategoria(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.execute('DELETE FROM categorias WHERE id = ?', [id])];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
            }
        });
    });
}
// Funções CRUD para Produtos
function criarProduto(produto) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.execute('INSERT INTO produtos (nome, descricao, preco, quantidade, categoria_id) VALUES (?, ?, ?, ?, ?)', [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria_id])];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
            }
        });
    });
}
function listarProdutos() {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.query('SELECT * FROM produtos')];
                case 1:
                    rows = (_a.sent())[0];
                    return [2 /*return*/, rows];
            }
        });
    });
}
function buscarProdutoPorId(id) {
    return __awaiter(this, void 0, void 0, function () {
        var rows;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.query('SELECT * FROM produtos WHERE id = ?', [id])];
                case 1:
                    rows = (_a.sent())[0];
                    return [2 /*return*/, rows];
            }
        });
    });
}
function atualizarProduto(id, produto) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.execute('UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade = ?, categoria_id = ?, data_atualizacao = NOW() WHERE id = ?', [produto.nome, produto.descricao, produto.preco, produto.quantidade, produto.categoria_id, id])];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
            }
        });
    });
}
function removerProduto(id) {
    return __awaiter(this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.execute('DELETE FROM produtos WHERE id = ?', [id])];
                case 1:
                    result = (_a.sent())[0];
                    return [2 /*return*/, result];
            }
        });
    });
}
// Funções de interface para produtos
function criarProdutoInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var nome, descricao, preco, quantidade, categoria_id, produto, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\nCriar novo produto:");
                    nome = prompt("Nome: ");
                    descricao = prompt("Descrição: ");
                    preco = inputNumber("Preço: ");
                    quantidade = inputNumber("Quantidade: ");
                    categoria_id = inputNumber("ID da Categoria: ");
                    produto = {
                        nome: nome,
                        descricao: descricao,
                        preco: preco,
                        quantidade: quantidade,
                        categoria_id: categoria_id
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, criarProduto(produto)];
                case 2:
                    _a.sent();
                    console.log("Produto criado com sucesso!");
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Erro ao criar produto:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function listarProdutosInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var produtos, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, listarProdutos()];
                case 1:
                    produtos = _a.sent();
                    console.log("\nLista de Produtos:");
                    console.table(produtos);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error("Erro ao listar produtos:", error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function buscarProdutoInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a, id, produto, nome, produtosNome, categoriaId, produtosCategoria, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\nBuscar produto por:");
                    console.log("1 - ID");
                    console.log("2 - Nome");
                    console.log("3 - Categoria");
                    opcao = inputNumber("Escolha: ");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 10, , 11]);
                    _a = opcao;
                    switch (_a) {
                        case 1: return [3 /*break*/, 2];
                        case 2: return [3 /*break*/, 4];
                        case 3: return [3 /*break*/, 6];
                    }
                    return [3 /*break*/, 8];
                case 2:
                    id = inputNumber("ID do produto: ");
                    return [4 /*yield*/, buscarProdutoPorId(id)];
                case 3:
                    produto = _b.sent();
                    console.table(produto);
                    return [3 /*break*/, 9];
                case 4:
                    nome = prompt("Nome do produto: ");
                    return [4 /*yield*/, connection.query('SELECT * FROM produtos WHERE nome LIKE ?', ["%".concat(nome, "%")])];
                case 5:
                    produtosNome = (_b.sent())[0];
                    console.table(produtosNome);
                    return [3 /*break*/, 9];
                case 6:
                    categoriaId = inputNumber("ID da categoria: ");
                    return [4 /*yield*/, connection.query('SELECT * FROM produtos WHERE categoria_id = ?', [categoriaId])];
                case 7:
                    produtosCategoria = (_b.sent())[0];
                    console.table(produtosCategoria);
                    return [3 /*break*/, 9];
                case 8:
                    console.log("Opção inválida!");
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_3 = _b.sent();
                    console.error("Erro ao buscar produto:", error_3);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function atualizarProdutoInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var id, produtos, produto, nome, descricao, preco, quantidade, categoria_id, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = inputNumber("ID do produto a atualizar: ");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, buscarProdutoPorId(id)];
                case 2:
                    produtos = (_a.sent())[0];
                    if (produtos.length === 0) {
                        console.log("Produto não encontrado!");
                        return [2 /*return*/];
                    }
                    produto = produtos[0];
                    console.log("\nDeixe em branco para manter o valor atual");
                    nome = prompt("Novo nome [".concat(produto.nome, "]: ")) || produto.nome;
                    descricao = prompt("Nova descri\u00E7\u00E3o [".concat(produto.descricao, "]: ")) || produto.descricao;
                    preco = Number(prompt("Novo pre\u00E7o [".concat(produto.preco, "]: ")) || produto.preco);
                    quantidade = Number(prompt("Nova quantidade [".concat(produto.quantidade, "]: ")) || produto.quantidade);
                    categoria_id = Number(prompt("Nova categoria ID [".concat(produto.categoria_id, "]: ")) || produto.categoria_id);
                    return [4 /*yield*/, atualizarProduto(id, {
                            nome: nome,
                            descricao: descricao,
                            preco: preco,
                            quantidade: quantidade,
                            categoria_id: categoria_id
                        })];
                case 3:
                    _a.sent();
                    console.log("Produto atualizado com sucesso!");
                    return [3 /*break*/, 5];
                case 4:
                    error_4 = _a.sent();
                    console.error("Erro ao atualizar produto:", error_4);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function removerProdutoInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var id, produtos, produto, confirmacao, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = inputNumber("ID do produto a remover: ");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, connection.query('SELECT * FROM produtos WHERE id = ?', [id])];
                case 2:
                    produtos = (_a.sent())[0];
                    if (!produtos || produtos.length === 0) {
                        console.log("Produto não encontrado!");
                        return [2 /*return*/];
                    }
                    produto = produtos[0];
                    // Confirmação visual antes de remover
                    console.log("\nProduto encontrado:");
                    console.table([produto]);
                    confirmacao = prompt("\nTem certeza que deseja remover o produto \"".concat(produto.nome, "\"? (s/n) "));
                    if (confirmacao.toLowerCase() !== 's') {
                        console.log("Operação cancelada!");
                        return [2 /*return*/];
                    }
                    // Executa a remoção
                    return [4 /*yield*/, connection.execute('DELETE FROM produtos WHERE id = ?', [id])];
                case 3:
                    // Executa a remoção
                    _a.sent();
                    console.log("Produto removido com sucesso!");
                    return [3 /*break*/, 5];
                case 4:
                    error_5 = _a.sent();
                    console.error("Erro ao remover produto:", error_5);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
// Funções de interface para categorias
function criarCategoriaInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var nome, descricao, categoria, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("\nCriar nova categoria:");
                    nome = prompt("Nome: ");
                    descricao = prompt("Descrição: ");
                    categoria = {
                        nome: nome,
                        descricao: descricao
                    };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, criarCategoria(categoria)];
                case 2:
                    _a.sent();
                    console.log("Categoria criada com sucesso!");
                    return [3 /*break*/, 4];
                case 3:
                    error_6 = _a.sent();
                    console.error("Erro ao criar categoria:", error_6);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function listarCategoriasInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var categorias, error_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, listarCategorias()];
                case 1:
                    categorias = _a.sent();
                    console.log("\nLista de Categorias:");
                    console.table(categorias);
                    return [3 /*break*/, 3];
                case 2:
                    error_7 = _a.sent();
                    console.error("Erro ao listar categorias:", error_7);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function buscarCategoriaInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a, id, categoria, nome, categoriasNome, error_8;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\nBuscar categoria por:");
                    console.log("1 - ID");
                    console.log("2 - Nome");
                    opcao = inputNumber("Escolha: ");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 8, , 9]);
                    _a = opcao;
                    switch (_a) {
                        case 1: return [3 /*break*/, 2];
                        case 2: return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 6];
                case 2:
                    id = inputNumber("ID da categoria: ");
                    return [4 /*yield*/, buscarCategoriaPorId(id)];
                case 3:
                    categoria = _b.sent();
                    console.table(categoria);
                    return [3 /*break*/, 7];
                case 4:
                    nome = prompt("Nome da categoria: ");
                    return [4 /*yield*/, connection.query('SELECT * FROM categorias WHERE nome LIKE ?', ["%".concat(nome, "%")])];
                case 5:
                    categoriasNome = (_b.sent())[0];
                    console.table(categoriasNome);
                    return [3 /*break*/, 7];
                case 6:
                    console.log("Opção inválida!");
                    _b.label = 7;
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_8 = _b.sent();
                    console.error("Erro ao buscar categoria:", error_8);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function atualizarCategoriaInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var id, categorias, categoria, nome, descricao, error_9;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = inputNumber("ID da categoria a atualizar: ");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, buscarCategoriaPorId(id)];
                case 2:
                    categorias = (_a.sent())[0];
                    if (categorias.length === 0) {
                        console.log("Categoria não encontrada!");
                        return [2 /*return*/];
                    }
                    categoria = categorias[0];
                    console.log("\nDeixe em branco para manter o valor atual");
                    nome = prompt("Novo nome [".concat(categoria.nome, "]: ")) || categoria.nome;
                    descricao = prompt("Nova descri\u00E7\u00E3o [".concat(categoria.descricao, "]: ")) || categoria.descricao;
                    return [4 /*yield*/, atualizarCategoria(id, {
                            nome: nome,
                            descricao: descricao
                        })];
                case 3:
                    _a.sent();
                    console.log("Categoria atualizada com sucesso!");
                    return [3 /*break*/, 5];
                case 4:
                    error_9 = _a.sent();
                    console.error("Erro ao atualizar categoria:", error_9);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function removerCategoriaInterface() {
    return __awaiter(this, void 0, void 0, function () {
        var id, categorias, categoria, produtos, confirmacao, error_10;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = inputNumber("ID da categoria a remover: ");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, connection.query('SELECT * FROM categorias WHERE id = ?', [id])];
                case 2:
                    categorias = (_a.sent())[0];
                    if (!categorias || categorias.length === 0) {
                        console.log("Categoria não encontrada!");
                        return [2 /*return*/];
                    }
                    categoria = categorias[0];
                    return [4 /*yield*/, connection.query('SELECT id, nome FROM produtos WHERE categoria_id = ?', [id])];
                case 3:
                    produtos = (_a.sent())[0];
                    if (produtos && produtos.length > 0) {
                        console.log("\nNão é possível remover. Existem produtos vinculados:");
                        console.table(produtos);
                        return [2 /*return*/];
                    }
                    // Confirmação visual antes de remover
                    console.log("\nCategoria encontrada:");
                    console.table([categoria]);
                    confirmacao = prompt("\nTem certeza que deseja remover a categoria \"".concat(categoria.nome, "\"? (s/n) "));
                    if (confirmacao.toLowerCase() !== 's') {
                        console.log("Operação cancelada!");
                        return [2 /*return*/];
                    }
                    // Executa a remoção
                    return [4 /*yield*/, connection.execute('DELETE FROM categorias WHERE id = ?', [id])];
                case 4:
                    // Executa a remoção
                    _a.sent();
                    console.log("Categoria removida com sucesso!");
                    return [3 /*break*/, 6];
                case 5:
                    error_10 = _a.sent();
                    console.error("Erro ao remover categoria:", error_10);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
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
function menuProdutos() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\nMenu de Produtos");
                    exibirMenu();
                    opcao = inputNumber("Insira sua opção: ");
                    _a = opcao;
                    switch (_a) {
                        case 1: return [3 /*break*/, 1];
                        case 2: return [3 /*break*/, 3];
                        case 3: return [3 /*break*/, 5];
                        case 4: return [3 /*break*/, 7];
                        case 5: return [3 /*break*/, 9];
                        case 6: return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 12];
                case 1: return [4 /*yield*/, criarProdutoInterface()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 3: return [4 /*yield*/, listarProdutosInterface()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 5: return [4 /*yield*/, buscarProdutoInterface()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 7: return [4 /*yield*/, atualizarProdutoInterface()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 9: return [4 /*yield*/, removerProdutoInterface()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 11:
                    console.log("Voltando ao menu principal...");
                    return [3 /*break*/, 13];
                case 12:
                    console.log("Opção inválida!");
                    _b.label = 13;
                case 13:
                    if (opcao !== 6) return [3 /*break*/, 0];
                    _b.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    });
}
function menuCategorias() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\nMenu de Categorias");
                    exibirMenu();
                    opcao = inputNumber("Insira sua opção: ");
                    _a = opcao;
                    switch (_a) {
                        case 1: return [3 /*break*/, 1];
                        case 2: return [3 /*break*/, 3];
                        case 3: return [3 /*break*/, 5];
                        case 4: return [3 /*break*/, 7];
                        case 5: return [3 /*break*/, 9];
                        case 6: return [3 /*break*/, 11];
                    }
                    return [3 /*break*/, 12];
                case 1: return [4 /*yield*/, criarCategoriaInterface()];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 3: return [4 /*yield*/, listarCategoriasInterface()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 5: return [4 /*yield*/, buscarCategoriaInterface()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 7: return [4 /*yield*/, atualizarCategoriaInterface()];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 9: return [4 /*yield*/, removerCategoriaInterface()];
                case 10:
                    _b.sent();
                    return [3 /*break*/, 13];
                case 11:
                    console.log("Voltando ao menu principal...");
                    return [3 /*break*/, 13];
                case 12:
                    console.log("Opção inválida!");
                    _b.label = 13;
                case 13:
                    if (opcao !== 6) return [3 /*break*/, 0];
                    _b.label = 14;
                case 14: return [2 /*return*/];
            }
        });
    });
}
function menuPrincipal() {
    return __awaiter(this, void 0, void 0, function () {
        var opcao, _a, error_11;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, 12, 15]);
                    return [4 /*yield*/, mysql.createConnection(dbConfig)];
                case 1:
                    connection = _b.sent();
                    console.log('Conectado ao MySQL!');
                    opcao = void 0;
                    _b.label = 2;
                case 2:
                    console.log("\n=== MENU PRINCIPAL ===");
                    console.log("1 - Gestão de Produtos");
                    console.log("2 - Gestão de Categorias");
                    console.log("3 - Sair");
                    opcao = inputNumber("Escolha: ");
                    _a = opcao;
                    switch (_a) {
                        case 1: return [3 /*break*/, 3];
                        case 2: return [3 /*break*/, 5];
                        case 3: return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 8];
                case 3: return [4 /*yield*/, menuProdutos()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 5: return [4 /*yield*/, menuCategorias()];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 9];
                case 7:
                    console.log("Saindo do sistema...");
                    return [3 /*break*/, 9];
                case 8:
                    console.log("Opção inválida!");
                    _b.label = 9;
                case 9:
                    if (opcao !== 3) return [3 /*break*/, 2];
                    _b.label = 10;
                case 10: return [3 /*break*/, 15];
                case 11:
                    error_11 = _b.sent();
                    console.error('Erro ao conectar ao banco de dados:', error_11);
                    return [3 /*break*/, 15];
                case 12:
                    if (!connection) return [3 /*break*/, 14];
                    return [4 /*yield*/, connection.end()];
                case 13:
                    _b.sent();
                    _b.label = 14;
                case 14: return [7 /*endfinally*/];
                case 15: return [2 /*return*/];
            }
        });
    });
}
// Iniciar o sistema
menuPrincipal().catch(console.error);
