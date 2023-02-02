import { User } from '@acme/shared-models';

export const getUsers = async () => {
  const response = await fetch('/api/users');
  const users = await response.json();
  return users as User[];
};
