import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/organization';
type MutationPath = paths[typeof path]['get'];
type Response = MutationPath['responses']['200']['content']['application/json'];

const get = async () => {
    const { data } = await api.getClient().get(path);
    console.log({ data });
    return data;
};

export default function useUserOrganizationsQuery(options?: UseQueryOptions<Response, AxiosError, Response>) {
    return useQuery<Response, AxiosError, Response>({
        ...options,
        queryKey: [queryKeys.organizations],
        queryFn: () => get(),
    });
}