import { PropsWithChildren, memo, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, FormProvider, SubmitHandler, UseFormProps, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { Stack, StackProps } from '@mui/material';

interface SimpleFormProps<T extends FieldValues> {
    onSubmit: SubmitHandler<T>;
    validationSchema: Yup.AnyObjectSchema;
}

function SimpleForm<T extends FieldValues>({
    children,
    defaultValues,
    onSubmit,
    validationSchema,
    ...props
}: PropsWithChildren<UseFormProps<T> & SimpleFormProps<T>> & StackProps<{}>) {
    const methods = useForm({
        defaultValues,
        resolver: yupResolver(validationSchema),
    });
    const { handleSubmit, reset } = methods;

    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <FormProvider {...methods}>
            <Stack component="form" spacing={2} noValidate onSubmit={handleSubmit(onSubmit)} {...props}>
                {children}
            </Stack>
        </FormProvider>
    );
}

export default memo(SimpleForm) as typeof SimpleForm;
