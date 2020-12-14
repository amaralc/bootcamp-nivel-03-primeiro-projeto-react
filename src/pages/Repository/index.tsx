import React from 'react';
import { useRouteMatch } from 'react-router-dom';

interface RepositoryParams {
  repository: string;
}

const Repository: React.FC = () => {
  /** Busca parametros da rota dentro de useRouteMatch  */
  const { params } = useRouteMatch<RepositoryParams>();

  return <h1>Repository: {params.repository} </h1>;
};

export default Repository;
