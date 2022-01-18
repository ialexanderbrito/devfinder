/* eslint-disable no-unused-vars */
import { createContext, useContext, useEffect, useState } from 'react';

import { IUser } from 'interfaces/IUser';

import { getUser } from 'services/getUser';

import { useToast } from './Toast';

type IGithubContext = {
  user: IUser | undefined;
  handleChangeUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePressEnter: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  username: string;
  getUserGithub: () => void;
};

const Github = createContext({} as IGithubContext);

export function GithubProvider({ children }: any) {
  const { toast } = useToast();
  const [user, setUser] = useState<IUser>();
  const [username, setUsername] = useState('');

  function handleChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handlePressEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    e.key === 'Enter' && getUserGithub();
  }

  useEffect(() => {
    const getUserDefault = async () => {
      const { data } = await getUser('ialexanderbrito');

      setUser(data);
    };

    getUserDefault();
  }, []);

  async function getUserGithub() {
    try {
      if (username === '') {
        toast.error('Digite um usuário válido', { id: 'user' });
      } else {
        toast.loading('Carregando usuário...', { id: 'user' });

        const { data, status } = await getUser(username);

        if (status === 200) {
          setUser(data);
        }

        if (status !== 200) {
          toast.error('Usuário não encontrado', { id: 'user' });
        }

        toast.success('Usuário carregado com sucesso!', { id: 'user' });
        setUsername('');
      }
    } catch (error: any) {
      toast.error('Erro ao buscar usuário', { id: 'user' });
    }
  }

  return (
    <Github.Provider
      value={{
        user,
        handleChangeUsername,
        handlePressEnter,
        username,
        getUserGithub,
      }}
    >
      {children}
    </Github.Provider>
  );
}

export function useGithub() {
  const context = useContext(Github);
  if (!context) {
    throw new Error('useGithub must be used within a GithubProvider');
  }
  return context;
}
