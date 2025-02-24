import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb"

const client = new DynamoDBClient()

export const getAvailableRooms = async () => {
    try {
        const input = {
            TableName: 'rooms',
            IndexName: 'status-index',
            KeyConditionExpression: ''
        }

        const command = new QueryCommand(input)
        const response = await client.send(command)
        return {
            "count": response.Count,
            "items": response.Items
        }
    } catch (err) {
        console.log(err)
        throw err
    }
}
