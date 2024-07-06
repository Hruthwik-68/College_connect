import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { databases } from '../lib/appwrite'; // Assuming this imports Appwrite correctly

const Home = () => {
    const [usn, setUsn] = useState('');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedUsn = await AsyncStorage.getItem('userUSN');
                if (storedUsn) {
                    console.log('USN fetched from AsyncStorage:', storedUsn); // Debugging log
                    setUsn(storedUsn);

                    // Assuming you have a method to fetch user details including name from your data source
                    const userDetails = await fetchUserDetails(storedUsn); // Replace with your actual fetch method
                    if (userDetails) {
                        setName(userDetails.name); // Assuming userDetails has a 'name' attribute
                    }
                } else {
                    console.log('No USN found in AsyncStorage'); // Debugging log
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false); // Update loading state regardless of success or failure
            }
        };

        fetchData();
    }, []);

    const fetchUserDetails = async (usn) => {
        try {
            // Example: Query the database to fetch user details based on USN
            const query = await databases.listDocuments(
                '6683ffe200263fc0e5d2', // Database ID
                '6683fffc0029b4a67b78', // Collection ID
                [`equal("usn", "${usn}")`]
            );

            if (query.total > 0) {
                return query.documents[0]; // Assuming the first document has the user details
            }
        } catch (error) {
            console.error('Failed to fetch user details:', error);
        }
        return null;
    };

    const handleSignupPress = () => {
        navigation.navigate('SignUp');
    };
    const handleAchPress = () => {
        navigation.navigate('Achievement'); 
    };
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userUSN');
            Alert.alert('Success', 'You have been logged out.');
            navigation.navigate('Login'); // Navigate to Login screen after logout
        } catch (error) {
            Alert.alert('Error', 'Failed to log out. Please try again.');
            console.error('Error clearing AsyncStorage', error);
        }
    };

    const handleAdminPress = () => {
        navigation.navigate('Admin'); // Navigate to Admin screen
    };

    const handleEventPress = () => {
        navigation.navigate('Event'); // Navigate to Event screen
    };

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.usnText}>USN: {usn}</Text>
            <Text style={styles.nameText}>Name: {name}</Text>
            <TouchableOpacity style={styles.button} onPress={handleSignupPress}>
                <Text style={styles.buttonText}>Go to Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAdminPress}>
                <Text style={styles.buttonText}>Admin</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleEventPress}>
                <Text style={styles.buttonText}>Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleAchPress}>
                <Text style={styles.buttonText}>Achievement</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    loadingContainer: {
        justifyContent: 'center',
    },
    usnText: {
        fontSize: 18,
        marginBottom: 10,
    },
    nameText: {
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#34ccff',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#ff4c4c',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default Home;

