import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';

import {NativeModules, Button} from 'react-native';


// import BLEPeripheral from 'react-native-ble-peripheral'

const {BLEModule} = NativeModules;



function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

// function funcalls()
// {
//   const service_uuid = create_UUID();
//   const Characteristic_uuid_1 = '00002137-0000-1000-8000-00805f9b34fb'
//   const Characteristic_uuid_2 = '00002237-0000-1000-8000-00805f9b34fb'

//   BLEPeripheral.addService(service_uuid, true) //for primary service
//   BLEPeripheral.addCharacteristicToService(service_uuid, Characteristic_uuid_1, 16 | 1, 8) //this is a Characteristic with read and write permissions and notify property
//   //BLEPeripheral.addCharacteristicToService(service_uuid, '00002237-0000-1000-8000-00805f9b34fb', 1, 8)
  
//   // console.log(service_uuid)
//   // console.log(Characteristic_uuid_1)
  
//   // BLEPeripheral.addService('0000180d-0000-1000-8000-00805f9b34fb', true) 
//   // BLEPeripheral.addCharacteristicToService('0000180d-0000-1000-8000-00805f9b34fb', '00002a37-0000-1000-8000-00805f9b34fb', 16 | 1, 8) 
  
//   // BLEPeripheral.sendNotificationToDevices('0000180d-0000-1000-8000-00805f9b34fb', '00002a37-0000-1000-8000-00805f9b34fb', [0x10,0x01,0xA1,0x80]) //sends a notification to all connected devices that, using the char uuid given
//   // BLEPeripheral.setName('RNBLETEST')
  
//   BLEPeripheral.start()
//   .then(res => {
//        console.log(res)
//   }).catch(error => {
//        console.log(error)
//   })

// }

function stopfunc()
{
  BLEModule.stop()
}

let service1:string = '0000180d-0000-1000-8000-00805f9b34fb';
let char1:string = '00002a37-0000-1000-8000-00805f9b34fb';

function startfunc()
{
  BLEModule.addService(service1, true) 
  BLEModule.addCharacteristicToService(service1, char1, 16 | 1, 16) //this is a Characteristic with read and write permissions and notify property
  // BLEModule.addCharacteristicToService(service_uuid, '00002237-0000-1000-8000-00805f9b34fb', 1, 8)


  
  BLEModule.start()
  .then(res => {
       console.log(res)
  }).catch(error => {
       console.log(error)
  })
}

let val1 = '0';
function updateval(value)
{
  val1=value;
  // console.log(val1)
}

function onChange()
{
    console.log(val1 + " written into char val")
    BLEModule.writeval(service1,char1, val1, value=>{console.log(value)});
    // console.log(9999999999)
}

function reader()
{
  BLEModule.readval(
    service1,
    char1,
    value=>{console.log("char value is "+ value)}
    );
}


const App = () => {

  
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.heartRateTitleWrapper}>
        <Text style={styles.heartRateTitleText}>
          Press Start to turn on peripheral
        </Text>                 
      </View>

      <View style={styles.heartRateTitleWrapper}>
      <TextInput
        style={styles.heartRateTitleText}
        placeholder="Type value here!"
        onChangeText={newText => updateval(newText)}
        
      />

      <TouchableOpacity onPress={onChange} style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>update</Text>
      </TouchableOpacity>
    
    </View>

      <TouchableOpacity onPress={reader} style={styles.ctaButton}>
      <Text style={styles.ctaButtonText}>Read</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={startfunc} style={styles.ctaButton}>
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
