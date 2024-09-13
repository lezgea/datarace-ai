"use client";

import React from 'react';
import classNames from 'classnames';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    circle?: boolean;
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
    width = '100%',
    height = '20px',
    circle = false,
    className
}) => {
    const styles = {
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: circle ? '50%' : '20px',
    };

    return (
        <div
            className={classNames(
                'bg-gray-200 animate-pulse',
                className
            )}
            style={styles}
        ></div>
    );
};

export default Skeleton;
