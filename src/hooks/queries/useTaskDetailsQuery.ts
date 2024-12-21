import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';

const path: keyof paths = '/project-task/{taskId}';
type MutationPath = paths[typeof path]['get'];
type RequestParams = MutationPath['parameters']['path'];
type Response = MutationPath['responses']['200']['content']['application/json'];

const get = async ({ taskId }: RequestParams) => {
    const { data } = await api.getClient().get(replace(path, '{taskId}', taskId));
    return data;
};

export default function useTaskDetailsQuery(
    params: RequestParams,
    options?: Omit<UseQueryOptions<Response, AxiosError, Response>, 'queryKey' | 'queryFn'>
) {
    return useQuery<Response, AxiosError, Response>({
        ...options,
        queryKey: [queryKeys.taskDetails, params.taskId],
        queryFn: () => get(params),
    });
}
