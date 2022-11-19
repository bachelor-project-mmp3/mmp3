import React from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import { EventProps } from "../../components/Event"
import prisma from '../../lib/prisma';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const event = await prisma.event.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      host: {
        select: { name: true },
      },
    },
  });
  return {
    props: event,
  };
};

const Post: React.FC<EventProps> = (props) => {
  return (
    <Layout>
      <div>
        <h1>Event Details</h1>
        <h2>{props?.title}</h2>
        <p>Host: {props?.host?.name}</p>
        <p>Infos: {props?.info}</p>
      
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
