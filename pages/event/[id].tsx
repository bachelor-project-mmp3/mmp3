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
        select: { firstName: true },
      },
    },
  });

 

  const dishes = await prisma.dish.findMany({
    where: {
      eventId: String(params?.id)
    },
  })
  
  return {
    props: {event:JSON.parse(JSON.stringify(event)), dishes: JSON.parse(JSON.stringify(dishes))}
  };
};

type DishProps = {
  id: string;
  title: string;
  description?: string;
  link?: string;
};

interface EventDetailProps {
  event: EventProps,
  dishes: DishProps[]
}


const EventDetail: React.FC<EventDetailProps> = (props) => {
  return (
    <Layout>
      <div>
        <h1>Event Details</h1>
        <h2>{props?.event.title}</h2>
        <p>Host: {props?.event.host?.firstName}</p>
        <p>Infos: {props?.event.info}</p>
        {props.dishes.map((dish, index) => (
            <div key={dish.id} className="dish">
              <>
              <p>{index+1}. Gang</p>
              <p>Titel:{dish.title}</p>
              {dish.description && (<p>Beschreibung: {dish.description}</p>)}
              {dish.link && <p>Link: {dish.link}</p>}
              </>
            </div>
          ))}
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

export default EventDetail
