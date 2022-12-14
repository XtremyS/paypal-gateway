import React from "react";
import { Text, View, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
const PaypalGateway = (props) => {
  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState(null);

  console.log(props);

  return (
    <>
      <View>
        <PayPalScriptProvider
          options={{
            "client-id": `${props.client_id}`,
          }}
        >
          <PayPalButtons
            style={{ layout: "horizontal" }}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: `EUR`,
                        value: "0.2",
                      },
                    },
                  ],
                })
                .then((orderId) => {
                  console.log(orderId, "ORDER ID");
                  return orderId;
                });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(function (details) {
                console.log(details);
                alert(
                  "Transaction completed by " + details.payer.name.given_name
                );
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
