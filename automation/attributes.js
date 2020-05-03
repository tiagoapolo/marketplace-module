const olistProducts = require('../../db/olist_db_products.json');
const axios = require('axios').default;
fs = require('fs');


const LINE_BREAK = '\n'
const PRODUCT_URL = 'https://api.mercadolibre.com/items'
const ACCESS_TOKEN = "APP_USR-8450736370994355-050120-8e8cdb6896e7731e2d1e19f85c0065a7-30762069"

function generatePaymentText (installments, accepts_mercadopago) {
  return `${accepts_mercadopago 
    ? 'Aceita mercadopago, \"Sim\"' 
    : 'Aceita mercadopago, \"Não\"'}`
    // + `Parcela ${installments.rate > 0 ? 'com' : 'sem'} juros${LINE_BREAK}`  
    // + `Divide em ${installments.quantity} vezes${LINE_BREAK}`
}

function generateConditionText(condition){
  return condition === 'new' 
    ? 'Condição do item: \"Novo\"' 
    : 'Condição do item: \"Usado\"'
}

function generateQuantityText(available_quantity){
  return `Produtos disponíveis: \"${available_quantity}\"`
}

function generateAttributesText(attributes) {
  return attributes.map(attr => `${attr.name}: \"${attr.value_name}\"`)
    .toString()
    .replace(/\",/g,'\", ')
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchProduct(product_id,access_token){
  timeout(180);
  return axios.get(`${PRODUCT_URL}?ids=${product_id}&access_token=${access_token}`)
}


const x = olistProducts.results.map(prod => fetchProduct(prod.id, ACCESS_TOKEN))
// fetchProduct(olistProducts.results[0].id, ACCESS_TOKEN)
Promise.all(x)
.then(res => {
 return res.map(r => r.data[0].body)
})
.then(products => {
  console.log('products', products)
  return products.map(obj => ({ 
    id: obj.id,
    title: obj.title,
    available_quantity: generateQuantityText(obj.available_quantity),
    condition: generateConditionText(obj.condition),
    text_details: generateAttributesText(obj.attributes),
    text_payment: generatePaymentText(obj.sale_terms, obj.accepts_mercadopago)
  }))
})
.then(all => {

  console.log(all)
  fs.writeFileSync('./output.json', JSON.stringify(all));  

  // const alltext = all.map(p => `${p.title}\n${p.available_quantity}${p.condition}${p.text_details}\n${p.text_payment}|`)
  // .toString()
  // .replace(/\|,/g,'----\n')
  // // fs.writeFileSync('./output.csv', alltext);  
})
.catch(err => console.log('err', err))
// ({ 
//   id: obj.id,
//   title: obj.title,
//   available_quantity: generateQuantityText(obj.available_quantity),
//   condition: generateConditionText(obj.condition ),
//   text_details: generateAttributesText(obj),
//   text_payment: generatePaymentText(obj.installments, obj.accepts_mercadopago)
// }))


// https://api.mercadolibre.com/items?ids=MLB1375853220&access_token=APP_USR-8450736370994355-050111-b28671491091a20f8cce2ffe6f7be633-30762069

// console.log(x)

// const fs = require('fs');

// fs.writeFile('./', "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 

// // Or
// fs.writeFileSync('/tmp/test-sync', 'Hey there!');
