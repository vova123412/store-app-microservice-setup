import {kafka,CompressionTypes} from "../../config/kafka.js"

const producer = kafka.producer();
const produceMessage = async (topic, message) => {
    await producer.connect();
    const stringmessage = JSON.stringify(message)
    console.log(message)
    try {
        await producer.send({
            topic: topic,
            compression: CompressionTypes.GZIP,
            messages: [
                { value: stringmessage },
            ],
        });
        console.log(`Message sent: ${message}`);
    } catch (error) {
        console.error('Error sending message:', error);
    } finally {
        await producer.disconnect();
    }
};

export  { produceMessage };