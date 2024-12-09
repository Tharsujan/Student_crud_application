import React, {useEffect, useState, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {GetAllStudents, DeleteStudent} from './student';

const HomeScreen = ({navigation}) => {
  const [students, setStudents] = useState([]);

  // Function to fetch student details
  useFocusEffect(
    useCallback(() => {
      fetchStudents(); // Fetch students when the screen is focused
    }, []),
  );

  const fetchStudents = async () => {
    try {
      const data = await GetAllStudents();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };
  const handleDelete = async studentId => {
    Alert.alert(
      'Confirm Delete', // Alert Title
      `Are you sure you want to delete student with ID: ${studentId}?`, // Alert Message
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete cancelled'),
          style: 'cancel', // Makes it look like a secondary action
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              const isDeleted = await DeleteStudent(studentId);
              if (isDeleted) {
                Alert.alert(
                  'Success',
                  `Student with ID: ${studentId} deleted.`,
                );
                fetchStudents(); // Refresh the student list
              }
            } catch (error) {
              Alert.alert(
                'Error',
                `Failed to delete student: ${error.message}`,
              );
            }
          },
          style: 'destructive', // Indicates a critical action
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
                  style={styles.Button}
                  onPress={() => handleDelete(student.id)}>
                  <Text style={styles.ButtonText}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={() => handleEdit(student)}>
                  <Text style={styles.ButtonText}>Edit</Text>
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
});
