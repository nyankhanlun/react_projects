import { MongoClient } from "mongodb";
import Head from "next/head";
import { Fragment } from "react";
import MeetupList from "../components/meetups/MeetupList";



// export async function getServerSideProps(context){
//     return {
//         props : {
//             meetups : DUMMY_MEETUPS,

//         }
//     }
// }


export async function getStaticProps() {
    const client = await MongoClient.connect('mongodb+srv://nyankhanlun_db_user:oQ01fq5udQn4Tvir@cluster0.8y3jkbf.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db('meetups');
    const meetupCollection = db.collection('meetups');
    const meetups = await meetupCollection.find().toArray()
    client.close()
    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                image: meetup.image,
                address: meetup.address,
                id: meetup._id.toString()
            })),
        },
        revalidate: 10
    }
}

export default function HomePage(props) {
    return <Fragment>
        <Head>
            <title> React Meetups</title>
            <meta name="description" content="Browse a huge list of highly active React Meetups!"></meta>
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}

