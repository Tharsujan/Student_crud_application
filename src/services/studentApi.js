import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const studentApi = createApi({
  reducerPath: 'studentApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://192.168.1.27:5079/api/Student/'}),
  endpoints: builder => ({
    getAllStudents: builder.query({
      query: () => 'GetAllStudents',
    }),
    deleteStudent: builder.mutation({
      query: studentId => ({
        url: `Delete?id=${studentId}`,
        method: 'DELETE',
      }),
    }),
    createStudent: builder.mutation({
      query: newStudent => ({
        url: 'create',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: newStudent,
      }),
    }),
    updateStudent: builder.mutation({
      query: student => ({
        url: 'update',
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: student,
      }),
    }),
  }),
});

export const {
  useGetAllStudentsQuery,
  useDeleteStudentMutation,
  useCreateStudentMutation,
  useUpdateStudentMutation,
} = studentApi;
