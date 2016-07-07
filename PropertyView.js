/**
 * 房产的详细信息
 * Created by wangchenlong on 16/4/11.
 */
'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
    PixelRatio,
  View,
   TextInput,
   TouchableHighlight,
   Image,
   ActivityIndicator,
    BackAndroid,
    ListView,
    ToastAndroid,
} from 'react-native';

BackAndroid.addEventListener('hardwareBackPress', function() {
  if(_navigator == null){
    return false;
  }
  if(_navigator.getCurrentRoutes().length === 1){
    return false;
  }
  _navigator.pop();
  return true;
});

var _navigator ;
var PropertyView = React.createClass({
  getInitialState: function()
  {
     _navigator = this.props.mynav2;
    return {

    };
  },
   

  render: function() {
    var property = this.props.property; // 由SearchResult传递的搜索结果
    var stats = property.bedroom_number + ' bed ' + property.property_type;
    if (property.bathroom_number) {
      stats += ', ' + property.bathroom_number + ' ' +
        (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom');
    }

    var price = property.price_formatted.split(' ')[0];

    return (
      <View>

      <View style={styles.container}>

        <Image style={styles.image}
               source={{uri: property.img_url}}/>
        <View style={styles.heading}>
          <Text style={styles.price}>${price}</Text>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{stats}</Text>
        <Text style={styles.description}>{property.summary}</Text>
      </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 5,
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
});

module.exports = PropertyView;