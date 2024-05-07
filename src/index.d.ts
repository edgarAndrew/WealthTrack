interface BankAccount {
    id:number,
    accountNumber: string,
    balance:number
}

interface Transaction {
    categoryName:string,
    percentage:number,
    amount:number,
    type:string,
    account:string
}

interface Budget {
  id:number,
  name:string,
  start_amount:number,
  current_amount:number,
  start_date:string,
  end_date:string
}

interface Goal{
  id:number,
  name:string,
  targetAmount:number,
  currentAmount:number,
  startDate:string,
  endDate:string
}

interface PaginationResponse {
    content: PaginationItem[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    numberOfElements: number;
    pageable: {
      offset: number;
      pageNumber: number;
      pageSize: number;
      paged: boolean;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      unpaged: boolean;
    };
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    totalElements: number;
    totalPages: number;
  }
  
  interface PaginationItem {
    amount: number;
    category: string;
    date: string;
    id: number;
    type: string;
    account:number;
  }

