import { Link } from 'react-router-dom';

import { PageContainer, TextLink, Typography } from '@guildeducationinc/recess';

export const Example = () => {
  return (
    <PageContainer>
      <Typography variant='h1'>Example Page</Typography>
      <Typography variant='body1'>This is an example nested route.</Typography>
      <TextLink Component={Link} to='..'>
        Go back to template home.
      </TextLink>
    </PageContainer>
  );
};

export default Example;
