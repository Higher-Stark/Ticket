import provinces from "../data/provinces";
import pca from '../data/pca';

let Provinces = provinces;
let Pca = pca;

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

const extractProvince = function (addr) {
    let prov = null;
    Provinces.forEach(p => {
        if (addr.indexOf(p.name) === 0) prov = p.name;
    });
    return prov;
};

const extractCity = function (addr, prov) {
    if (!prov) return null;
    let cities = Pca[prov];
    cities = Object.keys(cities);
    if (cities.length === 1) return cities[0];
    let city = null;
    cities.forEach(c => {
        if (addr.indexOf(c) !== -1) city = c;
    });
    return city;
};

const extractDistrict = function (addr, prov, city) {
    if (! (prov && city)) return null;
    let districts = Pca[prov][city];
    let district = null;
    districts.forEach(d => {
        if (addr.indexOf(d) !== -1) district = d;
    });
    return district;
};

export const decomposeAddr = function (addr) {
    if (!addr) return null;
    let prov = extractProvince(addr) || "";
    // console.log(prov);
    let city = extractCity(addr, prov) || "";
    // console.log(city);
    let district = extractDistrict(addr, prov, city) || "";
    // console.log(district);
    let idx = prov.length + city.length + district.length;
    let detail = addr.substring(idx);
    // console.log(detail);
    return {
        province: prov,
        city: city,
        district: district,
        detail: detail,
    };
};

export const composeAddr = function (detailAddr) {
    return (detailAddr.province || "") + (detailAddr.city || "") + (detailAddr.district || "") + (detailAddr.detail || "");
};

export const UserError = function(message) {
    this.name = "User Error";
    this.message = message || 'User Error!';
    this.stack = (new Error()).stack;
};

UserError.prototype = Object.create(Error.prototype);
UserError.prototype.constructor = UserError;

export const getCities = function (prov) {
    if (!prov) return [];
    let cities = Pca[prov];
    cities = Object.keys(cities);
    // console.log(cities);
    return cities;
};

export const getDistricts = function (prov, city) {
    if (! (prov && city)) return [];
    let districts = Pca[prov][city];
    // console.log(districts);
    return districts;
};