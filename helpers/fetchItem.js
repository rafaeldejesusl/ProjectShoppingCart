const fetchItem = async (itemID) => {
  try {
    const request = await fetch(`https://api.mercadolibre.com/items/${itemID}`);
    const data = await request.json();
    return data;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
