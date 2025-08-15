import { gql } from '@apollo/client';

export const GET_STUDENTS_BY_DESIGNATION = gql`
  query getStudentsByDesignation($courseLevelId: Int!, $designationIds: [Int!]) {
    getStudentsByDesignation(courseLevelId: $courseLevelId, designationIds: $designationIds) {
      id
      name
      slug
      __typename
    }
  }
`;
