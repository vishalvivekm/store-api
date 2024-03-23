const Product = require('../models/product')


 const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({})
        .sort('name')
        .select('name price') // ('-name -price') excludes name and price properties from response :)
        .limit(10)
        .skip(5)
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
    const page = Number(req.query.page) || 1 // req.query values: string type
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)
// 23
// 4 7 7 7 2

    const products = await result
    res.status(200).json({products, nbHits: products.length})

}

module.exports = {
    getAllProductsStatic, getAllProducts
}

// ?fields=company,rating
// {{URL}}/products?sort=-rating&featured=false&fields=name&limit=4&page=3