import {useEffect} from 'react';
import usePaystackScript from './paystack-script';
import {callPaystackPop} from './paystack-actions';

export const usePaystackPayment = () => {
  const [scriptLoaded, scriptError] = usePaystackScript();

  function initializePayment(options, callback, onClose){
     const {
       publicKey,
       firstname,
       lastname,
       phone,
       email,
       amount,
       reference,
       metadata = {},
       currency = 'NGN',
       channels,
       label = '',
       plan = '',
       quantity = '',
       subaccount = '',
       transaction_charge = 0,
       bearer = 'account',
       split,
       split_code,
     } = options;

    if (scriptError) {
      throw new Error('Unable to load paystack inline script');
    }

    if (scriptLoaded) {
      const paystackArgs = {
        callback: callback ? callback : null,
        onClose: onClose ? onClose : null,
        key: publicKey,
        ref: reference,
        email: email,
        firstname,
        lastname,
        phone,
        amount,
        currency,
        plan,
        quantity,
        'data-custom-button': options['data-custom-button'] || '',
        channels,
        subaccount,
        transaction_charge,
        bearer,
        label,
        metadata,
        split,
        split_code,
      };
      callPaystackPop(paystackArgs);
    }
  }

  useEffect(() => {
    if (scriptError) {
      throw new Error('Unable to load paystack inline script');
    }
  }, [scriptError]);

  return initializePayment;
}