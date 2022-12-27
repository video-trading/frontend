import { useQuery } from "react-query";
import { PaymentService } from "../services/PaymentService";

export function useGetPaymentClientToken(accessKey: string) {
  const query = useQuery(["paymentClientToken", accessKey], () => {
    return PaymentService.getClientToken(accessKey);
  });
  return query;
}
