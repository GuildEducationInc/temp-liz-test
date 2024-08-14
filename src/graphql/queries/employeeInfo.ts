import { gql } from '@apollo/client';

export const GET_EMPLOYEE_INFO = gql`
  query GET_EMPLOYEE_INFO($input: GetEmployeeInput!) {
    getEmployee(input: $input) {
      eligibilitySnapshot {
        id
        eligible
        startDate
      }
    }
  }
`;
