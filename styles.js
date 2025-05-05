import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  loginContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
    
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: '100%' 
  },

  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 7,
    marginTop: 10,
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

  map: {
    height: '55%', 
    width: '100%', 
    overflow: 'hidden',
    flex: 0.7,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 10,
  },

  mapContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
    
  radioGroup: {
    flexDirection: 'column',
    marginVertical: 20,
  },
  
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  
  radioCircle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#450000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#450000',
  },
  
  radioText: {
    fontSize: 16,
  },
  profileContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginVertical: 5,
  },
  
  navigation: {
    display: 'none',
  },

  rideRequests: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },

  rideRequest: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },

  ridePreview: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 10,
  },
  
  rideRequest: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

}
)

