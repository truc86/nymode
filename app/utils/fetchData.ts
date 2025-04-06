import { type DataResponse } from '~/types/Data';

export async function fetchData() {
  const url = useRequestURL();
  const baseURL = `${url.protocol}//${url.host}`;

  return await useFetch<DataResponse>(`${baseURL}/data.json`);
}
