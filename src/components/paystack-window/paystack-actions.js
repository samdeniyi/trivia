export const callPaystackPop = (paystackArgs) => {
    const handler = window.PaystackPop && window.PaystackPop.setup(paystackArgs);
    handler && handler.openIframe();
};