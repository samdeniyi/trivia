import { countriesMap } from '../../data/countries';

export const formatPrice = (value, country = "NG") => {
	if (value === undefined || value === null || value === "") throw new Error("Price value is empty");

	return new Intl.NumberFormat(`en-${country}`, {
		style: 'currency',
		currency: countriesMap.get(country).currency.code
	}).format(value).replace(/^(\D+)/, '$1 ');
};