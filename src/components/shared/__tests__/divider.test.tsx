import React from 'react';
import { render } from '@testing-library/react';
import Divider from '../divider';


describe('Divider Component', () => {
    it('should render with default props', () => {
        const { container, asFragment } = render(<Divider />);
        const divider = container.firstChild;

        expect(divider).toHaveClass('w-full my-2 border-t');
        expect(divider).toHaveStyle({ borderColor: 'gray-100', borderTopWidth: '1px' });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with custom color', () => {
        const { container, asFragment } = render(<Divider color="red" />);
        const divider = container.firstChild;

        expect(divider).toHaveStyle({ borderColor: 'red' });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with custom thickness', () => {
        const { container, asFragment } = render(<Divider thickness="2px" />);
        const divider = container.firstChild;

        expect(divider).toHaveStyle({ borderTopWidth: '2px' });
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render with custom marginY', () => {
        const { container, asFragment } = render(<Divider marginY="my-4" />);
        const divider = container.firstChild;

        expect(divider).toHaveClass('w-full my-4 border-t');
        expect(asFragment()).toMatchSnapshot();
    });

    it('should apply all custom props', () => {
        const { container, asFragment } = render(
            <Divider color="blue" thickness="3px" marginY="my-6" />
        );
        const divider = container.firstChild;

        expect(divider).toHaveClass('w-full my-6 border-t');
        expect(divider).toHaveStyle({ borderColor: 'blue', borderTopWidth: '3px' });
        expect(asFragment()).toMatchSnapshot();
    });
});
