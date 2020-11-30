import { unparseBalance } from "./parseBalance";
import { formatPrice } from "./formatPriceWithComma";

export const calculateCapitalization = members => {
    const membersCommissions = members.map(member => unparseBalance(member.commission));

    const membersCapitalization = membersCommissions.reduce((sum, current) => {
        return sum += current;
    }, 0);

    return formatPrice(membersCapitalization);
};