import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';
const path: keyof paths = '/organization-member/{organizationId}';
type MutationPath = paths[typeof path]['post'];

type Response = MutationPath['responses']['201'];
type RequestParams = MutationPath['requestBody']['content']['application/json'];

const post = async (params: RequestParams) => {
    const { data } = await api.getClient().post(replace(path, '{organizationId}', params.organizationId), params);
    return data;
};

export default function useAddOrganizationMemberMutation(
    options: UseMutationOptions<Response, AxiosError, RequestParams> = {}
) {
    return useMutation<Response, AxiosError, RequestParams>({
        ...options,
        mutationFn: (params: RequestParams) => post(params),
    });
}
