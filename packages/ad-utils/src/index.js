import { categories } from '@claudijo/data';
import { formatPrice } from '@claudijo/price-utils';

export const HOUSING_CATEGORY_ID = '5ea18273c28ed640bed1e6bd';

export function isHousingCategory(ad) {
  // eslint-disable-next-line no-underscore-dangle
  return ad.category._id === HOUSING_CATEGORY_ID;
}

export const currencyCodeOptions = [
  { value: 'ETB', title: 'ETB' },
  { value: 'USD', title: 'USD' },
];

export const furnishedOptions = [
  { value: 'FURNISHED', title: 'Yes' },
  { value: 'NOT_FURNISHED', title: 'No' },
  { value: 'OPTIONAL_FURNISHED', title: 'Optional' },
];

export function furnishedTitle(ad) {
  const { title } = furnishedOptions.find((option) => option.value === ad.furnished);
  return title;
}

export const fixedPriceOptions = [
  { value: true, title: 'Fixed price' },
  { value: false, title: 'Open for bidding' },
];

export const housingTypeOptions = [
  { value: 'RENTAL_HOUSE', title: 'House for rent' },
  { value: 'RENTAL_APARTMENT', title: 'Apartment for rent' },
  { value: 'RENTAL_ROOMS_SHARES', title: 'Rooms and shares for rent' },
];

export function housingTypeTitle(ad) {
  const { title } = housingTypeOptions.find((option) => option.value === ad.housingType);
  return title;
}

export function categoryTitle(ad) {
  const housingTypes = {
    RENTAL_HOUSE: 'House',
    RENTAL_APARTMENT: 'Apartment',
    RENTAL_ROOMS_SHARES: 'Rooms and shares',
  };

  if (isHousingCategory(ad)) {
    return housingTypes[ad.housingType];
  }

  // eslint-disable-next-line no-underscore-dangle, no-shadow
  const category = categories.find((category) => category._id.$oid === ad.category._id);
  if (!category) {
    return '';
  }

  return category.title;
}

export function housingInfo(ad) {
  if (!isHousingCategory(ad)) {
    return '';
  }

  return ` | ${ad.livingArea} m² | ${ad.numberOfBedrooms} br${ad.numberOfBedrooms > 1 ? 's' : ''}`;
}

export function priceTitle(ad) {
  return `${formatPrice(ad.price, ad.currencyCode)}${isHousingCategory(ad) ? '/mo' : ''}`;
}

export function fixedPriceTitle(ad) {
  if (ad.isFixedPrice) {
    return 'Fixed price';
  }
  return 'Open for bidding';
}
