module.exports = {
  Body :  JSON.stringify({
      "Type": "Notification",
      "MessageId": "cef71eed-830c-53aa-9eb5-5144371d4324",
      "TopicArn": "arn:aws:sns:us-east-1:484304243819:ses-bounce-topic",
      "Message": "{\"notificationType\":\"Bounce\",\"bounce\":{\"bounceType\":\"Permanent\",\"bounceSubType\":\"General\",\"bouncedRecipients\":[{\"emailAddress\":\"bounce@simulator.amazonses.com\",\"action\":\"failed\",\"status\":\"5.1.1\",\"diagnosticCode\":\"smtp; 550 5.1.1 user unknown\"}],\"timestamp\":\"2016-05-08T21:38:25.281Z\",\"feedbackId\":\"01000154924e9926-0586ba3d-4ff4-4a65-8d45-88e060f481bd-000000\",\"reportingMTA\":\"dsn; a8-27.smtp-out.amazonses.com\"},\"mail\":{\"timestamp\":\"2016-05-08T21:38:24.000Z\",\"source\":\"holmes@dclick.com.br\",\"sourceArn\":\"arn:aws:ses:us-east-1:484304243819:identity/holmes@dclick.com.br\",\"sendingAccountId\":\"484304243819\",\"messageId\":\"bd5ab889-63ac-4d0e-aa72-60e31d3c26ad\",\"destination\":[\"bounce@simulator.amazonses.com\"]}}",
      "Timestamp": "2016-05-08T21:38:25.406Z",
      "SignatureVersion": "1",
      "Signature": "AZCcnSFbsImHvQvq5lf8FFgC529LsTv8hJIai1/qqlVkqk1kxzoloNFmot46Y5LTnCiBFhMN4IVsPxP4jMm5IpNogA00//iqs2QgxgXzmTPDBl5yzc5Cbi34al0NNAPyX0uy2gMCj1ltv4uM+5xMg/f8eMmdGPzXu3vliGAVDazVvnouD6/A7t1rALV/HrgH7yl12PLrWOqZ49NqhosG+9P3FNgFRzyIP6H+Sa0d0Rw9/308VQbDHZDHBDp/rhQNyBxkfNXo96qDTUXGtjyVczmBCF+/2e/jE7WaqYUsyRaWldEPH+GMNW1+1mNcqcW/UCcIHxlSF1CatPIy/LfHIw==",
      "SigningCertURL": "https://sns.us-east-1.amazonaws.com/SimpleNotificationService-bb750dd426d95ee9390147a5624348ee.pem",
      "UnsubscribeURL": "https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:484304243819:ses-bounce-topic:e5512b3d-c4d6-4ace-ba3a-42fe97e51dac"
    }),
  ReceiptHandle : "AQEBL2/0lbSleITzXSZYoSwEAS3MAsTLSi1IRLuh56YM+ZV4uWybylIh/j+hGCJQSuSAJfAEJ2DgnKUQ0jqVOizlXHfgTNiukUoCRA6yB320pl6cJnXZPYUaL+MEVP04fWEEJaSjEN0bzL3CcXYcQ+0GN5IgNxbQ6XTxwHzajMUwHGEy43vn/M78cAqFDOSd31/8iCDD0uiIezzSiF5t5zm4PduPMaFnwvbVvTQBU5oPzqN2sTQ9xrRdI7IWAjxamFc/eujNz3+lThqYlqntGNmQp9XqfS2NbNMQqJQEJ2xwJFIYURrqa3cBdp6bsMIzCv4VTO18BYyWA1lmyjNL1eqHeZy8y5TezuBOg5IRmkg+g0g9/qVVG89ZBKMVC9GaqpMpifkIpPKQx7F22jcFTy6+Xg=="
};
