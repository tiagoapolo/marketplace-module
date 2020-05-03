const olistProducts = require('./questions_with_title.json').db;
fs = require('fs');

function createText(product) {
  let text = '';
  text += `${product.product_title}\n`;
  text += `Question,Answer\n`;
  const temp = product.questions.map(q =>  `${q.text.replace(/,/g,' ')},\"${q.answer}\"`).toString().replace(/\",/g,'\"\n')
  text += temp;
  text += '\n----\n'
  return text
}


fs.writeFileSync('./questions_faq.txt', olistProducts.map(p => createText(p)).toString().replace(/\n,/g,'\n'))
