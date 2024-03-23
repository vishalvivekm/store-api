const Product = require('../models/product')


 const getAllProductsStatic = async (req, res) => {
    //regex
//    const search = 'ba'
//     const products = await Product.find({
//         name: {$regex: search, $options: 'i' }, // look for all the name which have ba in them  /*Query and Projection Operators: https://www.mongodb.com/docs/rapid/reference/operator/query/ */
//     })
     // sort
    //const products = await Product.find({}).sort('-name -price')
     const products = await Product.find({}).select('name price') // ('-name -price') excludes name and price properties from response :)
    res.status(200).json({products, nbHits: products.length})

   // const products = await Product.find({name: "wooden desk"}) // just find({}) i.e. no args: returns everything
   //  res.status(200).json({products, nbHits: products.length})
}
const getAllProducts = async (req, res) => {
    const {featured, company, name, sort} = req.query
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
    //console.log(queryObject)
    let result = Product.find(queryObject) // query object
    if(sort) {
        let sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    const products = await result
    res.status(200).json({products, nbHits: products.length})
    // const products = await Product.find(queryObject) // document list
    // res.status(200).json({products, nbHits: products.length})
}

module.exports = {
    getAllProductsStatic, getAllProducts
}




// sort, /products?sort=name,-price // function .sort('<property>')

/*
* const getAllProductsStatic = async (req, res) => {
    //regex
    const search = 'ba'
     const products = await Product.find({
         name: {$regex: search, $options: 'i' }, // look for all the name which have ba in them  /*Query and Projection Operators: https://www.mongodb.com/docs/rapid/reference/operator/query/
     })
     //sort
const products = await Product.find({}).sort('-name -price')
res.status(200).json({products, nbHits: products.length})

// const products = await Product.find({name: "wooden desk"}) // just find({}) i.e. no args: returns everything
//  res.status(200).json({products, nbHits: products.length})
}
*/






/*
    const {featured, company, name} = req.query
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
    console.log(queryObject)
// url: localhost:3000/products?company=ikea&featured=false&name=ab
result of log:

* {
  featured: false,
  company: 'ikea',
  name: { '$regex': 'ab', '$options': 'i' }
}

* */


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