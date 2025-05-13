'use client';

import { useZokuProgram } from '@/hooks/program';
import { Button } from '../ui/button';

export const UserList = () => {
  const { initUser, usersQuery } = useZokuProgram();
  initUser.mutate();

  return (
    <div>
      <Button onClick={() => initUser.mutate()}>Init User</Button>
      {usersQuery.data?.map((user) => (
        <div key={user.publicKey.toString()} className="flex gap-2">
          <div>{user.account.nickname}</div>
          <div>{user.account.avatar}</div>
        </div>
      ))}
    </div>
  );
};
