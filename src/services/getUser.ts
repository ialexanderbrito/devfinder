import { IUser } from 'interfaces/IUser';

import { api } from './api';

type IGetUserResponse = {
  data: IUser;
  status: number;
};

export async function getUser(username: string): Promise<IGetUserResponse> {
  const { data, status } = await api.get<IUser>(username);
  return { data, status };
}
