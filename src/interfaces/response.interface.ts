export interface CreditScoreResponse {
  status: string;
  message?: string;
  data: {
    name: string;
    email: string;
    amount: number;
    monoId: string;
    score: number;
  };
} 
