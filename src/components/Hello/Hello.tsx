import { useNavigate } from 'react-router-dom';

import { ErrorPage } from '@guildeducationinc/recess';

import styles from './Hello.module.scss';

interface ErrorProps {
  message?: string;
  title?: string;
  subtitle?: string;
}

export const Hello: React.FC<ErrorProps> = ({ message, title, subtitle }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.container}>hello</div>
      <ErrorPage
        title={title}
        subtitle={subtitle}
        message={message}
        goBack={() => {
          navigate('/');
        }}
      />
    </>
  );
};
