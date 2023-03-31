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
        | 'cancel'
        | 'timelimit-host'
        | 'kickGuest'
        | 'imageUpload'
        | 'reminder-host'
        | 'reminder-guest';
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
    if (data.type === 'cancel') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.hostFirstName} cancelled event`,
            text: `${data.hostFirstName} cancelled event`,
            html: `<div>Hi ${data.guestName},<br></div>
<p>Unfortunately ${data.hostFirstName} decided to cancel the event <strong>${
                data.eventTitle
            }</strong> you wanted to attend!<br>Maybe ${
                data.hostFirstName
            } will host different events you can join in the future.<br>
 In the meantime check out other <a href=${'https://mmp3.vercel.app/events/'}>events</a></p>
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
    if (data.type === 'kickGuest') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= You will not attend ${data.eventTitle}`,
            text: `Yout will not attend ${data.eventTitle}`,
            html: `<div>Hi ${data.guestName},<br></div><p>Unfortunately, ${data.hostFirstName} decided you shouldn't join the event.<br>You should check out other <a href=
                'https://mmp3.vercel.app/events/'
            >events</a> you could join, tho!
        `,
        };
    }
    if (data.type === 'imageUpload') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?=  Upload image for ${data.eventTitle}`,
            text: ` Upload image for ${data.eventTitle}`,
            html: `<div>Hi ${data.hostFirstName},<br></div><p>your event ${
                data.eventTitle
            } is over now, we hope you had a good time and met new friends.<br>Please upload a picture of your dinner <a href=${
                'https://mmp3.vercel.app/events/' + data.eventId
            }>here</a> to show your cooking skills to the community.<br><br>See you at the next event!
        `,
        };
    }
    if (data.type === 'reminder-host') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.eventTitle} takes place tomorrow`,
            text: `${data.eventTitle} takes place tomorrow`,
            html: `<div>Hi ${
                data.hostFirstName
            },<br></div><p>your event <a href=${
                'https://mmp3.vercel.app/events/' + data.eventId
            }>${
                data.eventTitle
            }</a> takes place tomorrow! Don't forget to take a picture, which you can upload afterwards!<br>Prepare yourself and have fun! 
        `,
        };
    }
    if (data.type === 'reminder-guest') {
        return {
            subject: `=?utf-8?Q?=F0=9F=A5=84?= =?utf-8?Q?=F0=9F=A5=99?= ${data.eventTitle} takes place tomorrow`,
            text: `${data.eventTitle} takes place tomorrow`,
            html: `<div>Hi ${data.guestName},<br></div><p>the event <a href=${
                'https://mmp3.vercel.app/events/' + data.eventId
            }>${
                data.eventTitle
            }</a> takes place tomorrow! Don't forget to leave a review after the event and have fun! 
        `,
        };
    }
}
