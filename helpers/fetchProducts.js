const fetchProducts = async (product) => {
  try {
    const request = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const data = await request.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
