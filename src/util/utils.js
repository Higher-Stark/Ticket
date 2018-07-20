export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};

export const urlEncode = function(obj) {
    const pairs = Object.entries(obj);
    let res = [];
    pairs.forEach(p => res.push(`${p[0]}=${p[1]}`));
    return res.join('&');
};

export const locale = function (date){
    const pattern = /^(\d+)(-|\/)0?(\d+)(-|\/)0?(\d+)$/;
    let res = date.replace(pattern, (match, year, sep1, month, spe2, day, offset, string) => `${year}年${month}月${day}日`)
    return res;
};
