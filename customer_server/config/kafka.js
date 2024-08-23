import {Kafka,CompressionTypes,logLevel } from "kafkajs"

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
//   logLevel: logLevel.INFO,
  ssl: false,
  sasl: {
    mechanism: 'plain',
    username: 'user1',
    password: '123'
  },
});


export {kafka,CompressionTypes}