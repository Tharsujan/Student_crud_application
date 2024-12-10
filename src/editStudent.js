// EditScreen.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useUpdateStudentMutation} from './services/studentApi';
//import {UpdateStudent} from './student'; // Function to update student details

const EditScreen = ({route, navigation}) => {
  const {student} = route.params || {}; // Destructure student from route.params

  const [name, setName] = useState(student?.name || '');
  const [address, setAddress] = useState(student?.address || '');
  const [phoneNo, setPhoneNo] = useState(student?.phoneNo?.toString() || '');

  useEffect(() => {
    if (student) {
      setName(student.name);
      setAddress(student.address);
      setPhoneNo(student.phoneNo?.toString() || ''); // Convert phoneNo to a string
    }
  }, [student]);

  const [updateStudent] = useUpdateStudentMutation();

  const handleSave = async () => {
    if (!name.trim() || !address.trim() || !phoneNo.trim()) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    const updatedStudent = {
      id: student.id, // Existing student ID
      name: name.trim(), // Updated name
      address: address.trim(), // Updated address
      phoneNo: parseInt(phoneNo, 10), // Updated phone number as an integer
    };

    try {
      await updateStudent(updatedStudent).unwrap(); // Call the mutation and unwrap the result
      Alert.alert('Success', 'Student details updated successfully');
      navigation.goBack(); // Navigate back to the previous screen
    } catch (error) {
      console.error('Error updating student:', error);
      Alert.alert('Error', 'Failed to update student details');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Student</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        value={phoneNo}
        onChangeText={setPhoneNo}
        keyboardType="phone-pad"
        maxLength={15}
      />

      <TouchableOpacity style={styles.Button} onPress={handleSave}>
        <Text style={styles.saveButtonText}>save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 5,
    marginVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 20,
  },
  Button: {
    marginVertical: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'green',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditScreen;
