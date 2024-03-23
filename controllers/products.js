const Product = require('../models/product')


 const getAllProductsStatic = async (req, res) => {

    const products = await Product.find({price: {$gt: 30}})
        .sort('name')
        .select('name price') // ('-name -price') excludes name and price properties from response :)
        .limit(10)
        .skip(5)
    res.status(200).json({products, nbHits: products.length})

}
const getAllProducts = async (req, res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query
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
    if (numericFilters) {
        const operatorsMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`)
        const options = ['price', 'rating']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if(options.includes(field)) {
                queryObject[field] = {
                    [operator] : Number(value)
                }
            }
        })

    }
    //console.log(queryObject) // { price: { '$eq': 40 }, rating: { '$lt': 30 } }
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


// let filters = numericFilters.replace(regEx, (match) => `-${operatorsMap[match]}-`)
//console.log(filters)
/*
*?numericFilters=price=40,rating<30
* price-$eq-40,rating-$lt-30
* */


/*
* {{URL}}/products?numericFilters=price=40,rating<30&sort=price&fields=price,name
*
* response:
*
* {
    "products": [
        {
            "_id": "65fea51af6128931d8839007",
            "name": "bar stool",
            "price": 40
        },
        {
            "_id": "65fea51af6128931d8839017",
            "name": "wooden desk",
            "price": 40
        }
    ],
    "nbHits": 2
}
* queryObject was: { price: { '$eq': 40 }, rating: { '$lt': 30 } }
*
* */