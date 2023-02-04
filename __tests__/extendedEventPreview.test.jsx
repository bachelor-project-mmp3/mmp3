import { render, screen } from '@testing-library/react';
import ExtendedEventPreview from '../components/organisms/events/ExtendedEventPreview';
import '@testing-library/jest-dom';

const event = {
    id: '1892739473825897435',
    title: 'Pizza',
    info: 'Amazing',
    host: {
        firstName: 'Lisa',
        email: 'test@example.com',
    },
};

jest.mock('next/router', () => require('next-router-mock'));

describe('ExtendedEventPreview', () => {
    it('shows the title, info and hostname', () => {
        render(<ExtendedEventPreview event={event} />);

        const title = screen.getByText(event.title);
        const info = screen.getByText('Info: ' + event.info);
        const host = screen.getByText('Host: ' + event.host.firstName);

        expect(title).toBeInTheDocument();
        expect(info).toBeInTheDocument();
        expect(host).toBeInTheDocument();
    });
});
