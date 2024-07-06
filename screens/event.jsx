import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Linking } from 'react-native';
import { databases, collectionId } from '../lib/appwrite';

const Event = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await databases.listDocuments('6683ffe200263fc0e5d2', collectionId);
        setEvents(response.documents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {events.length === 0 ? (
        <Text>No events available</Text>
      ) : (
        events.map(event => (
          <View key={event.$id} style={styles.eventCard}>
            <Text style={styles.eventText}>Name: {event.name}</Text>
            <Text style={styles.eventText}>USN: {event.desc}</Text>
            <Text style={styles.eventText}>College: {event.college}</Text>
            {event.photo && <Image source={{ uri: event.photo }} style={styles.eventImage} />}
            {event.url && (
              <Text
                style={styles.eventText}
                onPress={() => Linking.openURL(event.url)}
              >
                URL: {event.url}
              </Text>
            )}
            <Text style={styles.eventText}>Extra: {event.extra}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
  },
  eventCard: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  eventText: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
});

export default Event;
