import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Event, { EventProps } from "../components/Event"
import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const events = await prisma.event.findMany({
    include: {
      host : {
        select: { firstName: true },
      },
    },
  });
  return {
    props: { events: JSON.parse(JSON.stringify(events)) },
    revalidate: 10,
  };
};

type Props = {
  events: EventProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <h1>Events</h1>
        <main>
          {props.events.map((event) => (
            <div key={event.id} className="post">
              <Event event={event} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
