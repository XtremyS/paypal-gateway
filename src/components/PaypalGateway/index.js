import React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { WebView } from "react-native";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PaypalGateway = (props) => {
  // console.log(props);
  const amount = `${props.amount}`;
  const currency = `${props.currency}`;
  const style = { layout: "vertical" };

  return (
    <>
      <View>
        <PayPalScriptProvider
          options={{
            "client-id": `${props.client_id}`,
            components: "buttons",
            currency: `${props.currency}`,
          }}
        >
          <PayPalButtons
            style={style}
            disabled={false}
            forceReRender={[amount, currency, style]}
            fundingSource={undefined}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: currency,
                        value: amount,
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  return orderId;
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            onApprove={async function (data, actions) {
              return actions.order.capture().then(function (details) {
                if (details.status === "COMPLETED") {
                  props.actions.useActions();
                  console.log(details, "DETAILS");
                }
              });
            }}
          />
        </PayPalScriptProvider>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export default PaypalGateway;
