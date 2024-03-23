const Product = require('../models/product')


const getAllProductsStatic = async (req, res) => {
   const products = await Product.find({name: "wooden desk"}) // just fin({}) returns everything
    res.status(200).json({products, nbHits: products.length})
}
const getAllProducts = async (req, res) => {
    const {featured} = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true:false;
    }
    console.log(queryObject)
    const products = await Product.find(queryObject)
    res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic, getAllProducts
}











/*const getAllProducts = async (req, res) => {
    const products = await Product.find(req.query)
    res.status(200).json({products, nbHits: products.length})
}*/


// products?featured=true&page=2 // req.query has value: {featured: 'true', page: '2'} // but we don't have any property by 'page' name, so moongoose v5 returns an empty array
//const products = await Product.find(req.query)
// res.status(200).json({products, nbHits: products.length})
// returns:
/*
*{
    "products": [],
    "nbHits": 0
}
* however, mongoose v6 just ignores it
* */



//
//
// const getAllProductsStatic = async (req, res) => {
//     throw new Error("testing async errros")
//     res.status(200).json({msg: 'products testing route'})
// }
// const getAllProducts = async (req, res) => {
//     res.status(200).json({msg: 'products route'})
// }
//
// module.exports = {
//     getAllProductsStatic, getAllProducts
// }