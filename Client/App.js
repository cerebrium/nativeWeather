import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import myBackground from './chris-havard-background.jpg'
import rainy from './alex-dukhanov-rain.jpg'
import cloudy from './joshua-reddekopp-cloud.jpg'
import sunny from './chuttersnap-sun.jpg/'

const App = () => {
  // state
  const [currWeather, setCurrWeather] = useState(null)
  const [ currDate, setCurrDate ] = useState(new Date())
  const [ currTime, setCurrTime] = useState(new Date())

  // initial grab of data two three
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition( (initialposition) => {
        fetch('http://10.1.7.200:3001/weather/current', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latitude: `${initialposition.coords.latitude}`,
            longitude: `${initialposition.coords.longitude}`,
          }),
        })
        .then((response) => response.json())
        .then((responseJson) => {
          setCurrWeather(responseJson)
    })
      })
    } catch (error) {
      console.error('in the error block two: ', error)
    }
  }, [])

  // grab date every second
  useEffect(() => {
    setInterval(() => {
      let currentDate = new Date()
      let currentTime = currentDate.toLocaleTimeString()
      setCurrTime(currentTime)
  }, 1000)
})

  var weather;
  // today
  var today = currDate.toDateString()

  // tomorrow
  var tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // day after tomorrow (+2)
  var tomorrowTwo = new Date(tomorrow)
  tomorrowTwo.setDate(tomorrowTwo.getDate() + 1)

  // day after tomorrow (+3)
  var tomorrowThree = new Date(tomorrowTwo)
  tomorrowThree.setDate(tomorrowThree.getDate() + 1)

  // day after tomorrow (+4)
  var tomorrowFour = new Date(tomorrowThree)
  tomorrowFour.setDate(tomorrowFour.getDate() + 1)

  var todayIcon
  var tomorrowIcon
  var tomorrowTwoIcon
  var tomorrowThreeIcon
  var tomorrowFourIcon
  // creating backgounds
  if (currWeather) {
    // today
    if (currWeather.daily.data[0].icon.includes('clear-day')) {
      todayIcon = sunny
    } else if (currWeather.daily.data[0].icon.includes('rain')){
      todayIcon = rainy
    } else {
      todayIcon = cloudy
    }

    // tomorrow
    if (currWeather.daily.data[1].icon.includes('clear-day')) {
      tomorrowIcon = sunny
    } else if (currWeather.daily.data[1].icon.includes('rain')){
      tomorrowIcon= rainy
    } else {
      tomorrowIcon = cloudy
    }

    // tomorrow Two
    if (currWeather.daily.data[2].icon.includes('clear-day')) {
      tomorrowTwoIcon = sunny
    } else if (currWeather.daily.data[2].icon.includes('rain')){
      tomorrowTwoIcon = rainy
    } else {
      tomorrowTwoIcon = cloudy
    }

    // tomorrow three
    if (currWeather.daily.data[3].icon.includes('clear-day')) {
      tomorrowThreeIcon = sunny
    } else if (currWeather.daily.data[3].icon.includes('rain')){
      tomorrowThreeIcon = rainy
    } else {
      tomorrowThreeIcon = cloudy
    }

    // tomorrow four
    if (currWeather.daily.data[4].icon.includes('clear-day')) {
      tomorrowFourIcon = sunny
    } else if (currWeather.daily.data[4].icon.includes('rain')){
      tomorrowFourIcon = rainy
    } else {
      tomorrowFourIcon = cloudy
    }
  }


  if (currWeather) {
      weather = (
        <>
        <Text style={styles.timeStyle}>{currTime}</Text>
          <View style={styles.miniBoxes}>
            <ImageBackground 
            source={todayIcon}
            style={{
              width: '100%', 
              height: '100%',
              opacity: .8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <View style={styles.miniMiniBoxes}>
                <Text style={styles.textStyle}>{today}{'\n'}{currWeather.daily.data[0].summary}</Text> 
              </View>
            </ImageBackground>  
          </View>
          <View style={styles.miniBoxes}>

            <ImageBackground 
            source={tomorrowIcon}
            style={{
              width: '100%', 
              height: '100%',
              opacity: .8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <View style={styles.miniMiniBoxes}>
                <Text style={styles.textStyle}>{tomorrow.toDateString()}{'\n'}{currWeather.daily.data[1].summary}</Text> 
              </View>
            </ImageBackground>  
          </View>
          <View style={styles.miniBoxes}>

            <ImageBackground 
            source={tomorrowTwoIcon}
            style={{
              width: '100%', 
              height: '100%',
              opacity: .8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <View style={styles.miniMiniBoxes}>
                <Text style={styles.textStyle}>{tomorrowTwo.toDateString()}{'\n'}{currWeather.daily.data[2].summary}</Text> 
              </View>
            </ImageBackground>  
          </View>

          <View style={styles.miniBoxes}>
            <ImageBackground 
            source={tomorrowThreeIcon}
            style={{
              width: '100%', 
              height: '100%',
              opacity: .8,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15
            }}
            >
              <View style={styles.miniMiniBoxes}>
                <Text style={styles.textStyle}>{tomorrowThree.toDateString()}{'\n'}{currWeather.daily.data[3].summary}</Text> 
              </View>
            </ImageBackground>  
          </View>

          <View style={styles.miniBoxes}>
            <ImageBackground 
            source={tomorrowFourIcon}
            style={{
              width: '100%', 
              height: '100%',
              opacity: .8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            >
              <View style={styles.miniMiniBoxes}>
                <Text style={styles.textStyle}>{tomorrowFour.toDateString()}{'\n'}{currWeather.daily.data[4].summary}</Text> 
              </View>
            </ImageBackground>  
          </View>
        </>
      )
  } else {
    weather = <Text>grabbing data</Text>
  }

  // rendering this 
  return (
    <ImageBackground 
    source={myBackground}
    style={{width: '100%', height: '100%'}}
    >
      <View style={styles.container}>
        <View style={styles.whiteBox}>
          {weather}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteBox: {
    height: '85%',
    width: '70%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'black',
    textAlign: 'center'
  },
  miniBoxes: {
    height: '15%',
    width: '80%',
    borderRadius: 15,
    marginTop: 7,
    marginBottom: 9,
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeStyle: {
    fontSize: 25,
    marginTop: 5,
    color: 'white'
  },
  miniMiniBoxes: {
    height: '50%',
    width: '90%',
    borderRadius: 15,
    backgroundColor: 'white',
    opacity: .8,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App
