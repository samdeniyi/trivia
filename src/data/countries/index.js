import { NigeriaInfo } from './nigeria';
import { NigerInfo } from './niger';
import { KenyaInfo } from './kenya';
import { GhanaInfo } from './ghana';

import GhanaFlag   from '../../assets/flags/ghana.svg';
import KenyaFlag   from '../../assets/flags/kenya.svg';
import NigeriaFlag from '../../assets/flags/nigeria.svg';
import NigerFlag   from '../../assets/flags/niger.svg';

const countriesMap = new Map();

countriesMap.set("NG", NigeriaInfo);
countriesMap.set("KE", KenyaInfo);
countriesMap.set("NI", NigerInfo);
countriesMap.set("GH", GhanaInfo);

const countriesData  =  Array.from(countriesMap.values());
const countriesKeys  =  Array.from(countriesMap.keys());
const phoneCodes     =  countriesData.map(country => country.code);
const countriesNames =   
    countriesData.map((country, index) => ({
        value: countriesKeys[index],
        label: country.name 
    }));

const flags = [
    { label: "Nigeria", value: NigeriaFlag, customAbbreviation: "NG" },
    { label: "Kenya",   value: KenyaFlag,   customAbbreviation: "KE" },
    { label: "Niger",   value: NigerFlag,   customAbbreviation: "NI" },
    { label: "Ghana",   value: GhanaFlag,   customAbbreviation: "GH" }  
];

export {
    countriesMap,
    countriesNames,
    countriesKeys,
    flags,
    countriesData,
    phoneCodes,
};