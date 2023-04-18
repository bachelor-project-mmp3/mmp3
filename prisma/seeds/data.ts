import { RequestStatus, NotificationType } from '@prisma/client';

export const users = [
    {
        id: 'clcudeerp0000q4fwzv4db5c8',
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
        id: 'clcudeerq0001q4fw3wlqh0x6',
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
        id: 'clcudeerq0002q4fwwuoaigwf',
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
        authorId: 'clcudeerq0002q4fwwuoaigwf',
    },
    {
        id: 'clcudeesd0004q4fwlctptbbm',
        title: 'Indische Vielfalt',
        info: 'Achtung, scharf',
        date: '2022-12-30T17:00:00.927Z',
        timeLimit: '2022-12-29T17:00:00.927Z',
        costs: 5,
        capacity: 4,
        image: 'default image',
        authorId: 'clcudeerq0001q4fw3wlqh0x6',
        currentParticipants: 3,
    },
    {
        id: 'clcudeesd0005q4fwhbm8zdef',
        title: 'Sushi Night',
        info: 'Frisch gerollt und vielfältig',
        date: '2023-02-20T19:00:00.927Z',
        timeLimit: '2023-02-19T19:00:00.927Z',
        costs: 7.5,
        capacity: 3,
        image: 'default image',
        authorId: 'clcudeerq0002q4fwwuoaigwf',
    },
    {
        id: 'clcudeesd0006q4fwhmq4o2ls',
        title: 'Weißwurscht-Frühshoppen',
        info: 'Tracht ist Pflicht! Nüchtern bleibt hier keiner, gerne Weißbier mitbringen.',
        date: '2023-05-01T11:00:00.927Z',
        timeLimit: '2023-04-30T11:00:00.927Z',
        costs: 4,
        capacity: 6,
        image: 'default image',
        authorId: 'clcudeerp0000q4fwzv4db5c8',
    },
];

export const dishes = [
    {
        id: 'clcudeesd0006q4fwxxxq4o2ls',
        title: 'Pizza Salami',
        description: 'Fluffiger Teig mit gutem Belag',
        link: 'https://www.google.at',
        eventId: 'clcudeesb0003q4fwnnj0difb',
    },
    {
        id: 'clcudeesd0006q4fwxyzq4o2ls',
        title: 'Tiramisu',
        description: 'Achtung Rum enthalten',
        eventId: 'clcudeesb0003q4fwnnj0difb',
    },
    {
        id: 'clcudeesd0006q4fwzzzq4o2ls',
        title: 'Gemüse Curry',
        description: 'Zuchini, Tomaten und Kartoffeln',
        eventId: 'clcudeesd0004q4fwlctptbbm',
    },
    {
        id: 'aaaudeesd0006q4fwzzzq4o2ls',
        title: 'Sushi',
        description: 'Avocade, Inside-Out Gurke, Lachs-Nigiri',
        eventId: 'clcudeesd0005q4fwhbm8zdef',
    },
    {
        id: 'bbbudeesd0006q4fwzzzq4o2ls',
        title: 'Weißwurst mit süßen Senf und Brezen',
        description:
            'Tracht ist Pflicht! Nüchtern bleibt hier keiner, gerne Weißbier mitbringen.',
        eventId: 'clcudeesd0006q4fwhmq4o2ls',
    },
];

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
];

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
];

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
        message:
            'Du hast eine neue Anfrage zum Weißwurscht-Frühshoppen erhalten!',
        seen: false,
        type: NotificationType.GENERAL,
        userId: 'clcudeerp0000q4fwzv4db5c8',
        eventId: 'clcudeesd0006q4fwhmq4o2ls',
    },
];

export const universities = [
    {
        name: 'Akademie der bildenden Künste Wien',
        nameEn: 'Akademie der bildenden Künste Wien',
    },
    {
        name: 'Anton Bruckner Privatuniversität',
        nameEn: 'Anton Bruckner Private University Upper Austria',
    },
    {
        name: 'Anton-Bruckner Privatuniversität',
        nameEn: 'Anton Bruckner Private University Upper Austria',
    },
    {
        name: 'Bertha von Suttner Privatuniversität St. Pölten GmbH',
        nameEn: 'Bertha von Suttner Private University St. Pölten',
    },
    {
        name: 'Bundesministerium für Landesverteidigung, Ausbildungswesen, Ausbildung',
        nameEn: 'Federal Ministry of Defence',
    },
    {
        name: 'CEU PU - Central European University Private University',
        nameEn: 'CEU PU - Central European University Private University',
    },
    {
        name: 'Campus 02 Fachhochschule der Wirtschaft GmbH',
        nameEn: 'Campus 02 University of Applied Sciences',
    },
    {
        name: 'Charlotte Fresenius Privatuniversität',
        nameEn: 'Charlotte Fresenius Private University',
    },
    {
        name: 'Danube Private University',
        nameEn: 'Danube Private University',
    },
    {
        name: 'Donau-Universität Krems - Universität für Weiterbildung Krems',
        nameEn: 'Donau-Universität Krems - Universität für Weiterbildung Krems',
    },
    {
        name: 'FH Gesundheitsberufe OÖ',
        nameEn: 'University of Applied Sciences for Health Professions Upper Austria',
    },
    {
        name: 'FH Gesundheitsberufe OÖ GmbH',
        nameEn: 'University of Applied Sciences for Health Professions Upper Austria',
    },
    {
        name: 'FH Joanneum',
        nameEn: 'FH Joanneum University of Applied Sciences',
    },
    {
        name: 'FH Joanneum GmbH',
        nameEn: 'FH Joanneum University of Applied Sciences',
    },
    {
        name: 'FH Kufstein Tirol Bildungs GmbH',
        nameEn: 'FH Kufstein Tirol University of Applied Sciences',
    },
    {
        name: 'FH Oberösterreich',
        nameEn: 'University of Applied Sciences Upper Austria',
    },
    {
        name: 'FH OÖ Studienbetriebs GmbH',
        nameEn: 'University of Applied Sciences Upper Austria',
    },
    {
        name: 'FH OÖ Studienbetriebs GmbH (Hagenberg)',
        nameEn: 'University of Applied Sciences Upper Austria (Hagenberg)',
    },
    {
        name: 'FH OÖ Studienbetriebs GmbH (Wels)',
        nameEn: 'University of Applied Sciences Upper Austria (Wels)',
    },
    {
        name: 'FH OÖ Studienbetriebs GmbH gemeinsam mit der Johannes Kepler Universität Linz',
        nameEn: 'University of Applied Sciences Upper Austria together with Johannes Kepler University Linz',
    },
    {
        name: 'FH ÖO Studienbetriebs GmbH',
        nameEn: 'University of Applied Sciences Upper Austria',
    },
    {
        name: 'FHG -  Zentrum für Gesundheitsberufe Tirol GmbH',
        nameEn: 'Health University of Applied Sciences Tyrol',
    },
    {
        name: 'FHG - Zentrum für Gesundheitsberufe Tirol GmbH',
        nameEn: 'Health University of Applied Sciences Tyrol',
    },
    {
        name: 'FHG – Zentrum für Gesundheitsberufe Tirol GmbH',
        nameEn: 'Health University of Applied Sciences Tyrol',
    },
    {
        name: 'FHW – Fachhochschul-Studiengänge Betriebs- und Forschungseinrichtungen der Wiener Wirtschaft GmbH',
        nameEn: 'FHWien der WKW – University of Applied Sciences for Management & Communication',
    },
    {
        name: 'Fachachoschule Campus Wien',
        nameEn: 'FH Campus Wien University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Burgenland GmbH',
        nameEn: 'University of Applied Sciences Burgenland',
    },
    {
        name: 'Fachhochschule Campus 02 GmbH',
        nameEn: 'Campus 02 University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Campus Wien',
        nameEn: 'FH Campus Wien University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Kärnten',
        nameEn: 'Carinthia University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Oberösterreich Studienbetriebs GmbH',
        nameEn: 'University of Applied Sciences Upper Austria',
    },
    {
        name: 'Fachhochschule Salzburg (Puch)',
        nameEn: 'Salzburg University of Applied Sciences (Puch)',
    },
    {
        name: 'Fachhochschule Salzburg GmbH',
        nameEn: 'Salzburg University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Salzburg GmbH gemeinsam mit der Universität Salzburg',
        nameEn: 'University of Applied Sciences Salzburg GmbH together with the University of Salzburg',
    },
    {
        name: 'Fachhochschule St. Pölten',
        nameEn: 'University of Applied Sciences St. Pölten',
    },
    {
        name: 'Fachhochschule St. Pölten GmbH',
        nameEn: 'University of Applied Sciences St. Pölten',
    },
    {
        name: 'Fachhochschule Technikum GmbH',
        nameEn: 'UAS Technikum Wien',
    },
    {
        name: 'Fachhochschule Technikum Wien',
        nameEn: 'University of Applied Sciences Technikum Wien',
    },
    {
        name: 'Fachhochschule Technikum Wien gemeinsam mit der FH Kärnten',
        nameEn: 'University of Applied Sciences Technikum Wien together with Carinthia Universty of Applied Sciences',
    },
    {
        name: 'Fachhochschule Vorarlberg',
        nameEn: 'Vorarlberg University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Vorarlberg GmbH',
        nameEn: 'Vorarlberg University of Applied Sciences',
    },
    {
        name: 'Fachhochschule Wiener Neustadt',
        nameEn: 'University of Applied Sciences Wiener Neustadt',
    },
    {
        name: 'Fachhochschule Wiener Neustadt GmbH',
        nameEn: 'University of Applied Sciences Wiener Neustadt',
    },
    {
        name: 'Fachhochschule des BFI Wien GmbH',
        nameEn: 'University of Applied Sciences BFI Vienna',
    },
    {
        name: 'Fachhochschule des bfi Wien',
        nameEn: 'University of Applied Sciences BFI Vienna',
    },
    {
        name: 'Ferdinand Porsche FernFH',
        nameEn: 'Ferdinand Porsche FernFH',
    },
    {
        name: 'Gustav Mahler Privatuniversität für Musik',
        nameEn: 'Gustav Mahler Private University of Music',
    },
    {
        name: 'Hochschule für Agrar- und Umweltpädagogik',
        nameEn: 'University College for Agrarian and Environmental Pedagogy',
    },
    {
        name: 'Hochschule für Agrar- und Umweltpädagogik Wien',
        nameEn: 'University College for Agrarian and Environmental Pedagogy Vienna',
    },
    {
        name: 'Hochschule für Argrar- und Umweltpädagogik',
        nameEn: 'University College for Agrarian and Environmental Pedagogy',
    },
    {
        name: 'IMC Fachhochschule Krems',
        nameEn: 'IMC University of Applied Sciences Krems',
    },
    {
        name: 'IMC Fachhochschule Krems GmbH',
        nameEn: 'IMC University of Applied Sciences Krems',
    },
    {
        name: 'JAM MUSIC LAB - Private University for Jazz and Popular Music Vienna',
        nameEn: 'JAM MUSIC LAB - Private University for Jazz and Popular Music Vienna',
    },
    {
        name: 'JAM MUSIC LAB Private University for Jazz and Popular Music Vienna (Wien)',
        nameEn: 'JAM MUSIC LAB Private University for Jazz and Popular Music Vienna (Wien)',
    },
    {
        name: 'Johannes Kapler Universität Linz',
        nameEn: 'Johannes Kapler Universität Linz',
    },
    {
        name: 'Johannes Kepler Universität Linz',
        nameEn: 'University of Linz',
    },
    {
        name: 'Johannes Kepler Universität Linz gemeinsam mit der Fachhochschule Oberösterreich',
        nameEn: 'Johannes Kepler Universität Linz gemeinsam mit der Fachhochschule Oberösterreich',
    },
    {
        name: 'Johannes Kepler Universität Linz gemeinsam mit der Medizinischen Universität Graz',
        nameEn: 'Johannes Kepler Universität Linz gemeinsam mit der Medizinischen Universität Graz',
    },
    {
        name: 'Johannes Kepler Universität Linz gemeinsam mit der Universität Innsbruck',
        nameEn: 'Johannes Kepler University Linz together with the University of Innsbruck',
    },
    {
        name: 'Johannes Kepler Universität Linz, Universität Salzburg',
        nameEn: 'University of Linz, together with the University of Salzburg',
    },
    {
        name: 'Johannes Kepler Universität Linz, Universität für künstlerische und industrielle gestaltung Linz, Ka',
        nameEn: 'Johannes Kepler University Linz, University of Art and Design Linz',
    },
    {
        name: 'Karl Landsteiner Privatuniversität für Gesundheitswissenschaften',
        nameEn: 'Karl Landsteiner University of Health Sciences',
    },
    {
        name: 'Karl Landsteiner Privatuniversität für Gesundheitswissenschaften GmbH',
        nameEn: 'Karl Landsteiner Privatuniversität für Gesundheitswissenschaften GmbH',
    },
    {
        name: 'Katholisch Pädagogische Hochschuleinrichtung in Klagenfurt',
        nameEn: 'Katholisch Pädagogische Hochschuleinrichtung in Klagenfurt',
    },
    {
        name: 'Katholische Privat-Universität Linz',
        nameEn: 'Catholic Private University Linz',
    },
    {
        name: 'Katholische Privatuniversität Linz',
        nameEn: 'Katholische Privatuniversität Linz',
    },
    {
        name: 'Kirchlich Pädagogische Hochschule Wien gemeinsam mit der Pädagogischen Hochschule Wien',
        nameEn: 'Kirchlich Pädagogische Hochschule Wien gemeinsam mit der Pädagogischen Hochschule Wien',
    },
    {
        name: 'Kirchlich Pädagogische Hochschule Wien und Krems',
        nameEn: 'Kirchlich Pädagogische Hochschule Wien und Krems',
    },
    {
        name: 'Kirchliche Pädagogische Hochschule Edith Stein',
        nameEn: 'Kirchliche Pädagogische Hochschule Edith Stein',
    },
    {
        name: 'Kirchliche Pädagogische Hochschule Wien und Krems',
        nameEn: 'Kirchliche Pädagogische Hochschule Wien und Krems',
    },
    {
        name: 'Kirchliche Pädagogische Hoschule der Diözese Graz Seckau',
        nameEn: 'Catholic University College of Education Graz',
    },
    {
        name: 'Lauda Business School',
        nameEn: 'Lauda Business School',
    },
    {
        name: 'Lauder Business School',
        nameEn: 'Lauder Business School',
    },
    {
        name: 'MCI Management Center Innsbruck',
        nameEn: 'MCI – Management Center Innsbruck',
    },
    {
        name: 'MCI Management Center Innsbruck - Internationale Hochschule GmbH',
        nameEn: 'MCI Management Center Innsbruck',
    },
    {
        name: 'MCI Management Center Innsbruck Internationale Hochschule GmbH',
        nameEn: 'MCI – Management Center Innsbruck – The Entrepreneurial School',
    },
    {
        name: 'MODUL University Vienna',
        nameEn: 'MODUL University Vienna',
    },
    {
        name: 'MODUL University Vienna Private University (Wien)',
        nameEn: 'MODUL University Vienna, Private University',
    },
    {
        name: 'MODUL University Vienna, Privatuniversity',
        nameEn: 'MODUL University Vienna, Private University',
    },
    {
        name: 'MODUL University Vienna, Privatuniversität',
        nameEn: 'MODUL University Vienna, Private University',
    },
    {
        name: 'Medizinische Universität Graz',
        nameEn: 'Medical University of Graz',
    },
    {
        name: 'Medizinische Universität Graz gemeinsam mit der Universität Linz',
        nameEn: 'Medical University of Graz together with the University of Linz',
    },
    {
        name: 'Medizinische Universität Innsbruck',
        nameEn: 'Medical University of Innsbruck',
    },
    {
        name: 'Medizinische Universität Wien',
        nameEn: 'Medical University of Vienna',
    },
    {
        name: 'Medizinische Universität Wien gemeinsam mit der Universität Wien',
        nameEn: 'Medical University of Vienna together with the University of Vienna',
    },
    {
        name: 'Montan Universität Leoben',
        nameEn: 'Montanuniversität Leoben',
    },
    {
        name: 'Montanuniversität Leoben',
        nameEn: 'Montanuniversität Leoben',
    },
    {
        name: 'Musik und Kunst Privatuniversität der Stadt Wien (MUK)',
        nameEn: 'Musik und Kunst Privatuniversität der Stadt Wien (MUK)',
    },
    {
        name: 'Musik und Kunst, Privatuntiversität der Stadt Wien (MUK)',
        nameEn: 'Musik und Kunst, Privatuntiversität der Stadt Wien (MUK)',
    },
    {
        name: 'New Design University Privatuniversität GesmbH',
        nameEn: 'New Design University Privatuniversität GesmbH',
    },
    {
        name: 'Paracelsus Medizinische Privatuniversität',
        nameEn: 'Paracelsus Medical University',
    },
    {
        name: 'Philosophisch-Theologische Hochschule Benedikt XVI. Heiligenkreuz',
        nameEn: 'Philosophisch-Theologische Hochschule Benedikt XVI. Heiligenkreuz',
    },
    {
        name: 'Philosophisch-Theologische Hochschule der Diözese St. Pölten',
        nameEn: 'Philosophisch-Theologische Hochschule der Diözese St. Pölten',
    },
    {
        name: 'Private Pädagogische Hochschule Augustinum',
        nameEn: 'Catholic University College of Education Graz',
    },
    {
        name: 'Private Pädagogische Hochschule Burgenland',
        nameEn: 'University College of Teacher Education Burgenland',
    },
    {
        name: 'Private Pädagogische Hochschule der Diözese Linz',
        nameEn: 'Private University of Education, Diocese of Linz',
    },
    {
        name: 'Privater Studiengang für das Lehramt für Islamische Religion an Pflichtschulen',
        nameEn: 'Privater Studiengang für das Lehramt für Islamische Religion an Pflichtschulen',
    },
    {
        name: 'Privatuniversität Schloss Seeburg',
        nameEn: 'Private University Seeburg Castle',
    },
    {
        name: 'Pädadogische Hochschule Salzburg',
        nameEn: 'University College of Teacher Education Salzburg',
    },
    {
        name: 'Pädagogische  Hochschule Salzburg',
        nameEn: 'University College of Teacher Education Salzburg',
    },
    {
        name: 'Pädagogische Hochschule Kärnten - Viktor Frankl Hochschule',
        nameEn: 'Pädagogische Hochschule Kärnten - Viktor Frankl Hochschule',
    },
    {
        name: 'Pädagogische Hochschule Kärnten, Viktor Frankl Hochschule',
        nameEn: 'University College of Teacher Education Carinthia - Viktor Frankl College',
    },
    {
        name: 'Pädagogische Hochschule Niederösterreich',
        nameEn: 'University College of Teacher Education Lower Austria',
    },
    {
        name: 'Pädagogische Hochschule Niederösterreich in Kooperation mit der PH Oberösterreich und der Uni Klagen',
        nameEn: 'Pädagogische Hochschule Niederösterreich in Kooperation mit der PH Oberösterreich und der Uni Klagen',
    },
    {
        name: 'Pädagogische Hochschule Oberösterreich',
        nameEn: 'Pädagogische Hochschule Oberösterreich',
    },
    {
        name: 'Pädagogische Hochschule Salzburg',
        nameEn: 'Pädagogische Hochschule Salzburg',
    },
    {
        name: 'Pädagogische Hochschule Steiermark',
        nameEn: 'University College of Teacher Education Styria',
    },
    {
        name: 'Pädagogische Hochschule Tirol',
        nameEn: 'University College of Teacher Education Tyrol',
    },
    {
        name: 'Pädagogische Hochschule Vorarlberg',
        nameEn: 'Pädagogische Hochschule Vorarlberg',
    },
    {
        name: 'Pädagogische Hochschule Wien',
        nameEn: 'Pädagogische Hochschule Wien',
    },
    {
        name: 'Pädagogische Hochschulen Kärnten',
        nameEn: 'University Colleges of Teacher Education Carinthia and Lower Austria',
    },
    {
        name: 'Sigmund Freud Privatuniversität',
        nameEn: 'Sigmund Freud Private University Vienna',
    },
    {
        name: 'Technische Universität Graz',
        nameEn: 'Graz University of Technolology',
    },
    {
        name: 'Technische Universität Graz (gemeinsam mit der Universität Graz)',
        nameEn: 'Technische Universität Graz (gemeinsam mit der Universität Graz)',
    },
    {
        name: 'Technische Universität Graz gemeinsam mit der  Universität Graz',
        nameEn: 'Graz University of Technolology together with University of Graz',
    },
    {
        name: 'Technische Universität Graz gemeinsam mit der Universität Graz',
        nameEn: 'Technische Universität Graz gemeinsam mit der Universität Graz',
    },
    {
        name: 'Technische Universität Graz gemeinsam mit der Universität Graz,',
        nameEn: 'Technische Universität Graz gemeinsam mit der Universität Graz,',
    },
    {
        name: 'Technische Universität Graz gemeinsam mit der Universität für Musik und Darstellende Kunst Graz',
        nameEn: 'Technische Universität Graz gemeinsam mit der Universität für Musik und Darstellende Kunst Graz',
    },
    {
        name: 'Technische Universität Graz in Kooperation mit der Universität Graz',
        nameEn: 'Graz University of Technolology in cooperation with the University of Graz',
    },
    {
        name: 'Technische Universität Graz und Universität Graz',
        nameEn: 'Graz University of Technolology and University of Graz',
    },
    {
        name: 'Technische Universität Wien',
        nameEn: 'Technische Universität Wien',
    },
    {
        name: 'Technische Universität Wien (gemeinsam mit der Universität Wien)',
        nameEn: 'Technische Universität Wien (gemeinsam mit der Universität Wien)',
    },
    {
        name: 'Technische Universität Wien gemeinsam mit der UABG Sofia',
        nameEn: 'Technische Universität Wien gemeinsam mit der UABG Sofia',
    },
    {
        name: 'Tiroler Privatuniversität UMIT',
        nameEn: 'Tiroler Privatuniversität UMIT',
    },
    {
        name: 'UMIT TIROL – Private Universität für Gesundheitswissenschaften und -technologie GmbH',
        nameEn: 'UMIT TIROL – Private University for Health Sciences, Medical Informatics and Technology',
    },
    {
        name: 'UMIT Tirol - Private Universität für Gesundheitswissenschaften und -technologie GmbH',
        nameEn: 'UMIT - University for Health Sciences, Medical Informatics and Technology',
    },
    {
        name: 'UMIT Tirol - Private Universität für Gesundheitswissenschaften und -technologie GmbH, Uni Innsbruck',
        nameEn: 'UMIT Tirol - Private Universität für Gesundheitswissenschaften und -technologie GmbH, Uni Innsbruck',
    },
    {
        name: 'UMIT Tirol - Private Universität für Gesundheitswissenschaften und -technologie GmbH/ Uni Innsbruck',
        nameEn: 'UMIT - University for Health Sciences, Medical Informatics and Technology (Hall)',
    },
    {
        name: 'UMIT Tirol - Private Universität für Gesundheitswissenschaften und -technologie GmbH//Uni Innsbruck',
        nameEn: 'UMIT Tirol - Private Universität für Gesundheitswissenschaften und -technologie GmbH//Uni Innsbruck',
    },
    {
        name: 'Univeristät Graz gemeinsam mit der Technischen Universität Graz',
        nameEn: 'University of Graz together with Graz University of Technology',
    },
    {
        name: 'Universität  Klagenfurt',
        nameEn: 'University of Klagenfurt',
    },
    {
        name: 'Universität Graz',
        nameEn: 'Universität Graz',
    },
    {
        name: 'Universität Graz (gemeinsam mit der Universität Ljubliana)',
        nameEn: 'Universität Graz (gemeinsam mit der Universität Ljubliana)',
    },
    {
        name: 'Universität Graz gemeinsam mit der TU Graz',
        nameEn: 'University of Graz together with Graz University of Technology',
    },
    {
        name: 'Universität Graz gemeinsam mit der Technische Universität Graz',
        nameEn: 'University of Graz together with Graz University of Technology',
    },
    {
        name: 'Universität Graz gemeinsam mit der Technischen Universität Graz',
        nameEn: 'Universität Graz gemeinsam mit der Technischen Universität Graz',
    },
    {
        name: 'Universität Graz gemeinsam mit der Technsichen Universität Graz',
        nameEn: 'Universität Graz gemeinsam mit der Technsichen Universität Graz',
    },
    {
        name: 'Universität Graz gemeinsam mit der Universität für Musik und darstellende Kunst Graz',
        nameEn: 'Universität Graz gemeinsam mit der Universität für Musik und darstellende Kunst Graz',
    },
    {
        name: 'Universität Graz in Kooperation mit der TU Graz',
        nameEn: 'University of Graz in cooperation with the Graz University of Technology',
    },
    {
        name: 'Universität Graz, Technische Universität Graz',
        nameEn: 'Universität Graz, Technische Universität Graz',
    },
    {
        name: 'Universität Innsbruck',
        nameEn: 'University of Innsbruck',
    },
    {
        name: 'Universität Innsbruck gemeinsam mit der Johannes Kepler Universität Linz',
        nameEn: 'University of Innsbruck together with the Johannes Kepler University Linz',
    },
    {
        name: 'Universität Innsbruck gemeinsam mit der UMIT Privatuniversität',
        nameEn: 'Universität Innsbruck gemeinsam mit der UMIT Privatuniversität',
    },
    {
        name: 'Universität Innsbruck und UMIT Tirol',
        nameEn: 'Universität Innsbruck und UMIT Tirol',
    },
    {
        name: 'Universität Klagenfur',
        nameEn: 'Universität Klagenfur',
    },
    {
        name: 'Universität Klagenfurt',
        nameEn: 'University of Klagenfurt',
    },
    {
        name: 'Universität Linz',
        nameEn: 'Johannes Kepler University Linz',
    },
    {
        name: 'Universität Mozareum Salzburg',
        nameEn: 'Universität Mozareum Salzburg',
    },
    {
        name: 'Universität Mozarteum Salzburg',
        nameEn: 'Universität Mozarteum Salzburg',
    },
    {
        name: 'Universität Mozarteum Salzburg gemeinsam mit der Universität Salzburg',
        nameEn: 'Universität Mozarteum Salzburg gemeinsam mit der Universität Salzburg',
    },
    {
        name: 'Universität Mozarteum Salzburg, Standort Innsbruck',
        nameEn: 'Universität Mozarteum Salzburg, Standort Innsbruck',
    },
    {
        name: 'Universität Salzburg',
        nameEn: 'Universität Salzburg',
    },
    {
        name: 'Universität Salzburg gemeinsam mit der Johannes Kepler Universität Linz',
        nameEn: 'Universität Salzburg gemeinsam mit der Johannes Kepler Universität Linz',
    },
    {
        name: 'Universität Salzburg gemeinsam mit der Universität Mozartum Salzburg',
        nameEn: 'University of Salzburg together with Mozarteum University Salzburg',
    },
    {
        name: 'Universität Salzburg, Fachhochschule Salzburg',
        nameEn: 'University of Salzburg, Salzburg University of Applied Sciences',
    },
    {
        name: 'Universität Salzburg, TU München',
        nameEn: 'University of Salzburg',
    },
    {
        name: 'Universität Wien',
        nameEn: 'University of Vienna',
    },
    {
        name: 'Universität Wien gemeinsam mit der Medizinischen Universität Wien',
        nameEn: 'University of Vienna together with the Medical University of Vienna',
    },
    {
        name: 'Universität Wien gemeinsam mit der Veterinärmedizinischen Universität Wien',
        nameEn: 'University of Vienna together with the University of Veterinary Medicine Vienna',
    },
    {
        name: 'Universität Wien,  FH Campus Wien',
        nameEn: 'Universität Wien,  FH Campus Wien',
    },
    {
        name: 'Universität Wien, TU Wien',
        nameEn: 'University of Vienna (together with Vienna University of Technology)',
    },
    {
        name: 'Universität Wien, TU Wien, BOKU Wien',
        nameEn: 'Univ. of Vienna, Vienna Univ. of Technology, Univ. of Natural Resources and Life Sciences, Vienna',
    },
    {
        name: 'Universität für Angewandte Kunst Wien',
        nameEn: 'University of Applied Arts Vienna',
    },
    {
        name: 'Universität für Bodenkultur Wien',
        nameEn: 'Universität für Bodenkultur Wien',
    },
    {
        name: 'Universität für Bodenkultur gemeinsam mit der Veterinärmedizinischen Universität Wien',
        nameEn: 'Universität für Bodenkultur gemeinsam mit der Veterinärmedizinischen Universität Wien',
    },
    {
        name: 'Universität für Musik und Darstellende Kunst Graz',
        nameEn: 'Universität für Musik und Darstellende Kunst Graz',
    },
    {
        name: 'Universität für Musik und darstellende Kunst Graz',
        nameEn: 'Universität für Musik und darstellende Kunst Graz',
    },
    {
        name: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Fachhochschule JOANNEUM Graz',
        nameEn: 'University of Music and Performing Arts Graz together with FH Joanneum – Univ. of Applied Sciences',
    },
    {
        name: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Technische Universität Graz',
        nameEn: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Technische Universität Graz',
    },
    {
        name: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Technischen Universität Graz',
        nameEn: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Technischen Universität Graz',
    },
    {
        name: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Universität Graz',
        nameEn: 'Universität für Musik und darstellende Kunst Graz gemeinsam mit der Universität Graz',
    },
    {
        name: 'Universität für Musik und darstellende Kunst Wien',
        nameEn: 'University of Music and Performing Arts Vienna',
    },
    {
        name: 'Universität für angewandte Kunst Wien',
        nameEn: 'University of Applied Arts Vienna',
    },
    {
        name: 'Universität für künstlerische und industrielle Gestaltung Linz',
        nameEn: 'University of Arts and Industrial Design Linz',
    },
    {
        name: 'Veterinärmedizinische Universität',
        nameEn: 'University of Veterinary Medicine, Vienna',
    },
    {
        name: 'Veterinärmedizinische Universität Wien',
        nameEn: 'Veterinärmedizinische Universität Wien',
    },
    {
        name: 'Veterinärmedizinische Universität Wien; Universität für Bodenkultur Wien',
        nameEn: 'University of Veterinary Medicine Vienna; University of Natural Resources and Life Sciences, Vienna',
    },
    {
        name: 'Veterinärmedizinischen Universität Wien gemeinsam mit der Universität für Bodenkultur Wien',
        nameEn: 'University of Natural Resources and Life Sciences, Vienna together with the University of Veterinary',
    },
    {
        name: 'Webster Vienna Private University',
        nameEn: 'Webster Vienna Private University',
    },
    {
        name: 'Wirtschaftsuniversität Wien',
        nameEn: 'Vienna University of Economics and Business',
    },
];
