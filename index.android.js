/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
   Navigator,
   ScrollView,
   TextInput,
   ListView,
  Text,
  Image,
    PixelRatio,
  View
} from 'react-native';

// 搜索页面
import SearchPage from './SearchPage';

class propertysearch extends Component {
  render() {
     let defaultName='SearchPage';
      let defaultComponent=SearchPage;
    return (
<Navigator
            initialRoute={{ name: defaultName,
             component: defaultComponent,
             index: 0 
            }}
            //配置场景
            configureScene=
                {
            (route) => {

//这个是页面之间跳转时候的动画，具体有哪些？可以看这个目录下，有源代码的: node_modules/react-//native/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js

            return Navigator.SceneConfigs.VerticalDownSwipeJump;
          }
          }
            renderScene={
            (route, navigator) =>
             {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} 
            
              // Function to call when a new scene should be displayed           
            />
          }
          } />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('propertysearch', () => propertysearch);
