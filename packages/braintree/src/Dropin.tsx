// @flow
import * as React from "react";
import { useEffect } from "react";
import BraintreeWebDropIn from "braintree-web-drop-in";

type Props = {
  /**
   * Brain tree client token
   */
  token: string;
  /**
   * amount to charge
   */
  amount: number;
  renderSubmitButton: (props: {
    isLoading: boolean;
    disabled: boolean;
    onClick: any;
  }) => React.ReactElement;
  onSubmitted: (nonce?: string, error?: Error) => Promise<void>;
};

export function DropInUI({
  token,
  amount,
  renderSubmitButton,
  onSubmitted,
}: Props) {
  const [instance, setInstance] = React.useState<BraintreeWebDropIn.Dropin>();
  const [loading, setLoading] = React.useState(false);

  const button = renderSubmitButton({
    isLoading: loading,
    disabled: !instance,
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
