const ModeloCliente = require('./model.js');

class ControladorCliente{
    async criarCliente( req, res ){
        const cliente = req.body;
        try{
            const idCliente = await ModeloCliente.criarCliente(cliente);
            res.status(201).json({ id: idCliente});
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao criar um cliente'});
        }
    }

    async obterTodosClientes( req, res ){
        try{
            const clientes = await ModeloCliente.obterTodosClientes();
            res.status(200).json(clientes);
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao buscar todos os clientes'});
        }
    }

    async obterClientePorId( req, res ){
        const id = req.params.id;
        try{
            const cliente = await ModeloCliente.obterClientePorId(id);
            if( cliente ){
                res.status(200).json(cliente);
            } else {
                res.status(404).json({erro: 'cliente não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({erro: 'Erro ao buscar o cliente'});
        }
    }

    async atualizarCliente( req, res ){
        const id = req.params.id;
        const cliente = req.body; 
        try{
            const resultado = await ModeloCliente.atualizarCliente(id, cliente);
            if( resultado ){
                res.status(200).json({msg: 'Cliente atualizado com sucesso'});
            } else {
                res.status(404).json({erro: 'cliente não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao atualizar cliente'});
        }
    }
    
    async excluirCliente( req, res ){
        const id = req.params.id;
        try{
            const resultado = await ModeloCliente.excluirCliente(id);
            if( resultado ){
                res.status(200).json({msg: 'Cliente excluido com sucesso'});
            } else {
                res.status(404).json({erro: 'cliente não encontrado'})
            }
        } catch( erro ){
            res.status(500).json({ erro: 'Erro ao excluir cliente'});
        }
    }

}

module.exports = new ControladorCliente();