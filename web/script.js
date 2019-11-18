async function getData(url, query) {
    const response = await fetch(url, {
        method: 'POST', 
        mode: 'cors', 
        cache: 'no-cache', 
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
    });
    return await response.json();
}

async function getProducts() {
    let products = [];
    let url = 'http://localhost:9200/products/_search';
    let query = {
        "size": "0",
        "aggs": {
          "type": {
            "terms": {
              "field": "type"
            }
          }
        }
      }
    let data = await getData(url, query);
    let buckets = data.aggregations.type.buckets;
    for (let product in buckets) {
        products.push(buckets[product].key);
    }
    return products;
}

async function getSearchResults(formData) {
    let url = 'http://localhost:9200/products/_search?size=200';
    let query = {"query":{"bool":{"must": []}}}
    query.query.bool.must.push({"range":{"price":{"gte":formData.minPrice,"lte":formData.maxPrice}}});
    query.query.bool.must.push({"match":{"color":formData.color}});
    query.query.bool.must.push({"match":{"type":formData.productType}});
    query.query.bool.must.push({"match":{"size":formData.size}});

    let data = await getData(url, query);
    return data.hits.hits;
}

async function populateProductsInSelect($productSelect) {
    let products = await getProducts();
    products.sort()
    for (product in products) {
        $productSelect.append('<option value=' + products[product] + '>' + products[product] + '</option>')
    }
}

function getFormData() {

    let formData = {};
    formData.productType= $('#product_type').val();
    formData.color = $('#color').val();
    formData.size = $('#size').val();
    formData.minPrice = $('#min_price').val();
    formData.maxPrice = $('#max_price').val();

    return formData;
}

async function populateResults(formData) {
    let searchResults = await getSearchResults(formData);
    let searchResultsAsHTML = "";    

    for (result in searchResults) {
        searchResultsAsHTML += '<h2>Product</h2>';
        searchResultsAsHTML += '<p> Product type: ' + searchResults[result]._source.type + '</p>';
        searchResultsAsHTML += '<p> Color: ' + searchResults[result]._source.color + '</p>';
        searchResultsAsHTML += '<p> Size: ' + searchResults[result]._source.size + '</p>';
        searchResultsAsHTML += '<p> Price: $' + searchResults[result]._source.price + '</p>';
    }
    
    $('#results-area').append(searchResultsAsHTML);

}

$(document).ready(function () {

    let $producType = $('#product_type');
    populateProductsInSelect($producType);

    $('#search').click(function(){
        $('#results-area').empty();
        let formData = getFormData();
        populateResults(formData);
    });

})