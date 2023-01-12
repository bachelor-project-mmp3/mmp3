import React from "react";
import Router from "next/router";

export type EventProps = {
  id: string;
  title: string;
  info?: string;
  host: {
    firstName: string;
    email: string;
  } | null;
};

const Event: React.FC<{ event: EventProps }> = ({ event }) => {
  const hostName = event.host.firstName ? event.host.firstName : "Unknown host";
  return (
    <div onClick={() => Router.push("/event/[id]", `/event/${event.id}`)}>
      <h2>{event.title}</h2>
      <small>Host: {hostName}</small>
      {event.info && <div>Info: {event.info}</div>}
      <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Event;
