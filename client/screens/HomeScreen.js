import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import Meteor, { createContainer } from 'react-native-meteor';

import SearchBar from '../components/SearchBar/SearchBar'
import SearchResults from '../components/SearchResults/SearchResults'

const SERVER_URL = 'ws://192.168.128.12:3000/websocket';

import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../reducers';

const store = createStore(rootReducer);
store.subscribe(() => console.log('store', store.getState()));

class HomeScreen extends React.Component {
  componentWillMount(){
    Meteor.connect(SERVER_URL);
  }
  static navigationOptions = {
    header: null,
  };

  handleAddItem(){
    const name = Math.floor(Math.random()*10); //just some random number\
    Meteor.call('Items.addOne', { name }, (err, res) => {
        console.log('Items.addOne', err, res);
    });
  }

  render() {
    return (
        <Provider store={store}>
            <View style={styles.container}>
                <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

                    <View style={styles.getStartedContainer}>

                        <View style={styles.container}>
                            <Text style={styles.instructions}>
                                Item Count: {this.props.count}
                            </Text>
                            <TouchableOpacity style={styles.button} onPress={this.handleAddItem}>
                                <Text> Add Item</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.container}>
                            <SearchBar/>
                            <SearchResults/>
                        </View>
                    </View>


                </ScrollView>
            </View>
        </Provider>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };

}

export default createContainer(() => {
    Meteor.subscribe('items');
    return {
        count: Meteor.collection('items').find().length,
    };
}, HomeScreen);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
  },
  instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
  },
  button: {
      padding: 10,
      backgroundColor: '#c5c5c5',
  },

});

