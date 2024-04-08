'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({active: true}, "title price slug").
    then(data => {
        res.status(200).send(data);
    }).
    catch(e => {
        res.status(400).send({
            message: "Falha ao exibir produto.",
            date: e
        });
    });
};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product.save().
        then(x => {
            res.status(201).send({ message: "Produto cadastrado com sucesso!" });
        }).
        catch(e => {
            res.status(400).send({
                message: "Falha ao cadastrar produto.",
                date: e
            });
        });
};

exports.put = (req, res, next) => {
    let id = req.params.id;

    res.status(201).send({
        ID: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};