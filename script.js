const cartItems = document.querySelector('.cart__items');
const items = document.querySelector('.items');
const totalPrice = document.querySelector('.total-price');
const emptyCart = document.querySelector('.empty-cart');
const search = document.querySelector('#search');
const searchBtn = document.querySelector('#search-btn');

const totalCalculator = () => {
  const list = [];
  cartItems.childNodes.forEach((element) => list.push(element.innerText.split('$')[1]));
  const result = list.reduce((acc, price) => acc + parseFloat(price), 0);
  totalPrice.innerText = Math.round(result * 100) / 100;
};

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function cartItemClickListener(event) {
  event.target.remove();
  saveCartItems(cartItems.innerHTML);
  totalCalculator();
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const addItemCart = async (event) => {
  const data = await fetchItem(event.target.parentNode.firstChild.innerText);
  const { id, title, price } = data;
  const cartItem = createCartItemElement(({
    sku: id,
    name: title,
    salePrice: price,
  }));
  cartItems.appendChild(cartItem);
  saveCartItems(cartItems.innerHTML);
  totalCalculator();
};

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  const button = section
  .appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  button.addEventListener('click', addItemCart);

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const addItemSection = async (itemName) => {
  const data = await fetchProducts(itemName);
  const items = document.querySelector('.items');
  data.results.forEach(({ id, title, thumbnail }) => {
    const productElement = createProductItemElement({
      sku: id,
      name: title,
      image: thumbnail,
    });
    items.appendChild(productElement);
  });
};

emptyCart.addEventListener('click', () => {
  while (cartItems.firstChild) cartItems.firstChild.remove();
  saveCartItems(cartItems.innerHTML);
  totalCalculator();
});

const loading = () => {
  const items = document.querySelector('.items');
  items.appendChild(createCustomElement('h1', 'loading', 'Carregando...'));
};

const loaded = () => {
  const loadingText = document.querySelector('.loading');
  loadingText.remove();
};

searchBtn.addEventListener('click', async () => {
  const itemName = search.value;
  while (items.firstChild) items.firstChild.remove();
  loading();
  await addItemSection(itemName);
  loaded();
})

window.onload = async () => {
  loading();
  await addItemSection('computador');
  loaded();
  cartItems.innerHTML = getSavedCartItems();
  cartItems.childNodes.forEach((li) => li.addEventListener('click', cartItemClickListener));
  totalCalculator();
 };
