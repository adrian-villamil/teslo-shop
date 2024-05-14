'use client';

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

interface Props {
  orderId: string;
  amount: number;
}

export const PayPalButton = ({orderId, amount}:Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="animate-pulse mb-14">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded mt-4" />
      </div>
    );
  }

  const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          // invoice_id: 'order_id',
          amount: {
            currency_code: 'USD',
            value: `${roundedAmount}`,
          }
        }
      ]
    });
    
    console.log({transactionId});
    
    return transactionId;
  };

  return (
    <PayPalButtons
      createOrder={createOrder}
    />
  );
};
