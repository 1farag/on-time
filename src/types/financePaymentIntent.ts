export type FinancePaymentIntentPayload = {
  bookingId: string;
  amount: number;
  currency: string;
};

/** POST /finance/payment-intents — MyFatoorah-style redirect. */
export type FinancePaymentIntentResponse = {
  paymentId: string;
  paymentUrl: string;
  externalPaymentId: string;
};
