import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BLEPeripheral from 'react-native-ble-peripheral'

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

function funcalls()
{
  const service_uuid = create_UUID();
  const Characteristic_uuid_1 = '00002137-0000-1000-8000-00805f9b34fb'
  const Characteristic_uuid_2 = '00002237-0000-1000-8000-00805f9b34fb'
  BLEPeripheral.addService(service_uuid, true) //for primary service
  BLEPeripheral.addCharacteristicToService(service_uuid, Characteristic_uuid_1, 16 | 1, 8) //this is a Characteristic with read and write permissions and notify property
  //BLEPeripheral.addCharacteristicToService(service_uuid, '00002237-0000-1000-8000-00805f9b34fb', 1, 8)
  console.log(service_uuid)
  console.log(Characteristic_uuid_1)
  // BLEPeripheral.addService('0000180d-0000-1000-8000-00805f9b34fb', true) 
  // BLEPeripheral.addCharacteristicToService('0000180d-0000-1000-8000-00805f9b34fb', '00002a37-0000-1000-8000-00805f9b34fb', 16 | 1, 8) 
  BLEPeripheral.sendNotificationToDevices('0000180d-0000-1000-8000-00805f9b34fb', '00002a37-0000-1000-8000-00805f9b34fb', [0x10,0x01,0xA1,0x80]) //sends a notification to all connected devices that, using the char uuid given
  // BLEPeripheral.setName('RNBLETEST')
  
  BLEPeripheral.start()
  .then(res => {
       console.log(res)
  }).catch(error => {
       console.log(error)
  })
  //console.log(service_uuid)
}

function stopfunc()
{
 BLEPeripheral.stop()

}




const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        <Text style={styles.heartRateTitleText}>
          Press Start to turn on peripheral
        </Text>

                  
                  
      </View>
      {/* <TouchableOpacity onPress={disconnectFromDevice} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Disconnenct</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={scanForDevices} style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>Scan</Text>
      </TouchableOpacity> */}
      <TouchableOpacity onPress={funcalls} style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>Start</Text>

      </TouchableOpacity>
      <TouchableOpacity onPress={stopfunc} style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>Stop</Text>

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
