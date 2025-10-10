import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Async from './Async';

describe('async component', () => {
    test('render posts if request succeeds', async () => {
        window.fetch = jest.fn()
        window.fetch.mockResolvedValueOnce({
            json : async () => [
                {
                    id : 'p1',
                    title:'The first post'
                }
            ]
        })
        render(<Async />)
        const listitemElement = await screen.findAllByRole('listitem')
        expect(listitemElement).not.toHaveLength(0)
    })
})