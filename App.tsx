// screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Image, StyleSheet, Modal } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface Photo {
  id: number;
  url: string;
}

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

//HomeScreen component
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  //fetches photos from the API
  useEffect(() => {
    const fetchPhotos = () => {
      const images: Photo[] = [];
      for (let i = 1; i < 70; i++) {
        images.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
      }
      setPhotos(images);
    };

    fetchPhotos();
  }, []);

  //filters photos based on search term
  const filteredPhotos = photos.filter(photo => photo.id.toString().includes(searchTerm));

  //function to handle photo press
  const handlePhotoPress = (photo: Photo) => {
    setSelectedPhoto(photo);
    setModalVisible(true);
  };

  //function to handle closing the modal
  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPhoto(null);
  };


  //returns text input and a flatlist of photos
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search photos by ID"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <FlatList
        data={filteredPhotos}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePhotoPress(item)}>
            <Image source={{ uri: item.url }} style={styles.photo} />
          </TouchableOpacity>
        )}
      />
      {selectedPhoto && (
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <TouchableOpacity style={styles.modalContainer} onPress={handleCloseModal}>
            <Image source={{ uri: selectedPhoto.url }} style={styles.enlargedPhoto} />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

//establishes styles for the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  photo: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enlargedPhoto: {
    width: 300,
    height: 300,
  },
});

export default HomeScreen;
