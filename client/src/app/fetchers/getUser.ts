import { User } from '@acme/shared-models';

export const getUser = async (id: number | null | undefined) => {
  if (!id) throw new Error('id is required');
  const response = await fetch(`/api/users/${id}`);
  if (!response.ok) throw new Error(response.statusText);
  return response.json() as Promise<User>;
};
