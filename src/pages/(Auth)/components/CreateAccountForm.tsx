import LoadingButton from '@/components/Button/LoadingButton';
import TextInput from '@/components/Form/TextInput';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useCreateAccountMutation, useToast } from '@/hooks';
import { IconButton } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { Stack } from '@mui/material';
import UserAvatar from '@/components/Avatar/UserAvatar';

interface FormInput {
    email: string;
    password: string;
    repeatPassword: string;
    firstName: string;
    lastName: string;
}

function CreateAccountForm() {
    const { t } = useTranslation();
    const { mutate } = useCreateAccountMutation();
    const navigate = useNavigate();
    const { showError, showSuccess } = useToast();
    const [show, setShow] = useState(false);
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            email: yup.string().required(t('Email jest wymagany')).email(t('Email jest niepoprawny')),
            password: yup.string().required(t('Hasło jest wymagane')),
            repeatPassword: yup
                .string()
                .required(t('Hasło jest wymagane'))
                .oneOf([yup.ref('password')], t('Hasła muszą się zgadzać')),
            firstName: yup.string().required(t('Imię jest wymagane')),
            lastName: yup.string().required(t('Nazwisko jest wymagane')),
        });
    }, []);

    const methods = useForm<FormInput>({
        resolver: yupResolver(validationSchema as yup.ObjectSchema<FormInput>),
    });
    const { handleSubmit } = methods;

    const handleSave = ({ email, password, firstName, lastName }: FormInput) => {
        mutate(
            { email, password, firstName, lastName },
            {
                onSuccess: () => {
                    showSuccess('Account created succesful!');
                    navigate('/auth/login');
                },
                onError: () => showError('Invalid credentials'),
            }
        );
    };

    const ToggleButton = () => {
        return (
            <IconButton
                aria-label={t('Toggle password visibility')}
                bg={'transparent'}
                _hover={{ bg: 'transparent' }}
                onClick={() => setShow(!show)}
                icon={show ? <ViewOffIcon /> : <ViewIcon />}
            />
        );
    };

    return (
        <FormProvider {...methods}>
            <Stack component="form" spacing={2} onSubmit={handleSubmit(handleSave)} className="w-1/5 max-w-[450px]">
                <Stack direction="row" spacing={2} w={'100%'} alignItems="center" justifyContent="center">
                    <UserAvatar />
                </Stack>
                <TextInput<FormInput> name="email" placeholder={t('Email')} />
                <TextInput<FormInput> type={show ? 'text' : 'password'} name="password" placeholder={t('Hasło')} />
                <TextInput<FormInput>
                    type={show ? 'text' : 'password'}
                    name="repeatPassword"
                    placeholder={t('Powtórz hasło')}
                />
                <TextInput<FormInput> name="firstName" placeholder={t('Imię')} />
                <TextInput<FormInput> name="lastName" placeholder={t('Nazwisko')} />

                <LoadingButton type="submit" variant="contained">
                    {t('Zarejestruj się')}
                </LoadingButton>
            </Stack>
        </FormProvider>
    );
}

export default CreateAccountForm;
