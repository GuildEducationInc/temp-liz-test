import { Link } from 'react-router-dom';

import { PageContainer, TextLink, Typography } from '@guildeducationinc/recess';

export const Home = () => {
  return (
    <PageContainer>
      <Typography variant='h1'>Welcome</Typography>
      <Typography variant='body1'>Welcome to the EP Portal remote starter template.</Typography>
      <TextLink Component={Link} to='example'>
        View example nested route.
      </TextLink>
    </PageContainer>
  );
};
