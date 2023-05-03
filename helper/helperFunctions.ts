export const getFormattedDate = (date: string) => {
    return (
        date.substring(5, 7) +
        '/' +
        date.substring(8, 10) +
        '/' +
        date.substring(0, 4)
    );
};

export const getFormattedTime = (date: string) => {
    const convertedDate = new Date(date);
    const time = convertedDate.toLocaleTimeString();

    const timeArray = time.split(':');
    const amPm = Number(timeArray[0]) <= 12 ? ' AM' : ' PM';
    const hours =
        Number(timeArray[0]) <= 12 ? timeArray[0] : Number(timeArray[0]) - 12;

    return hours + ':' + timeArray[1] + amPm;
};

export const getTimeLeftToJoin = (timeLimit: string): string => {
    const today = new Date();
    const timeLimitDate = new Date(timeLimit);

    const leftTimeToJoin = timeLimitDate.getTime() - today.getTime();
    const differenceInDays = Math.floor(leftTimeToJoin / (1000 * 3600 * 24));

    if (differenceInDays < 1) {
        const differenceInHours = leftTimeToJoin / (1000 * 3600);
        if (differenceInHours < 0) {
            return 'time to join is over';
        }

        if (differenceInHours < 1) {
            return '<1 hour left to apply';
        }

        return (
            Math.floor(differenceInHours) +
            (Math.floor(differenceInHours) === 1
                ? ' hour left to apply'
                : ' hours left to apply')
        );
    }
    return (
        differenceInDays +
        (differenceInDays === 1 ? ' day left to apply' : ' days left to apply')
    );
};

export const formatDateForDateInput = (input: number) => {
    let output;
    if (input < 10) {
        output = '0' + input;
    } else {
        output = input;
    }
    return output;
};

export const formatDateForForm = (date: Date) => {
    return (
        date.getFullYear() +
        '-' +
        formatDateForDateInput(date.getMonth() + 1) +
        '-' +
        formatDateForDateInput(date.getDate()) +
        'T' +
        date.toLocaleTimeString().substring(0, 5)
    );
};
