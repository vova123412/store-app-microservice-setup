import {Kafka,CompressionTypes,logLevel } from "kafkajs"
import dotenv from 'dotenv';
dotenv.config();
// should use singletone
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
//   logLevel: logLevel.INFO,
  ssl: false,
  sasl: {
    mechanism: 'plain',
    username: process.env.KAFKA_USERNAME,
    password: process.env.KAFKA_PASSWORD
  },
});


export {kafka,CompressionTypes}