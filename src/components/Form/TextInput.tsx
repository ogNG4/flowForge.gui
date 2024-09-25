import { TextField, TextFieldProps } from '@mui/material';
import { memo } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

function TextInput<T extends FieldValues = FieldValues, S extends FieldPath<T> = FieldPath<T>>({
    name,
    defaultValue,
    ...props
}: TextFieldProps & UseControllerProps<T, S> & Omit<TextFieldProps, 'variant'>) {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        defaultValue,
    });
    return (
        <TextField
            size="small"
            error={!!error}
            helperText={error?.message}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
}

export default memo(TextInput) as typeof TextInput;
