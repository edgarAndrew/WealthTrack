interface BankAccount {
    id:number,
    accountNumber: string,
    balance:number
}

interface Transaction {
    categoryName:string,
    percentage:number,
    amount:number,
    type:string
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
  }

