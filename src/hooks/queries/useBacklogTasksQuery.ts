import queryKeys from '@/constants/queryKeys';
import { paths } from '@/types/apiSchema';
import api from '@/utils/api';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { replace } from 'lodash';

const path: keyof paths = '/project-task/{projectId}/backlog';
type MutationPath = paths[typeof path]['get'];
type RequestParams = MutationPath['parameters']['path'];
type Response = MutationPath['responses']['200']['content']['application/json'];

const get = async ({ projectId }: RequestParams) => {
    const { data } = await api.getClient().get(replace(path, '{projectId}', projectId));
    return data;
};

export default function useTaskDetailsQuery(
    params: RequestParams,
    options?: Omit<UseQueryOptions<Response, AxiosError, Response>, 'queryKey' | 'queryFn'>
) {
    return useQuery<Response, AxiosError, Response>({
        ...options,
        queryKey: [queryKeys.projectBacklogTasks, params.projectId],
        queryFn: () => get(params),
    });
}
