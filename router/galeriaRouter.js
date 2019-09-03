const express = require('express');
const GalariaModel = require('../model/galeria/GaleriaModel');
const RespostaClass = require('../model/RespostaClass');
const fs = require('fs');

const pastaPublic = "./public/img/";

const router = express.Router();

router.get('/', function(req, res, next){
    GalariaModel.getTodos(function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro"
        }else{
            resposta.dados = retorno;
        } 

        res.json(resposta);
    })
});

router.get('/:id?', function(req, res, next){
    GalariaModel.getId(req.params.id, function(erro, retorno){
        let resposta = new RespostaClass();
        if(erro){
            resposta.erro = true;
            resposta.msg = "Ocorreu um erro"
        }else{
            resposta.dados = retorno;
        } 

        res.json(resposta);
    })
});

router.get('/?', function(req, res, next){
    let resposta = new RespostaClass();
    if(req.body.dados_imgagem){
        //salvar img
        let bitmap = new Buffer(req.body.dados_imagem.imagem_base64, 'base64');

        let dataAtual = new Date().toLocaleString().replace(/\//g, '').replace(/:/g, '').replace(/-/g, '').replace(/ /g, '');


        let nomeImagemCaminho = pastaPublic + dataAtual + req.body.dados_imagem.nome_arquivo;
        fs.writeFileSync(nomeImagemCaminho, bitmap);

        req.body.caminho = nomeImagemCaminho;

        GalariaModel.adicionar(req.body, function(erro, retorno){
            if(erro){
                resposta.erro = true;
                resposta.msg = "Ocorreu um erro"
            }else{
                if(retorno.affectedRows > 0){
                    resposta.msg = "Cadastro realizado com sucesso";
                }else{
                    resposta.erro = true;
                    resposta.msg = "Não foi possível realizar a operação";
                }
            } 
            res.json(resposta);
        });
    }else{
        resposta.erro = true;
        resposta.msg = "Não foi enviado uma imagem";
        res.json(resposta);
    }
});

module.exports = router;

