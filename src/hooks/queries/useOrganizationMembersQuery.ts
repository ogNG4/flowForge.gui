import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';

const path: keyof paths = '/organization-member/{organizationId}';
type MutationPath = paths[typeof path]['get'];
type Response = MutationPath['responses']['200']['content']['application/json'];
type RequestParams = MutationPath['parameters']['path'];

const get = async (params: RequestParams) => {
    const { data } = await api.getClient().get(replace(path, '{organizationId}', params.organizationId));
    return data;
};

export default function useOrganizationMembersQuery(
    params: RequestParams,
    options?: UseQueryOptions<Response, AxiosError, Response>
) {
    return useQuery<Response, AxiosError, Response>({
        ...options,
        queryKey: [queryKeys.organizationMembers, params.organizationId],
        queryFn: () => get(params),
    });
}
