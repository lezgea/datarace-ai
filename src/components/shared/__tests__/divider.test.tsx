import React from 'react';
import { render } from '@testing-library/react';
import Divider from '../divider';


describe('Divider Component', () => {
    it('should render with default props', () => {
        const { container } = render(<Divider />);
        const divider = container.firstChild;

        expect(divider).toHaveClass('w-full my-2 border-t');
        expect(divider).toHaveStyle({
            borderColor: 'gray-100',
            borderTopWidth: '1px',
        });
    });

    it('should render with custom color', () => {
        const { container } = render(<Divider color="red" />);
        const divider = container.firstChild;

        expect(divider).toHaveStyle({
            borderColor: 'red',
        });
    });

    it('should render with custom thickness', () => {
        const { container } = render(<Divider thickness="2px" />);
        const divider = container.firstChild;

        expect(divider).toHaveStyle({
            borderTopWidth: '2px',
        });
    });

    it('should render with custom marginY', () => {
        const { container } = render(<Divider marginY="my-4" />);
        const divider = container.firstChild;

        expect(divider).toHaveClass('w-full my-4 border-t');
    });

    it('should apply all custom props', () => {
        const { container } = render(
            <Divider color="blue" thickness = "3px" marginY = "my-6" />
        );
        const divider = container.firstChild;

        expect(divider).toHaveClass('w-full my-6 border-t');
        expect(divider).toHaveStyle({
            borderColor: 'blue',
            borderTopWidth: '3px',
        });
    });
});
