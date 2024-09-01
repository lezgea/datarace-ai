import React from 'react';
import { render } from '@testing-library/react';
import { Loader } from '../loader';

describe('Loader Component', () => {
    it('renders without errors', () => {
        const { asFragment } = render(<Loader />);
        expect(asFragment()).toMatchSnapshot();
    });

    it('displays the loader image', () => {
        const { getByAltText } = render(<Loader />);
        expect(getByAltText('Logo')).toBeInTheDocument();
    });
});
