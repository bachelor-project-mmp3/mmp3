import { getFormattedDate, getFormattedTime } from './helperFunctions';

export function getEmailTemplate(data: {
    hostFirstName: string;
    eventTitle: string;
    guestName?: string;
    guestId?: string;
    type:
        | 'join'
        | 'accepted'
        | 'declined'
        | 'leave'
        | 'edit'
        | 'timelimit-host';
    eventId?: string;
    eventDetail?: { amountOfGuests: number };
}) {
    if (data.type === 'join') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.guestName} wants to join`,
            text: `${data.guestName} wants to join`,
            html: `<div>Hi ${
                data.hostFirstName
            },</div><p>Somebody wants to join your event <strong>${
                data.eventTitle
            }</strong>!<br>
        Check out your possible guest <a href=${
            'https://mmp3.vercel.app/profile/' + data.guestId
        }>${data.guestName}</a> and answer the request to join.</p>`,
        };
    }
    if (data.type === 'accepted') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.hostFirstName} accepts join request`,
            text: `${data.hostFirstName} accepts join request`,
            html: `<div>Hi ${data.guestName},<br></div><p>${
                data.hostFirstName
            }  just accepted your join request for <strong>${
                data.eventTitle
            }</strong>!<br>
            Check out the event for all information that will be important for you to know <a href=${
                'https://mmp3.vercel.app/events/' + data.eventId
            }>here</a>.<br><br>Enjoy your time at the event, make new friends and have fun!
        `,
        };
    }
    if (data.type === 'declined') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.hostFirstName} declined join request`,
            text: `${data.hostFirstName} declined join request`,
            html: `<div>Hi ${data.guestName},<br></div><p>We're sorry, ${data.hostFirstName}  just declined your join request for <strong>${data.eventTitle}</strong>!<br>
            But we are sure you can find another event to join. Keep your head up and get ready to join another event!
        `,
        };
    }
    if (data.type === 'leave') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.guestName} left event`,
            text: `${data.guestName} left event`,
            html: `<div>Hi ${data.hostFirstName},<br></div><p><a href=${
                'https://mmp3.vercel.app/profile/' + data.guestId
            }>${data.guestName}</a> just left your event <strong>${
                data.eventTitle
            }</strong>!<br>
        `,
        };
    }
    if (data.type === 'edit') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.hostFirstName} edited event`,
            text: `${data.hostFirstName} edited event`,
            html: `<div>Hi ${data.guestName},<br></div>
<p>${data.hostFirstName} just edited <strong>${
                data.eventTitle
            }</strong> you will be joining! <br>Check out what changed: <a href=${
                'https://mmp3.vercel.app/events/' + data.eventId
            }>${data.eventTitle}</a></p>
        `,
        };
    }
    if (data.type === 'timelimit-host') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= Timelimit to join your event ${data.eventTitle} is over`,
            text: `Timelimit to join your event ${data.eventTitle} is over`,
            html: `<div>Hi ${
                data.hostFirstName
            },<br></div><p>the time to join your event <a href=${
                'https://mmp3.vercel.app/events/' + data.eventId
            }>${data.eventTitle}</a> is over!<br>
            Final amount of guests:  ${data.eventDetail.amountOfGuests}<br>
            Get ready, make your grocery run and show your cooking skills.<br>
            Enjoy your time at the event, make new friends and have fun!
        `,
        };
    }
}
