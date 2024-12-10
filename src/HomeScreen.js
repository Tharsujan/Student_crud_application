import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Importing Material Icons

import {useFocusEffect} from '@react-navigation/native';
import {
  useGetAllStudentsQuery,
  useDeleteStudentMutation,
} from './services/studentApi';

const HomeScreen = ({navigation}) => {
  const {data: students = [], isLoading, refetch} = useGetAllStudentsQuery();
  const [deleteStudent] = useDeleteStudentMutation();

  // Function to fetch student details
  useFocusEffect(
    useCallback(() => {
      refetch(); // Fetch students when the screen is focused
    }, []),
  );

  // const handleDelete = async studentId => {
  //   Alert.alert(
  //     'Confirm Delete', // Alert Title
  //     `Are you sure you want to delete student with ID: ${studentId}?`, // Alert Message
  //     [
  //       {
  //         text: 'Cancel',
  //         onPress: () => console.log('Delete cancelled'),
  //         style: 'cancel', // Makes it look like a secondary action
  //       },
  //       {
  //         text: 'Delete',
  //         onPress: async () => {
  //           try {
  //             const isDeleted = await DeleteStudent(studentId);
  //             if (isDeleted) {
  //               Alert.alert(
  //                 'Success',
  //                 `Student with ID: ${studentId} deleted.`,
  //               );
  //               fetchStudents(); // Refresh the student list
  //             }
  //           } catch (error) {
  //             Alert.alert(
  //               'Error',
  //               `Failed to delete student: ${error.message}`,
  //             );
  //           }
  //         },
  //         style: 'destructive', // Indicates a critical action
  //       },
  //     ],
  //   );
  // };
  const handleDelete = async studentId => {
    Alert.alert(
      'Confirm Delete',
      `Are you sure you want to delete student with ID: ${studentId}?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteStudent(studentId).unwrap();
              Alert.alert('Success', `Student with ID: ${studentId} deleted.`);
              refetch(); // Refresh the data
            } catch (error) {
              Alert.alert('Error', 'Failed to delete student.');
            }
          },
        },
      ],
    );
  };

  const handleEdit = student => {
    navigation.navigate('editStudent', {student}); // Pass the entire student object
  };
  const handleAddStudent = () => {
    // Navigate to the AddStudentScreen or open a modal
    navigation.navigate('addStudent'); // Ensure you have this screen in your navigation
  };
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="green" />
        {/* Green Activity Indicator */}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Details</Text>

      <ScrollView>
        {!!students?.length &&
          students?.map(student => (
            <View key={student.id} style={styles.card}>
              <Text style={styles.name}>Name: {student.name}</Text>
              <Text>Address: {student.address}</Text>
              <Text>Phone No: {student.phoneNo}</Text>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  // style={styles.Button}
                  // onPress={() => handleDelete(student.id)}>
                  // <Text style={styles.ButtonText}>Delete</Text>
                  style={styles.iconButton}
                  onPress={() => handleDelete(student.id)}>
                  <Icon name="delete" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity
                  // style={styles.Button}
                  // onPress={() => handleEdit(student)}>
                  // <Text style={styles.ButtonText}>Edit</Text>
                  style={styles.iconButton}
                  onPress={() => handleEdit(student)}>
                  <Icon name="edit" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                {/* <Button
                  title="Delete"
                  onPress={() => handleDelete(student.id)}
                  color="green"
                />
                <Button
                  title="edit"
                  onPress={() => handleEdit(student)}
                  color="green"
                /> */}
              </View>
            </View>
          ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  card: {
    width: '100%',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: 'lightblue',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Button: {
    width: '40%',
    backgroundColor: 'green',
    height: 30,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
