export const getBankBalance = (backAccounts:BankAccount[],id:number) =>{
    const account = backAccounts.find(account => account.id === id);
    return account ? account.balance : null
}

type CategoryColors = {
    [category: string]: string;
};

export const categoryColors:CategoryColors = {
    "FOOD": "#FF5733",
    "EDUCATION": "#33FFB7",
    "SALARY": "#337AFF",
    "SPORT": "#FF33E6",
    "TRIPS": "#33FFCE",
    "PETS": "#FF8C33",
    "HOME": "#FFB333",
    "GROCERIES": "#33FF6B",
    "CHARITY": "#D133FF",
    "BONUS": "#33FF96",
    "CLOTHES": "#FF3366",
    "VEHICLE": "#3366FF",
    "DRINKS": "#FF33B3",
    "ELECTRONICS": "#33FF33",
    "KIDS": "#FF3333",
    "HEALTH": "#33A3FF",
    "GIFT": "#33FF33",
    "GAMES": "#FF9F33",
    "CINEMA": "#FFB333",
    "HOBBY": "#33FF33",
    "BEAUTY": "#33FF33",
    "TAXES": "#FFB333",
    "INVESTMENT": "#33FF33"
};

export function getCategoryOptions() {
    const options = [];
    for (const [value, color] of Object.entries(categoryColors)) {
      const label = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase().replace(/_/g, ' ');
      options.push({ value, label, color });
    }
    return options;
}