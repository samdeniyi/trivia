import { countAmount } from "../currency/countAmount";

export const referredCommissions = (list, referral) => {
    const foundCommissions = list.transactions
        .filter(transactions => transactions.commissionDetails.generatedByUserID === referral.id)

    return {
        totalAmount: countAmount(foundCommissions, "amount"),
        list: foundCommissions
    };
};