const mysql = require('mysql2/promise');

class ModeloCliente{
    constructor(){
        this.pool = mysql.createPool({
            host:'127.0.0.1',
            user: 'root',
            password:'',
            database:'mcliente',
        });
    }

    async criarCliente(cliente) {
        const connection = await this.pool.getConnection();
        try{
            const [resultado] = await connection.query(
                'insert into clientes (nome, endereco, cidade) values(?, ?, ?)',
                [cliente.nome, cliente.endereco, cliente.cidade]
            );
            return resultado.insertId;
        } finally {
            connection.release();
        }
    }

    async obterTodosClientes() {
        const connection = await this.pool.getConnection();
        try{
            const [registros] = await connection.query(
                'select * from clientes'
            );
            return registros;
        } finally {
            connection.release();
        }
    }

    async obterClientePorId(id) {
        const connection = await this.pool.getConnection();
        try{
            const [registros] = await connection.query(
                'select * from clientes where id = ?',
                [id]
            );
            return registros[0];
        } finally {
            connection.release();
        }
    }

    async atualizarCliente(id, cliente) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'update clientes set nome = ?, endereco = ?, cidade = ? where id = ?',
                [cliente.nome, cliente.endereco, cliente.cidade, id]
            );
            return true;
        } finally {
            connection.release();
        }
    }

    async excluirCliente(id) {
        const connection = await this.pool.getConnection();
        try{
            await connection.query(
                'delete from clientes where id = ?',
                [id]
            );
            return true;
        } finally {
            connection.release();
        }
    }
}

module.exports = new ModeloCliente();