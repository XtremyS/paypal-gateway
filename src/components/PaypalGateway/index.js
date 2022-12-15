import React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useState, useEffect } from "react";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
const PaypalGateway = (props) => {
  console.log(props);

  const amount = "2";
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
                  // Your code here after create the order
                  return orderId;
                });
            }}
            onApprove={function (data, actions) {
              return actions.order.capture().then(function () {
                // Your code here after capture the order
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
