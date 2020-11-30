export const selectServices = (services, filters) => {
    const filteredServices = [];

    services.filter(service => {
        for (let filter of filters) {
            if (service.biller_name.includes(filter)) {
                filteredServices.push(service);
            };
        };

        return service;
    });

    return filteredServices;
};
