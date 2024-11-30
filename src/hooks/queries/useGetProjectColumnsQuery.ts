import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const path: keyof paths = '/project-board/{projectId}/columns';
type MutationPath = paths[typeof path]['get'];
type Response = MutationPath['responses']['200']['content']['application/json'];
type RequestParams = MutationPath['parameters']['path'];

const get = async (params: RequestParams) => {
    const { data } = await api.getClient().get(path.replace('{projectId}', params.projectId));
    return data;
};

export default function useGetProjectColumnsQuery(
    params: RequestParams,
    options?: UseQueryOptions<Response, AxiosError, Response>
) {
    return useQuery<Response, AxiosError, Response>({
        ...options,
        queryKey: [queryKeys.projectColumns, params.projectId],
        queryFn: () => get(params),
    });
}