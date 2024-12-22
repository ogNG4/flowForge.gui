import { Checkbox, FormControlLabel, FormControlLabelProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

interface CheckboxInputProps extends Omit<FormControlLabelProps, 'control'> {
    name: string;
}

export default function CheckboxInput({ name, ...props }: CheckboxInputProps) {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field }) => (
                <FormControlLabel
                    control={<Checkbox checked={field.value} onChange={(e) => field.onChange(e.target.checked)} />}
                    {...props}
                />
            )}
        />
    );
}
