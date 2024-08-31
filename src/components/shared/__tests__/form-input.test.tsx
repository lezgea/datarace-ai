import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import { FormInput } from '../form-input';

// Mock register function
const mockRegister = jest.fn((name: string) => ({
    name,
    onBlur: jest.fn(),
    onChange: jest.fn(),
    ref: jest.fn(),
}));

describe('FormInput Component', () => {
    it('renders without errors', () => {
        const { asFragment } = render(
            <FormInput
                label="Name"
                type="text"
                placeholder="Enter your name"
                errors={{}}
                register={mockRegister as unknown as UseFormRegister<any>}
                name="name"
            />
        );

        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your name')).toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });

    it('displays error message when there is an error', () => {
        const errors: FieldErrors = {
            name: { type: 'required', message: 'Name is required' },
        };

        const { asFragment } = render(
            <FormInput
                label="Name"
                type="text"
                placeholder="Enter your name"
                errors={errors}
                register={mockRegister as unknown as UseFormRegister<any>}
                name="name"
            />
        );

        expect(screen.getByText('Name is required')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toHaveClass('ring-2 ring-red-500');
        expect(asFragment()).toMatchSnapshot();
    });

    it('renders with an icon and calls onClickIcon when clicked', () => {
        const mockOnClickIcon = jest.fn();
        const icon = <span>Icon</span>;

        const { asFragment } = render(
            <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                errors={{}}
                register={mockRegister as unknown as UseFormRegister<any>}
                name="password"
                icon={icon}
                onClickIcon={mockOnClickIcon}
            />
        );

        expect(screen.getByText('Icon')).toBeInTheDocument();
        fireEvent.click(screen.getByText('Icon'));
        expect(mockOnClickIcon).toHaveBeenCalledTimes(1);
        expect(asFragment()).toMatchSnapshot();
    });
});

