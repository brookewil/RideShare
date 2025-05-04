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
    padding: 10,
    marginTop: 40,
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

  navigation: {
    display: 'none',
  },
}
)

