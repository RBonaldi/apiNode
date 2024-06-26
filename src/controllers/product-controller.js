'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({ active: true }, "title price slug").
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

exports.getById = (req, res, next) => {
    Product.findById(req.params.id).
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

exports.getByTags = (req, res, next) => {
    Product.find({
        active: true,
        tags: req.params.tags
    }).
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

exports.getBySlug = (req, res, next) => {
    Product.findOne(
        {
            active: true,
            slug: req.params.slug
        }
        , "title description price slug tags").
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
    Product.
        findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                slug: req.body.slug,
                price: req.body.price
            }
        }).then(x => {
            res.status(200).send({
                message: "Produto atualizado com sucesso!",
                data: x
            });
        }).
        catch(e => {
            res.status(400).send({
                message: "Falha ao atualizar produto.",
                date: e
            });
        });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};