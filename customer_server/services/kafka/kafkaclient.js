import {kafka} from "../../config/kafka.js"
const createTopic = async (topicname,partitions) => {
    try{
        const admin = kafka.admin();
        admin.connect();     
        const Topic = await admin.createTopics({
          topics: [
            {
              topic: topicname,
              numPartitions: partitions,
            },
          ],
        });
        console.log("Topic Created Success [rider-updates]");
      
        console.log("Disconnecting Admin..");
        await admin.disconnect();
        return Topic
    }
    catch(error){
        throw error
    }

  }

const getAllTopics = async () => {
try{
    const admin = kafka.admin();
    console.log("Admin connecting...");
    admin.connect();
    try {
        const allTopics = await admin.listTopics();
        console.log('All Topics:', allTopics);
        const metadata = await admin.fetchTopicMetadata({ topics: allTopics})
        console.log(metadata.topics[0].partitions)
        return allTopics;
    } catch (error) {
        console.error('Failed to get topics:', error);
        throw error;
    } finally {
        await admin.disconnect();
    }
}
catch(error){
    throw error
}
}

const getConsumerGroups = async () =>
{
    const admin = kafka.admin();
    await admin.connect();
    try {
        const groups = await admin.listGroups();
        return groups
    } catch (error) {
        console.error('Error listing consumer groups:', error);
    } finally {
        await admin.disconnect();
    }
}

export {createTopic,getAllTopics,getConsumerGroups}