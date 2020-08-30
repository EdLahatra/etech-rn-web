module.exports.errorMessage = message => ({ error: { message } });

module.exports.checkDate = ({ min, max }) => {
  if (max && min) {
    const nDate1 = new Date(min).getTime();
    const nDate2 = new Date(max).getTime();
    return typeof nDate1 === 'number' && typeof nDate2 === 'number' && nDate1 > 9000 && nDate2 > 9000;
  }

  return false;
};
