export const mapAvailablePackages = (
    country = "NG",
    availablePackages,
    mapPackageTypeLogo
) => {
    return availablePackages
        .filter(packageType => packageType.country === country)
        .map(packageType => ({
            logo:        mapPackageTypeLogo(packageType.short_name),
            type:        packageType.name,
            serviceId:   packageType.id,
            country:     packageType.country,
            biller_name: packageType.biller_name,
            biller_code: packageType.biller_code,
            label_name:  packageType.label_name,
            item_code:   packageType.item_code
        }));
};
