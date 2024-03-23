### STORE API Documentation

- **Get all products**
  - **URL:** `/products`
  - **Method:** GET
  - **Description:** Retrieves a list of products based on optional query parameters.

**Query Parameters:**
- `featured`: Filter products by whether they are featured or not. Accepted values: `true` or `false`.
- `company`: Filter products by company name. Available companies: `['ikea', 'liddy', 'caressa', 'marcos']`
- `name`: Filter products by name(uses case-insensitive regex matching).
- `sort`: Sort products by fields. Comma-separated list of fields to sort by. Accepted fields: take a look at the schema below to know fields. 
- `fields`: Select specific fields to include in the response. Comma-separated list of fields. Accepted fields: take a look at the schema below to know fields. 
- `numericFilters`: Filter products based on numeric fields (inspiration: [HN Algolia API](https://hn.algolia.com/api)). Comma-separated list of field, operator, and value. Supported operators: `>, >=, =, <, <=`. Fields: `price`, `rating`.
-  `page`: Page number for pagination. Default is 1.
-  `limit`: Number of products per page. Default is 10.

> example: GET /products?company=ikea&sort=-price&fields=name,price&numericFilters=price>30&limit=2

<details>
<summary><strong>Product Schema</strong></summary>

```js  
name: {
    type: String,
},
price: {
    type: Number,
},
featured: {
    type: Boolean,
},
rating: {
    type: Number,
},
createdAt: {
    type: Date,
},
company: {
    type: String,
}
```
</details>

