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
        render(<Sidebar navLinks={mockNavLinks} visible={true} setSidebarOpen={mockSetSidebarOpen} />);

        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    it('should close the sidebar when clicking outside of it', () => {
        render(<Sidebar navLinks={mockNavLinks} visible={true} setSidebarOpen={mockSetSidebarOpen} />);

        // Simulate clicking outside the sidebar
        fireEvent.mouseDown(document);

        // Assert that setSidebarOpen was called with false
        expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
    });
});
