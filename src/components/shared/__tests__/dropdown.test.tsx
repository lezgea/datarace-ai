import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown } from '../dropdown';


describe('Dropdown Component', () => {
    const content = <div>Dropdown Content</div>;
    const trigger = <button>Open Dropdown</button>;

    it('should render the children and content correctly', () => {
        const { container, asFragment } = render(
            <Dropdown content={content}>
                {trigger}
            </Dropdown>
        );

        expect(screen.getByText('Open Dropdown')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should toggle the dropdown content on click', () => {
        render(
            <Dropdown content={content}>
                {trigger}
            </Dropdown>
        );

        const triggerElement = screen.getByText('Open Dropdown');

        expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
        fireEvent.click(triggerElement);
        expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
        fireEvent.click(triggerElement);
        expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
    });

    it('should close the dropdown when clicking outside', () => {
        render(
            <Dropdown content={content}>
                {trigger}
            </Dropdown>
        );

        const triggerElement = screen.getByText('Open Dropdown');

        fireEvent.click(triggerElement);
        expect(screen.getByText('Dropdown Content')).toBeInTheDocument();
        fireEvent.mouseDown(document);
        expect(screen.queryByText('Dropdown Content')).not.toBeInTheDocument();
    });

    it('should match snapshot when dropdown is open', () => {
        const { asFragment } = render(
            <Dropdown content={content}>
                {trigger}
            </Dropdown>
        );

        fireEvent.click(screen.getByText('Open Dropdown'));
        expect(asFragment()).toMatchSnapshot();
    });
});
