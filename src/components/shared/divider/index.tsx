import React from 'react';

interface DividerProps {
    color?: string; // Allows customization of the divider color
    thickness?: string; // Allows customization of the thickness
    marginY?: string; // Allows customization of the vertical margin
}

export const Divider: React.FC<DividerProps> = ({
    color = 'gray-100', // Default color
    thickness = '1px', // Default thickness
    marginY = 'my-2', // Default vertical margin
}) => {
    return (
        <div
            className={`w-full ${marginY} border-t`}
            style={{ borderColor: `${color}`, borderTopWidth: thickness }}
        />
    );
};

export default Divider;
