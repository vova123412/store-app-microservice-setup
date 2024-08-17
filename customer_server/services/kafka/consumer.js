import {kafka} from "../../config/kafka.js"
import { purchasesValidator } from "../../middleware/validator.js";
import {purchasesProduct} from '../../controller/purchasesController.js'
const consumer = kafka.consumer({ groupId: 'my-consumer-group' });
const consumeMessages = async () => {
    await consumer.connect();
    await consumer.subscribe({ topic: 'kafka-test', fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            try{
                const body =  JSON.parse(message.value.toString())
                purchasesValidator(body)
                purchasesProduct(body)
                console.log(`Received message: ${message.value.toString()} from partition ${partition}`);
                
            }
            catch(error){
                console.log("err")
            }

        },
    });
};

export { consumeMessages }