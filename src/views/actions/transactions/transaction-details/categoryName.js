export const categoryName = (category) => {
    let name = ""
    if (category === "REFUND") {
       name = "Refund"
    } 
    else  if (category === "BILL_PAYMENT") {
        name = "Bills Payment"
     } 
     else  if (category === "PAY_WITH_WALLET") {
        name = "Pay with Wallet"
     }
    else  if (category === "CASH_IN") {
        name = "Cash In"
     } 
     else  if (category === "COMMISSION") {
        name = "Commission"
     }
     else  if (category === "PAYSTACK_TOPUP") {
        name = "Paystack Topup"
     }
     else  if (category === "WALLET_TO_WALLET") {
        name = "Wallet to Wallet"
     }
     return name
};