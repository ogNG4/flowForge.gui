import { useLoginMutation, useToast, useVerifyAccountMutation } from '@/hooks';
import LoginForm from '../components/LoginForm';
import * as yup from 'yup';

import { Box, Stack, Typography, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import TextInput from '@/components/Form/TextInput';
import LoadingButton from '@/components/Button/LoadingButton';

interface FormInput {
    email: string;
    password: string;
}

function Page() {
    const { t } = useTranslation();
    const { mutate: loginMutate, isPending: loginPending } = useLoginMutation();
    const { showError, showSuccess } = useToast();
    const [accountExists, setAccountExists] = useState<boolean | null>(null);

    return (
        <>
            <LoginForm />
        </>
    );
}

export default Page;
