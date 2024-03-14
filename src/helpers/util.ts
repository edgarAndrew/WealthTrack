export const getBankBalance = (backAccounts:BankAccount[],id:number) =>{
    const account = backAccounts.find(account => account.id === id);
    return account ? account.balance : null
}