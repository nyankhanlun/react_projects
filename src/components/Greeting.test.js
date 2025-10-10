import { render, screen } from '@testing-library/react'
import Greeting from "./Greeting";
import userEvent from '@testing-library/user-event';

describe('Greeting component', () => {
    test('renders Hello World as a text.', () => {
        render(<Greeting />);
        const linkElement = screen.getByText('Hello world', { exact: false });
        expect(linkElement).toBeInTheDocument();
    });
    test('renders Good to see you if btn was not clicked!', () => {
        render(<Greeting />)
        const linkElement = screen.getByText('good to see you!', { exact: false });
        expect(linkElement).toBeInTheDocument();
    });

    test('renders changed! if btn was clicked!', async () => {
        //arrange
        render(<Greeting />)

        //act
        const btnElement = screen.getByRole('button')
        await userEvent.click(btnElement)

        //assert
        const outputElement = screen.getByText('Changed');
        expect(outputElement).toBeInTheDocument();
    });

    test('does not render "good to see you" if the button was clicked', async () => {
        render(<Greeting />)

        const btnElement = screen.getByRole('button')
        await userEvent.click(btnElement)

        const outputElement = screen.queryByText('good to see you', { exact: false });
        expect(outputElement).toBeNull();

    })
})


