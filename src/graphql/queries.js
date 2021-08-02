/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDoctor = /* GraphQL */ `
  query GetDoctor($id: ID!) {
    getDoctor(id: $id) {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;
export const listDoctors = /* GraphQL */ `
  query ListDoctors(
    $filter: ModelDoctorFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDoctors(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPatient = /* GraphQL */ `
  query GetPatient($id: ID!) {
    getPatient(id: $id) {
      id
      name
      email
      description
      createdAt
      updatedAt
    }
  }
`;
export const listPatients = /* GraphQL */ `
  query ListPatients(
    $filter: ModelPatientFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getBooking = /* GraphQL */ `
  query GetBooking($id: ID!) {
    getBooking(id: $id) {
      id
      patient
      doctor
      datetime
      createdAt
      updatedAt
    }
  }
`;
export const listBookings = /* GraphQL */ `
  query ListBookings(
    $filter: ModelBookingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBookings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        patient
        doctor
        datetime
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
