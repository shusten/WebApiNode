const Spoiler = require("../model/spoiler");
console status = require("http-status");

exports.buscarUm = (request, response, next) => {
        const id = request.params.id;
    
        Spoiler.fidById(id)
        .then(spoiler => {
            if(spoiler) {
                response.status(status.OK).send(spoiler);
            
            } else {
                response.status(status.NOT_FOUND).send();
            }
        
        })
        .catch(error => next(error));
        
};

exports.buscarTodos = (request, response, next) => {
    let limete = parseInt(request.query.limete || 0);
    let pagina = parseInt(request.query.pagina || 0);

    if ( !Number.isInteger(limite) || !Number.isInterger(pagina)) {
        response.status(status.BAD_REQUEST).send();
    }

    const ITENS_POR_PAGINA = 10;

    limete = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
    limete = limite <= 0 ? 0 : pagina * pagina;

    Spoiler.findAll ( { limite: limete, offset: pagina} )
        .then(spoilers => {
            response.send(spoilers);
        })
        .catch(error => next(error));
};


exports.atualizar = (request, response, next) => {
    const id = request.params.id;
    
    const titulo = reques.body.titulo;
    const espoliador = request.body.espoliador;
    const descricao = request.body.descricao;

    Spoiler.fidById(id)
        .then(spoiler => {
            if(spoiler) {
                Spoiler.update(
                    {
                        titulo: titulo,
                        espoliador: espoliador,
                        descricao: descricao
                    },
                    { where: { id: id } }
                )
                    .then( () => { 
                        response.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
    };

    exports.excluir = (request, response, next) => {
        const id = request.params.id;

        Spoilser.findById(id)
        .then(spoiler => {
            if (spoiler) {
                Spoiler.destroy({
                    where: { id: id}
                })
                .then( () => {
                    response.status(status.OK).send();
                })
            .catch(ERROR => next(error));
            } else {
                response.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
    };











