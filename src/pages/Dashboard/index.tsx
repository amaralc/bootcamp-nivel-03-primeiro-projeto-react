import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

import { Title, Form, Error, Repositories } from './styles';

/** Define tipagem apenas do que será utilizado no frontend */
interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  /** Define estado do campo de input */
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    /** Busca repositorios no localStorage */
    const storagedRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    /** Se encontrar, retorna a string parseada */
    if (storagedRepositories) {
      return JSON.parse(storagedRepositories);
    }

    /** Se nao encontrar retorna array vazio */
    return [];
  });
  const [inputError, setInputError] = useState('');

  /** Executa funcao sempre que houver mudanca no repositories */
  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    /** Evita reload padrao do form */
    e.preventDefault();

    /** Caso nao exista o repositorio */
    if (!newRepo) {
      /** Define estado do erro */
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      /** Define resposta da api passando parametros e tipagem */
      const response = await api.get<Repository>(`repos/${newRepo}`);

      /** Busca repositorio dentro de data */
      const repository = response.data;

      /** Adiciona repositorio ao estado */
      setRepositories([...repositories, repository]);

      /** Define estado do input como nulo */
      setNewRepo('');

      /** Reinicia estado dos erros */
      setInputError('');
    } catch (err) {
      /** Define estado do erro */
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <Link
            key={repository.full_name}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
