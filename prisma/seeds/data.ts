import {RequestStatus, NotificationType } from "@prisma/client";

export const users = [
    {
        id:'clcudeerp0000q4fwzv4db5c8',
        firstName: 'Kerstin',
        lastName: 'Reichinger',
        email: 'kerstin.reichinger@gmx.at',
        image: null,
        interests: 'Fitness, Wandern und Festivals',
        instagram: 'kersoleynsta',
        study: 'MultimediaTechnology',
        dormitory: 'Studentenheim Puch',
        roomNumber: '110',
    },
    {
        id:'clcudeerq0001q4fw3wlqh0x6',
        firstName: 'Lisa',
        lastName: 'Rader',
        email: 'lrader.mmt-b2020@fh-salzburg.ac.at',
        image: null,
        interests: 'Reisen, Musik und gutes Essen',
        instagram: 'lisa.rader',
        study: 'MultimediaTechnology',
        dormitory: 'Studentenheim Puch',
        roomNumber: '122',
      },
      {
        id:'clcudeerq0002q4fwwuoaigwf',
        firstName: 'Timo',
        lastName: 'Mustermann',
        email: '12345@test.at',
        dormitory: 'Studentenheim Puch',
        roomNumber: '102',
        image: null,
        interests: 'Kunst, Musik machen, Party',
        instagram: null,
        study: 'MultimediaArt',
      },
];

export const events = [
    {
        id: 'clcudeesb0003q4fwnnj0difb',
        title: 'Italian Night',
        info: 'Drei Gänge Menü, also nehmt viel Hunger mit! Nicht für Vegetarier geeignet.',
        date: '2023-03-30T18:00:00.927Z',
        timeLimit: '2023-03-29T18:00:00.927Z',
        costs: 4.5,
        capacity: 5,
        image: 'default image',
        authorId: 'clcudeerq0002q4fwwuoaigwf'
    },
    {
        id:'clcudeesd0004q4fwlctptbbm',
        title: 'Indische Vielfalt',
        info: 'Achtung, scharf',
        date: '2022-12-30T17:00:00.927Z',
        timeLimit: '2022-12-29T17:00:00.927Z',
        costs: 5,
        capacity: 4,
        image: 'default image',
        authorId: 'clcudeerq0001q4fw3wlqh0x6',
        currentParticipants: 3
    },
    {
        id:'clcudeesd0005q4fwhbm8zdef',
        title: 'Sushi Night',
        info: 'Frisch gerollt und vielfältig',
        date: '2023-02-20T19:00:00.927Z',
        timeLimit: '2023-02-19T19:00:00.927Z',
        costs: 7.5,
        capacity: 3,
        image: 'default image',
        authorId: 'clcudeerq0002q4fwwuoaigwf'
    },
    {
        id:'clcudeesd0006q4fwhmq4o2ls',
        title: 'Weißwurscht-Frühshoppen',
        info: 'Tracht ist Pflicht! Nüchtern bleibt hier keiner, gerne Weißbier mitbringen.',
        date: '2023-05-01T11:00:00.927Z',
        timeLimit: '2023-04-30T11:00:00.927Z',
        costs: 4,
        capacity: 6,
        image: 'default image',
        authorId: 'clcudeerp0000q4fwzv4db5c8'
    }
]

export const dishes = [
    {
        id:'clcudeesd0006q4fwxxxq4o2ls',
        title: "Pizza Salami",
        description: "Fluffiger Teig mit gutem Belag",
        link: "https://www.google.at",
        eventId: 'clcudeesb0003q4fwnnj0difb',
    },
    {
        id:'clcudeesd0006q4fwxyzq4o2ls',
        title: "Tiramisu",
        description: "Achtung Rum enthalten",
        eventId: 'clcudeesb0003q4fwnnj0difb',
    },
    {
        id:'clcudeesd0006q4fwzzzq4o2ls',
        title: "Gemüse Curry",
        description: "Zuchini, Tomaten und Kartoffeln",
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        id:'aaaudeesd0006q4fwzzzq4o2ls',
        title: "Sushi",
        description: "Avocade, Inside-Out Gurke, Lachs-Nigiri",
        eventId: 'clcudeesd0005q4fwhbm8zdef',
    },
    {
        id:'bbbudeesd0006q4fwzzzq4o2ls',
        title: "Weißwurst mit süßen Senf und Brezen",
        description: "Tracht ist Pflicht! Nüchtern bleibt hier keiner, gerne Weißbier mitbringen.",
        eventId: 'clcudeesd0006q4fwhmq4o2ls',
    },
]


export const requests = [
    {
        status: RequestStatus.ACCEPTED,
        userId: 'clcudeerp0000q4fwzv4db5c8',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        status: RequestStatus.ACCEPTED,
        userId: 'clcudeerq0002q4fwwuoaigwf',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        status: RequestStatus.PENDING,
        userId: 'clcudeerq0001q4fw3wlqh0x6',
        eventId: 'clcudeesd0006q4fwhmq4o2ls',
    },
]

export const reviews = [
    {
        dish: 5,
        environment: 4,
        total: 5,
        text: 'Das Essen war wirklich gut und ich hab sehr nette Leute kennengelernt!',
        userId: 'clcudeerp0000q4fwzv4db5c8',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        dish: 4,
        environment: 4,
        total: 5,
        text: 'Atmosphäre und Essen war gut.',
        userId: 'clcudeerq0002q4fwwuoaigwf',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
]

export const notifications = [
    {
        message: 'Das Dinner Indische Vielfalt findet heute statt!',
        seen: true,
        type: NotificationType.EVENT,
        userId: 'clcudeerp0000q4fwzv4db5c8',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        message: 'Das Dinner Indische Vielfalt findet heute statt!',
        seen: true,
        type: NotificationType.EVENT,
        userId: 'clcudeerq0002q4fwwuoaigwf',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        message: 'Dein Dinner Indische Vielfalt findet heute statt!',
        seen: true,
        type: NotificationType.EVENT,
        userId: 'clcudeerq0001q4fw3wlqh0x6',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    // message for the host, navigate to requests
    {
        message: 'Du hast eine neue Anfrage zum Weißwurscht-Frühshoppen erhalten!',
        seen: false,
        type: NotificationType.GENERAL,
        userId: 'clcudeerp0000q4fwzv4db5c8',
        eventId: 'clcudeesd0006q4fwhmq4o2ls',
    },

]