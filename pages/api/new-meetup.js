// /api/new-meetup
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://nyankhanlun_db_user:oQ01fq5udQn4Tvir@cluster0.8y3jkbf.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
        const db = client.db('meetups');
        const meetupCollection = db.collection('meetups');
        const result = await meetupCollection.insertOne(data)
        console.log(result)
        client.close()
        res.status(201).json({ message: 'meetup inserted!' })
    }
}