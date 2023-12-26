import React, {ReactNode} from 'react';

export interface SelectTextProps {
    children: ReactNode;
    handleClick?: () => void;
    selected: boolean;
}

function SelectText({children, handleClick, selected}: SelectTextProps) {
    return (
        <li
            className={['py-1 text-xs px-3', selected ? 'bg-blue-100' : ''
            ].join(' ')}
            onClick={handleClick}
        >
            {children}
        </li>
    );
}

export default SelectText;
