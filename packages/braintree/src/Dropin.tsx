// @flow
import * as React from "react";
import braintree from "braintree-web";
import BraintreeWebDropIn from "braintree-web-drop-in";
import { useEffect } from "react";

type Props = {
  /**
   * Brain tree client token
   */
  token: string;
  /**
   * amount to charge
   */
  amount: number;
  submitButton: React.ReactElement;
  onSubmitted: (nonce?: string, error?: Error) => Promise<void>;
};

export function DropInUI({ token, amount, submitButton, onSubmitted }: Props) {
  const [instance, setInstance] = React.useState<BraintreeWebDropIn.Dropin>();
  const [loading, setLoading] = React.useState(false);

  const button = React.cloneElement(submitButton, {
    onClick: async () => {
      setLoading(true);
      try {
        if (!instance) {
          await onSubmitted(undefined, new Error("Dropin not initialized"));
          return;
        }

        const { nonce } = await instance.requestPaymentMethod();
        await onSubmitted(nonce, undefined);
      } catch (e) {
        await onSubmitted(undefined, e as any);
      }
      setLoading(false);
    },
    loading: loading,
    disabled: instance === undefined,
  });

  useEffect(() => {
    (async () => {
      const instance = await BraintreeWebDropIn.create({
        authorization: token,
        container: "#dropin-container",
        paypal: {
          currency: "HKD",
          amount: amount,
          flow: "checkout",
        },
      });
      setInstance(instance);
    })();
  }, [token, amount]);

  return (
    <form>
      <div id="dropin-container"></div>
      {button}
    </form>
  );
}
