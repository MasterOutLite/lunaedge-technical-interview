import React, {ReactNode} from 'react';

export interface BadgeProps {
    children: ReactNode;
    handleClick?: () => void;
}

function Badge({children, handleClick}: BadgeProps) {
    return (
        <span style={{padding: '2px 10px'}}
              className={'inline-flex items-center text-xs font-medium rounded-full bg-gray-200'}>
            {children}
          </span>
    );
}

export default Badge;
