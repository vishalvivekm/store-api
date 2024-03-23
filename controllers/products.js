const Product = require('../models/product')


 const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({}).select('name price') // ('-name -price') excludes name and price properties from response :)
    res.status(200).json({products, nbHits: products.length})

}
const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields} = req.query
    const queryObject = {}

    if (featured) {
        queryObject.featured = featured === 'true' ? true:false;
    }
    if (company) {
        queryObject.company = company
    }
    if (name) {
        queryObject.name = {$regex: name, $options: 'i' }
    }
    let result = Product.find(queryObject) // query object

    // sort
    if(sort) {
        let sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }

    // select
    if(fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const products = await result
    res.status(200).json({products, nbHits: products.length})

}

module.exports = {
    getAllProductsStatic, getAllProducts
}

// ?fields=company,rating