const parsePix = (pixelString) => parseInt(pixelString.replace('px', ''));

const parsePadding = (param) => {
  const parts = param.split(' ');

  let padding = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  switch (parts.length) {
    case 1:
      padding.top = padding.right = padding.bottom = padding.left = parsePix(parts[0]);
      break;
    case 2:
      padding.top = padding.bottom = parsePix(parts[0]);
      padding.right = padding.left = parsePix(parts[1]);
      break;
    case 3:
      padding.top = parsePix(parts[0]);
      padding.right = padding.left = parsePix(parts[1]);
      padding.bottom = parsePix(parts[2]);
      break;
    case 4:
      padding.top = parsePix(parts[0]);
      padding.right = parsePix(parts[1]);
      padding.bottom = parsePix(parts[2]);
      padding.left = parsePix(parts[3]);
      break;
    default:
      break;
  }
  return padding;
};

module.exports = parsePadding;
