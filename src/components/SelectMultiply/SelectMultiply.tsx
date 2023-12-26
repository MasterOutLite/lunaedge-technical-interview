import React, {ReactNode, useMemo, useState} from 'react';
import SelectText from "./SelectText";
import TextField from "../TextField/TextField";

export interface SelectMultiplyProps {
    date: any[];
    renderValue: (value: any[]) => ReactNode;
    valueSelected: any[];
    setValueSelected: React.Dispatch<React.SetStateAction<any[]>>;
    maxWidth?: number | string;
    label?: string;
    placeholder?: string;

    filter?: (search: string) => any[];
}

function SelectMultiply({filter, valueSelected, setValueSelected, date, renderValue, label, maxWidth, placeholder}: SelectMultiplyProps) {
    const [isSelect, setIsSelect] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const drawSelectItem = useMemo(() => {
        if (filter)
            return filter(search);
        return date;
    }, [search, date]);

    function onSelect() {
        setIsSelect(value => !value);
    }

    function selectItem(value: any) {
        return () => {
            if (!findSelectedItem(value))
                setValueSelected(item => [...item, value])
            else
                setValueSelected(items => items.filter(item => item != value));
        }
    }

    function hideSelect() {
        setIsSelect(false);
    }

    function findSelectedItem(value: any) {
        return valueSelected.find(item => item == value)
    }

    return (
        <div
            style={{maxWidth: maxWidth || 400, width: '100%'}}>
            {
                label ?
                    <span style={{display: "block", margin: '8px 0'}}>{label}</span>
                    : null
            }

            <div onClick={onSelect} className={
                ['border rounded-lg hover:border-purple-600 relative overflow-hidden flex',
                    isSelect ? 'ring-1 ring-inset ring-purple-600' : ''
                ].join(' ')}
                 style={{height: 32, padding: '8px 12px', gap: 4}}
            >
                {
                    valueSelected.length === 0 ?
                        <div
                            className={'text-xs  text-gray-500'}>{placeholder}</div>
                        : null
                }

                {renderValue(valueSelected)}

                <div className={['absolute right-2 min-h-full top-0 flex',].join(' ')}>
                    <svg
                        className="w-8"
                        focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon">
                        <path d="M7 10l5 5 5-5z"></path>
                    </svg>
                </div>

            </div>

            <div
                onClick={hideSelect}
                className={['h-screen w-screen top-0 left-0 fixed',
                    isSelect ? 'block' : 'hidden'].join(' ')}></div>
            <div className={['relative',].join(' ')}>
                <div className={['absolute', isSelect ? 'block' : 'hidden',
                    'min-h-60', 'min-w-full'
                ].join(' ')}>
                    {
                        filter ?
                            <TextField
                                setValue={setSearch}
                                value={search}
                                style={{margin: '8px 0'}}/>
                            :
                            null
                    }


                    <ul className={['py-2 px-1 absolute max-h-60 overflow-auto min-w-full',
                        isSelect ? 'block' : 'hidden',
                    ].join(' ')}
                    >
                        {
                            drawSelectItem.map((value, index) => (
                                <SelectText key={index}
                                            selected={findSelectedItem(value)}
                                            handleClick={selectItem(value)}
                                >
                                    {value.name}
                                </SelectText>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </div>
    );
}

export default SelectMultiply;
