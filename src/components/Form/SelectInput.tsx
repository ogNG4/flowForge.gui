import { Select, SelectProps, FormHelperText, FormControl, InputLabel } from '@mui/material';
import { memo } from 'react';
import { FieldPath, FieldValues, UseControllerProps, useController } from 'react-hook-form';

function SelectInput<T extends FieldValues = FieldValues, S extends FieldPath<T> = FieldPath<T>>({
    name,
    defaultValue,
    label,
    children,
    ...props
}: SelectProps & UseControllerProps<T, S> & { label?: string }) {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        defaultValue,
    });

    return (
        <FormControl size="small" error={!!error} fullWidth>
            {label && <InputLabel>{label}</InputLabel>}
            <Select value={value} onChange={onChange} label={label} {...props}>
                {children}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
        </FormControl>
    );
}

export default memo(SelectInput) as typeof SelectInput;
