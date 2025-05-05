import React, { useState, useEffect } from 'react';
 import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
 } from 'react-native';
 import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
 import { db } from '../firebaseConfig';
 import { doc, getDoc, updateDoc } from 'firebase/firestore';
 import * as ImagePicker from 'expo-image-picker';
 import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

 function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullname, setFullname] = useState('');
  const [password, setPassword] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [car, setCar] = useState(null);
  const [editingCar, setEditingCar] = useState(false);
  const [carYear, setCarYear] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carColor, setCarColor] = useState('');
  const [carPlate, setCarPlate] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  const fetchUserProfile = async () => {
   if (user) {
    try {
     const userRef = doc(db, 'Users', user.uid);
     const userSnap = await getDoc(userRef);

     if (userSnap.exists()) {
      const userData = userSnap.data();
      setProfile(userData);
      setProfileImage(userData.profileImage || null);
      setUsername(userData.username || '');
      setBirthday(userData.birthday || '');
      setPhoneNumber(userData.phoneNumber || '');
      setFullname(userData.fullname || '');
      setPassword(userData.password || '');

      if (userData.car) {
       const carRef = doc(db, 'Cars', userData.car);
       const carSnap = await getDoc(carRef);
       if (carSnap.exists()) {
        const carData = carSnap.data();
        setCar(carData);
        setCarYear(carData.year ? carData.year.toString() : '');
        setCarMake(carData.make || '');
        setCarModel(carData.model || '');
        setCarColor(carData.color || '');
        setCarPlate(carData.plate || '');
       } else {
        console.log('Car document not found!');
        setCar(null);
       }
      } else {
       setCar(null);
      }
     } else {
      console.log('No user found!');
     }
    } catch (error) {
     console.error('Error fetching user data: ', error);
    }
   }
  };

  useEffect(() => {
   fetchUserProfile();
  }, [user]);

  const pickImage = async () => {
   const options = {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 0.7,
   };

   let result = await ImagePicker.launchImageLibraryAsync(options);

   if (!result.canceled) {
    setIsUploading(true);
    try {
     const imageUrl = await uploadImageToFirebaseStorage(result.assets[0].uri);
     setProfileImage(imageUrl);
     setProfile((prev) => ({ ...prev, profileImage: imageUrl }));
     await updateProfileData({ profileImage: imageUrl });
    } catch (error) {
     Alert.alert(
      'Upload Failed',
      'There was an error uploading the image. Please try again.'
     );
     console.error('Image upload error:', error);
    } finally {
     setIsUploading(false);
    }
   }
  };

  const uploadImageToFirebaseStorage = async (uri) => {
   const storage = getStorage();
   const response = await fetch(uri);
   const blob = await response.blob();
   const filename = `profileImages/<span class="math-inline">\{user\.uid\}\_</span>{new Date().getTime()}.jpg`;
   const imageRef = ref(storage, filename);

   try {
    await uploadBytes(imageRef, blob);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
   } catch (error) {
    console.error('Firebase Storage upload error:', error);
    throw error;
   }
  };

  const updateProfileData = async (updatedData) => {
   if (!user) return;

   try {
    const userRef = doc(db, 'Users', user.uid);
    await updateDoc(userRef, updatedData);
    console.log('Profile updated!');
    // Re-fetch the profile data to update the state
    fetchUserProfile();
   } catch (error) {
    console.error('Error updating profile data:', error);
   }
  };

  const handleUsernameChange = (text) => setUsername(text);
  const handleBirthdayChange = (text) => setBirthday(text);
  const handlePhoneNumberChange = (text) => setPhoneNumber(text);
  const handleFullnameChange = (text) => setFullname(text);
  const handlePasswordChange = (text) => setPassword(text);

  const handleCarYearChange = (text) => setCarYear(text);
  const handleCarMakeChange = (text) => setCarMake(text);
  const handleCarModelChange = (text) => setCarModel(text);
  const handleCarColorChange = (text) => setCarColor(text);
  const handleCarPlateChange = (text) => setCarPlate(text);

  const saveProfileChanges = async () => {
   const updatedData = {
    fullname: fullname,
    birthday: birthday,
    phoneNumber: phoneNumber,
    password: password, // Still allow password changes
   };

   // Update Firestore document (excluding username/email)
   await updateProfileData(updatedData);

   // Only update password in Authentication if it has a value
   if (password) {
    try {
     await updatePassword(user, password);
     console.log('Authentication password updated!');
     Alert.alert('Profile Updated', 'Your profile information has been updated.');
    } catch (authError) {
     console.error('Error updating Firebase Auth (password):', authError);
     Alert.alert(
      'Update Failed',
      `Error updating password: ${authError.message}`
     );
     fetchUserProfile();
     return;
    }
   } else {
    Alert.alert('Profile Updated', 'Your profile information has been updated.');
   }

   setEditing(false);
   fetchUserProfile();
  };

  const saveCarChanges = async () => {
   if (!user || !profile?.car) return;

   try {
    const carRef = doc(db, 'Cars', profile.car);
    await updateDoc(carRef, {
     year: parseInt(carYear, 10),
     make: carMake,
     model: carModel,
     color: carColor,
     plate: carPlate,
    });
    fetchUserProfile();
    setEditingCar(false);
    Alert.alert('Car Updated', 'Your car information has been updated.');
   } catch (error) {
    console.error('Error updating car data:', error);
    Alert.alert(
     'Update Failed',
     'There was an error updating your car information.'
    );
   }
  };

  const cancelProfileEdit = () => {
   setEditing(false);
   setUsername(profile?.username || '');
   setBirthday(profile?.birthday || '');
   setPhoneNumber(profile?.phoneNumber || '');
   setFullname(profile?.fullname || '');
   setPassword(profile?.password || '');
  };

  if (!profile) {
   return (
    <View style={styles.centered}>
     <Text>Loading profile...</Text>
    </View>
   );
  }

  return (
   <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
    <View style={styles.profileImageContainer}>
     <TouchableOpacity
      onPress={pickImage}
      disabled={isUploading}
      style={styles.imageTouchableOpacity}
     >
      <Image
       source={{
        uri: profileImage || 'https://www.w3schools.com/howto/img_avatar.png',
       }}
       style={styles.profileImage}
      />
      {isUploading && <ActivityIndicator style={styles.loadingIndicator} />}
     </TouchableOpacity>
    </View>

    <View style={styles.profileInfo}>
     {editing ? (
      <>
       <Text style={styles.label}>Name:</Text>
       <TextInput
        style={styles.input}
        value={fullname}
        onChangeText={handleFullnameChange}
       />
       <Text style={styles.label}>Email (Not changeable):</Text>
       <TextInput
        style={styles.input}
        value={username}
        editable={false} // Make the email input non-editable
       />
       <Text style={styles.label}>Password:</Text>
       <TextInput
        style={styles.input}
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
       />
       <Text style={styles.label}>Birthday:</Text>
       <TextInput
        style={styles.input}
        value={birthday}
        onChangeText={handleBirthdayChange}
       />
       <Text style={styles.label}>Phone Number:</Text>
       <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
       />

       <TouchableOpacity
        style={[styles.button, { alignSelf: 'stretch', marginTop: 10 }]}
        onPress={saveProfileChanges}
       >
        <Text style={styles.buttonText}>Save Changes</Text>
       </TouchableOpacity>
       <TouchableOpacity
        style={[styles.buttonSecondary, { alignSelf: 'stretch', marginTop: 10 }]}
        onPress={cancelProfileEdit}
       >
        <Text style={styles.buttonSecondaryText}>Cancel Edit</Text>
       </TouchableOpacity>
      </>
     ) : (
      <>
       <View style={styles.infoRow}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{profile?.fullname}</Text>
       </View>
       <View style={styles.infoRow}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{profile?.username}</Text>
       </View>
       <View style={styles.infoRow}>
        <Text style={styles.label}>Password:</Text>
        <Text style={styles.value}>
         {profile?.password ? '*'.repeat(profile.password.length) : ''}
        </Text>
       </View>
       <View style={styles.infoRow}>
        <Text style={styles.label}>Birthday:</Text>
        <Text style={styles.value}>{profile?.birthday}</Text>
       </View>
       <View style={styles.infoRow}>
        <Text style={styles.label}>Phone Number:</Text>
        <Text style={styles.value}>{profile?.phoneNumber}</Text>
       </View>

       <TouchableOpacity
        style={[styles.button, { alignSelf: 'stretch' }]}
        onPress={() => setEditing(true)}
       >
        <Text style={styles.buttonText}>Edit Profile</Text>
       </TouchableOpacity>
      </>
     )}

     {profile?.car && (
      <View style={styles.carInfoContainer}>
       <Text style={styles.sectionTitle}>Your Car</Text>
       {editingCar ? (
        <>
         <Text style={styles.label}>Year:</Text>
         <TextInput
          style={styles.input}
          value={carYear}
          onChangeText={handleCarYearChange}
          keyboardType="numeric"
         />
         <Text style={styles.label}>Make:</Text>
         <TextInput
          style={styles.input}
          value={carMake}
          onChangeText={handleCarMakeChange}
         />
         <Text style={styles.label}>Model:</Text>
         <TextInput
          style={styles.input}
          value={carModel}
          onChangeText={handleCarModelChange}
         />
         <Text style={styles.label}>Color:</Text>
         <TextInput
          style={styles.input}
          value={carColor}
          onChangeText={handleCarColorChange}
         />
         <Text style={styles.label}>Plate:</Text>
         <TextInput
          style={styles.input}
          value={carPlate}
          onChangeText={handleCarPlateChange}
         />
         <TouchableOpacity
          style={[styles.button, { alignSelf: 'stretch', marginTop: 10 }]}
          onPress={saveCarChanges}
         >
          <Text style={styles.buttonText}>Save Car</Text>
         </TouchableOpacity>
         <TouchableOpacity
          style={[
           styles.buttonSecondary,
           { alignSelf: 'stretch', marginTop: 10 },
          ]}
          onPress={() => setEditingCar(false)}
         >
          <Text style={styles.buttonSecondaryText}>Cancel Car Edit</Text>
         </TouchableOpacity>
        </>
       ) : (
        <>
         <View style={styles.infoRow}>
          <Text style={styles.label}>Year:</Text>
          <Text style={styles.value}>{car?.year}</Text>
         </View>
         <View style={styles.infoRow}>
          <Text style={styles.label}>Make:</Text>
          <Text style={styles.value}>{car?.make}</Text>
         </View>
         <View style={styles.infoRow}>
          <Text style={styles.label}>Model:</Text>
          <Text style={styles.value}>{car?.model}</Text>
         </View>
         <View style={styles.infoRow}>
          <Text style={styles.label}>Color:</Text>
          <Text style={styles.value}>{car?.color}</Text>
         </View>
         <View style={styles.infoRow}>
          <Text style={styles.label}>Plate:</Text>
          <Text style={styles.value}>{car?.plate}</Text>
         </View>
         <TouchableOpacity
          style={[styles.button, { alignSelf: 'stretch', marginTop: 10 }]}
          onPress={() => setEditingCar(true)}
         >
          <Text style={styles.buttonText}>Edit Car</Text>
         </TouchableOpacity>
        </>
       )}
      </View>
     )}

     <View style={{ marginTop: 15 }} />
     {/* Add some vertical space here */}
     <View style={styles.infoRow}>
      <Text style={styles.label}>Rating:</Text>
      <Text style={styles.value}>{profile?.rating}</Text>
     </View>
    </View>
   </ScrollView>
  );
 }

 const styles = StyleSheet.create({
  container: {
   flex: 1,
   padding: 20,
   backgroundColor: '#fff',
  },
  profileImageContainer: {
   alignItems: 'center',
   marginTop: 40,
   marginBottom: 20,
  },
  imageTouchableOpacity: {
   alignItems: 'center',
  },
  profileImage: {
   width: 140,
   height: 140,
   borderRadius: 70,
   borderWidth: 2,
   borderColor: '#ccc',
   marginBottom: 10,
   marginTop: 50,
  },
  profileInfo: {
   marginTop: 20,
   paddingHorizontal: 10,
  },
  infoRow: {
   marginBottom: 15,
  },
  label: {
   fontSize: 16,
   fontWeight: 'bold',
   marginBottom: 5,
  },
  value: {
   fontSize: 16,
  },
  input: {
   borderBottomWidth: 1,
   borderColor: '#aaa',
   fontSize: 18,
   paddingVertical: 4,
   marginBottom: 10,
  },
  centered: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
  },
  loadingIndicator: {
   position: 'absolute',
   top: 0,
   left: 0,
   right: 0,
   bottom: 0,
   justifyContent: 'center',
   alignItems: 'center',
  },
  button: {
   backgroundColor: '#450000',
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 5,
   marginTop: 15,
  },
  buttonText: {
   color: 'white',
   fontSize: 15,
   fontWeight: 'bold',
   textAlign: 'center',
  },
  
  carInfoContainer: {
   marginTop: 30,
   paddingHorizontal: 10,
   borderTopWidth: 1,
   borderColor: '#eee',
   paddingTop: 20,
  },
  sectionTitle: {
   fontSize: 18,
   fontWeight: 'bold',
   marginBottom: 15,
   textAlign: 'center',
  },
  buttonSecondary: {
   backgroundColor: '#6c757d', // Example secondary button color
   paddingVertical: 10,
   paddingHorizontal: 20,
   borderRadius: 5,
   marginTop: 10,
   alignSelf: 'stretch',
  },
  buttonSecondaryText: {
   color: 'white',
   fontSize: 15,
   fontWeight: 'bold',
   textAlign: 'center',
  },
 });

 export default ProfileScreen;