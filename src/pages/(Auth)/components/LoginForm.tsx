import { useLoginMutation, useToast, useToken } from '@/hooks';
import * as yup from 'yup';
import { Stack, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/Form/TextInput';
import LoadingButton from '@/components/Button/LoadingButton';
import { useNavigate } from 'react-router-dom';

interface FormInput {
    email: string;
    password: string;
}

function LoginForm() {
    const { t } = useTranslation();
    const { mutate: loginMutate, isPending: loginPending } = useLoginMutation();
    const { showError, showSuccess } = useToast();
    const { setToken, token } = useToken();
    const navigate = useNavigate();
    const validationSchema = useMemo(() => {
        const schema = {
            email: yup.string().required(t('Email jest wymagany.')).email(t('Email jest niepoprawny.')),
            password: yup.string().required(t('Hasło jest wymagane.')),
        };

        return yup.object().shape(schema);
    }, [t]);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema as yup.ObjectSchema<FormInput>),
    });
    const { handleSubmit } = methods;

    const handleSave = useCallback(() => {
        handleSubmit(({ email, password }) => {
            loginMutate(
                { email, password },
                {
                    onSuccess: (data) => {
                        showSuccess('Login successful!');
                        setToken(data.accessToken);
                    },
                    onError: () => showError('Invalid credentials'),
                }
            );
        })();
    }, []);

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token]);

    return (
        <>
            <FormProvider {...methods}>
                <Stack component="form" spacing={2} onSubmit={handleSubmit(handleSave)} className="w-1/5 max-w-[450px]">
                    <TextInput<FormInput> name="email" label={t('Email')} />
                    <TextInput<FormInput> name="password" type="password" label={t('Hasło')} />
                    <Stack direction="row" className="justify-between">
                        <Link href="/auth/create-account">{t('Zarejestruj się')}</Link>
                        <Link href="/auth/forgot-password">{t('Zapomniałeś hasła?')}</Link>
                    </Stack>
                    <LoadingButton className="w-full" variant="contained" type="submit" isLoading={loginPending}>
                        {t('Zaloguj Się')}
                    </LoadingButton>
                </Stack>
            </FormProvider>
        </>
    );
}

export default LoginForm;
