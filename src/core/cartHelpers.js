export const addData = (item) => {
  let data = []

  data.push({
    ...item,
  });

  data = Array.from(new Set(data.map((p) => (p._id)))).map(id => {
    return data.find(p => p._id === id);
  });
  localStorage.setItem('data', JSON.stringify(data))
};

export const getData = () => {
  if(typeof window !== 'undefined') {
    if(localStorage.getItem('data')) {
      return JSON.parse(localStorage.getItem('data'));
    }
  }
  return [];
}

export const emptyData = () => {
  if(typeof window !== "undefined") {
    localStorage.removeItem("data")
  }
}
