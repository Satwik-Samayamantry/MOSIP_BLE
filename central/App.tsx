import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useBLE from './components/useBLE';

const App = () => {
  const {requestPermissions,
    scanForPeripherals,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice,
    allDevices,
  heartRate} = useBLE();

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        <Text style={styles.heartRateTitleText}>
          Nearby Devices...
        </Text>

        {allDevices.map(device => 
                    <TouchableOpacity
                     key = {device.name}
                     style={styles.ctaButton}
                     onPress = {() => connectToDevice(device)}>

                     <Text style={styles.ctaButtonText}>
                        {device.name}
                     </Text>
                     
                  </TouchableOpacity>)}

                  {/* (connectedDevice ? <Text style={styles.heartRateTitleText}> Heart rate is {heartRate}</Text> : <></>) */}
                  {/* <Text style={styles.heartRateTitleText}> {connectedDevice ? String.format( "Heart rate is {}",{heartRate})  : ""}</Text> */}
                  
                  
      </View>
      <TouchableOpacity onPress={disconnectFromDevice} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Disconnenct</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={scanForDevices} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Scan</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
  },
  ctaButton: {
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginHorizontal : 10,
  },
  ctaBluText: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: 'black',
  },
});

export default App;