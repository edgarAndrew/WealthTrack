export const getBankBalance = (backAccounts:BankAccount[],id:number) =>{
    const account = backAccounts.find(account => account.id === id);
    return account ? account.balance : null
}
export const getBankAccountNumber = (backAccounts:BankAccount[],id:number) =>{
    const account = backAccounts.find(account => account.id === id);
    return account ? account.accountNumber.slice(-4).padStart(account.accountNumber.length, "*") : null
}

type CategoryColors = {
    [category: string]: string;
};

export const categoryColors:CategoryColors = {
    "FOOD": "#E1AA96",
    "EDUCATION": "#06CAD3",
    "SALARY": "#997AFF",
    "SPORT": "#FF33E6",
    "TRIPS": "#F86A80",
    "PETS": "#FF8C33",
    "HOME": "#FFB333",
    "GROCERIES": "#060270",
    "CHARITY": "#D133FF",
    "BONUS": "#22FF96",
    "CLOTHES": "#832706",
    "VEHICLE": "#3366FF",
    "DRINKS": "#FF33B3",
    "ELECTRONICS": "#7DDA58",
    "KIDS": "#FF3333",
    "HEALTH": "#33A3FF",
    "GIFT": "#118833",
    "GAMES": "#FF9F33",
    "CINEMA": "#FFB333",
    "HOBBY": "#A326B6",
    "BEAUTY": "#CCFF33",
    "TAXES": "#FFB333",
    "INVESTMENT": "#ABFF33"
};

export function getCategoryOptions() {
    const options = [];
    for (const [value, color] of Object.entries(categoryColors)) {
      const label = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, ' ');
      options.push({ value, label, color });
    }
    return options;
}

export function convertDateFormat(inputDateString:string) {
    const parts = inputDateString.split("/");
    let year = parts[2];
    let month = parts[0];
    let day = parts[1];

    // Adding leading zero if necessary
    if (month.length === 1) {
        month = "0" + month;
    }

    if (day.length === 1) {
        day = "0" + day;
    }

    return `${year}-${month}-${day}`;
}