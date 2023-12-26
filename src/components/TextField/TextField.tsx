import React, {CSSProperties} from 'react';
import {Path, RegisterOptions, UseFormRegister} from "react-hook-form";
import {IFormValues} from "../../page/CreateTeam/CreateTeam";


export interface TextFieldProps {
    form?: {
        label: Path<IFormValues>,
        register: UseFormRegister<IFormValues>,
        options?: RegisterOptions,
    }
    maxWidth?: number | string;
    placeholder?: string;
    style?: CSSProperties;
    value?: string;
    setValue?: (value: string) => void;
}

function TextField({maxWidth, placeholder, style, setValue, value, form,}: TextFieldProps) {
    function handleChange(e: any) {
        const {target} = e;
        if (setValue)
            setValue(target.value);
    }

    return (

        <input
            {...(form ? form.register(form.label, form.options) : {})}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            style={{height: 40, borderRadius: 8, padding: '12px 16px', maxWidth: maxWidth || 400, ...style}}
            className="block w-full border-0 text-gray-900 ring-1 ring-inset ring-gray-300
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600
                 sm:text-sm sm:leading-6 hover:ring-purple-600"

        />
    );
}

export default TextField;
