function  locale(date){
    const pattern = /^(\d+)(-|\/)0?(\d+)(-|\/)0?(\d+)$/;
    let res = date.replace(pattern, (match, year, sep1, month, spe2, day, offset, string) => `${year}年${month}月${day}日`)
    return res;
}

export default locale;