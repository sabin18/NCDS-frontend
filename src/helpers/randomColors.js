const colors = ['#ED4926', '#AD6D60', '#65AD60', '#609DAD', '#5C13DC', '#DC1368', '#DC1368', '#DC1313', '#DCC313', '#564D08'];

const color = () => {
  const Mycolors = colors[Math.floor(Math.random() * 10)];

  return Mycolors;
};

export default color;
