import { useNavigate } from 'react-router-dom';

import { ErrorPage } from '@guildeducationinc/recess';

interface ErrorProps {
  message?: string;
  title?: string;
  subtitle?: string;
}

export const Error: React.FC<ErrorProps> = ({ message, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <ErrorPage
      title={title}
      subtitle={subtitle}
      message={message}
      goBack={() => {
        navigate('/');
      }}
    />
  );
};
