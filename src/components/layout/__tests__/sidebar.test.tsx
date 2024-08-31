import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Sidebar } from '../sidebar';

describe('Sidebar Component', () => {
    const mockNavLinks = [
        <li key="about">About Us</li>,
        <li key="races">Races</li>,
        <li key="faq">FAQ</li>,
        <li key="contact">Contact</li>,
    ];

    const mockSetSidebarOpen = jest.fn();

    beforeEach(() => {
        mockSetSidebarOpen.mockClear(); // Clear the mock function before each test
    });

    it('should render the sidebar when visible is true', () => {
        const { asFragment } = render(
            <Sidebar navLinks={mockNavLinks} visible={true} setSidebarOpen={mockSetSidebarOpen} />
        );

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('should close the sidebar when clicking outside of it', () => {
        const { asFragment } = render(
            <Sidebar navLinks={mockNavLinks} visible={true} setSidebarOpen={mockSetSidebarOpen} />
        );

        fireEvent.mouseDown(document);

        // Assert that setSidebarOpen was called with false
        expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
        expect(asFragment()).toMatchSnapshot();
    });

    it('should render correctly when sidebar is not visible', () => {
        const { asFragment } = render(
            <Sidebar navLinks={mockNavLinks} visible={false} setSidebarOpen={mockSetSidebarOpen} />
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
