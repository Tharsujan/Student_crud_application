import {baseURL, handleResponse, handleError} from './apiUtils';

// apiService.js
export const GetAllStudents = async () => {
  try {
    console.log('Fetching students...');
    const response = await fetch(
      'http://192.168.1.27:5079/api/Student/GetAllStudents',
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const json = await response.json();
    console.log('Fetched students:', json);
    return json;
  } catch (error) {
    console.error('Error fetching student data:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

// apiService.js
export const DeleteStudent = async studentId => {
  try {
    console.log(`Deleting student with ID: ${studentId}...`);
    const response = await fetch(
      `http://192.168.1.27:5079/api/Student/Delete?id=${studentId}`,
      {
        method: 'DELETE',
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log(`Student with ID: ${studentId} deleted successfully.`);
    return true; // Indicates the student was deleted successfully
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const createStudent = async studentData => {
  try {
    console.log('Creating new student...', studentData);

    const response = await fetch(
      'http://192.168.1.27:5079/api/Student/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Student created successfully:', result);
    return result; // Return the created student data
  } catch (error) {
    console.error('Error creating student:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

export const UpdateStudent = async student => {
  try {
    const response = await fetch(
      `http://192.168.1.27:5079/api/Student/update`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student), // Send the entire student object
      },
    );

    if (response.ok) {
      const data = await response.json();
      console.log('API Response:', data);
      // Adjust this based on the API response structure
      return data.success || true; // Fallback to `true` if `success` field is absent
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    console.error('Error updating student:', error);
    throw new Error('Failed to update student');
  }
};
