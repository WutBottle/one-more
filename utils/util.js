const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const getQueryString = function (url,name){
  console.log("url = "+url);
  console.log("name = "+name);
  let reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
  let r = url.substr(1).match(reg);
  if(r != null){
    console.log("r = " + r);
    console.log("r[2] = " + r[2]);
    return r[2];
  }
  return null;
}

module.exports = {
  formatTime: formatTime,
  getQueryString: getQueryString,
}