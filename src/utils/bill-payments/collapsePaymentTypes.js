export const collapsePaymentTypes = (filters, services) => {
    const unifiedServices = [];

    for (let filter of filters) {
        unifiedServices.push({ provider: filter, services: [] });
    };

    for (let uniService of unifiedServices) {
        for (let service of services) {
            if (service.type !== uniService.type) {
                uniService.type    = service.type;
                uniService.logo    = service.logo;
                uniService.country = service.country;
            };

            if (service.biller_name.includes(uniService.provider)) {
                const subService = {
                    biller_name: service.biller_name,
                    biller_code: service.biller_code,
                    serviceId:   service.serviceId,
                    item_code:   service.item_code
                };

                uniService.services.push(subService);
            };
        };
    };

    return unifiedServices;
};