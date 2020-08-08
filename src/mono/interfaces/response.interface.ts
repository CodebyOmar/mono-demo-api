export interface BalanceResponse {
  status: string;
  message?: string;
  data: {
    accountNumber: string;
    balance: number;
    bvn: string;
    currency: string;
    name: string;
    type: string;
    _id: string;
  } | any;
}

export interface TransactionResponse {
  status: string;
  message?: string;
  data: {
    total: number;
    history: {amount: number; period: string;}[];
  } | any;
}

export interface AuthResponse {
  status: string;
  message?: string;
  data: { id: string; } | any;
}

