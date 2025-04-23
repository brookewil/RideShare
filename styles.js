import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
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

  welcomeTitle: {
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
    width: '95%', 
    overflow: 'hidden',
    padding: 10,
    },
  }
)

