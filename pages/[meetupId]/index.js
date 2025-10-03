
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail"

export default function MeetupDetails(props) {

    return <Fragment>
        <Head>
            <title> {props.meetupData.title}</title>
            <meta name="description" content={props.meetupData.description}></meta>
        </Head>
            <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description} />
    </Fragment>
    

}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://nyankhanlun_db_user:oQ01fq5udQn4Tvir@cluster0.8y3jkbf.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db('meetups');
    const meetupCollection = db.collection('meetups');
    const meetup = await meetupCollection.find({}, { _id: 1 }).toArray()
    client.close()
    return {
        fallback: 'blocking',
        paths: meetup.map(meetup => ({
            params: { meetupId: meetup._id.toString() }
        }))

    }
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect('mongodb+srv://nyankhanlun_db_user:oQ01fq5udQn4Tvir@cluster0.8y3jkbf.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db('meetups');
    const meetupCollection = db.collection('meetups');
    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId)})
    client.close()
    return {
        props: {
            meetupData : {
                id: selectedMeetup._id.toString(),
                title : selectedMeetup.title,
                image : selectedMeetup.image,
                description : selectedMeetup.description,
                address : selectedMeetup.address
            }
        },
        revalidate: 1
    }
}