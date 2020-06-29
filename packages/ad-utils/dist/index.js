"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isHousingCategory = isHousingCategory;
exports.furnishedTitle = furnishedTitle;
exports.housingTypeTitle = housingTypeTitle;
exports.categoryTitle = categoryTitle;
exports.housingInfo = housingInfo;
exports.priceTitle = priceTitle;
exports.fixedPriceTitle = fixedPriceTitle;
exports.housingTypeOptions = exports.fixedPriceOptions = exports.furnishedOptions = exports.currencyCodeOptions = exports.HOUSING_CATEGORY_ID = void 0;

var _data = require("@claudijo/data");

var _priceUtils = require("@claudijo/price-utils");

const HOUSING_CATEGORY_ID = '5ea18273c28ed640bed1e6bd';
exports.HOUSING_CATEGORY_ID = HOUSING_CATEGORY_ID;

function isHousingCategory(ad) {
  return ad.category._id === HOUSING_CATEGORY_ID;
}

const currencyCodeOptions = [{
  value: 'ETB',
  title: 'ETB'
}, {
  value: 'USD',
  title: 'USD'
}];
exports.currencyCodeOptions = currencyCodeOptions;
const furnishedOptions = [{
  value: 'FURNISHED',
  title: 'Yes'
}, {
  value: 'NOT_FURNISHED',
  title: 'No'
}, {
  value: 'OPTIONAL_FURNISHED',
  title: 'Optional'
}];
exports.furnishedOptions = furnishedOptions;

function furnishedTitle(ad) {
  const {
    title
  } = furnishedOptions.find(option => option.value === ad.furnished);
  return title;
}

const fixedPriceOptions = [{
  value: true,
  title: 'Fixed price'
}, {
  value: false,
  title: 'Open for bidding'
}];
exports.fixedPriceOptions = fixedPriceOptions;
const housingTypeOptions = [{
  value: 'RENTAL_HOUSE',
  title: 'House for rent'
}, {
  value: 'RENTAL_APARTMENT',
  title: 'Apartment for rent'
}, {
  value: 'RENTAL_ROOMS_SHARES',
  title: 'Rooms and shares for rent'
}];
exports.housingTypeOptions = housingTypeOptions;

function housingTypeTitle(ad) {
  const {
    title
  } = housingTypeOptions.find(option => option.value === ad.housingType);
  return title;
}

function categoryTitle(ad) {
  const housingTypes = {
    RENTAL_HOUSE: 'House',
    RENTAL_APARTMENT: 'Apartment',
    RENTAL_ROOMS_SHARES: 'Rooms and shares'
  };

  if (isHousingCategory(ad)) {
    return housingTypes[ad.housingType];
  }

  const category = _data.categories.find(category => category._id.$oid === ad.category._id);

  if (!category) {
    return '';
  }

  return category.title;
}

function housingInfo(ad) {
  if (!isHousingCategory(ad)) {
    return '';
  }

  return ` | ${ad.livingArea} m² | ${ad.numberOfBedrooms} br${ad.numberOfBedrooms > 1 ? 's' : ''}`;
}

function priceTitle(ad) {
  return `${(0, _priceUtils.formatPrice)(ad.price, ad.currencyCode)}${isHousingCategory(ad) ? '/mo' : ''}`;
}

function fixedPriceTitle(ad) {
  if (ad.isFixedPrice) {
    return 'Fixed price';
  }

  return 'Open for bidding';
}