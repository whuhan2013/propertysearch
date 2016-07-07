/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
} from 'react-native';

import SearchResults from './SearchResults';

/**
 * 访问网络服务的Api, 拼接参数
 * 输出: http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&action=search_listings&page=1&place_name=London
 *
 * @param key 最后一个参数的键, 用于表示地理位置
 * @param value 最后一个参数的值, 具体位置
 * @param pageNumber page的页面数
 * @returns {string} 网络请求的字符串
 */
function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
    country: 'uk',
    pretty: '1',
    encoding: 'json',
    listing_type: 'buy',
    action: 'search_listings',
    page: pageNumber
  };

  data[key] = value;

  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
  return 'http://api.nestoria.co.uk/api?' + querystring;
}

class SearchPage extends Component {

  /**
   * 构造器
   * @param props 状态
   */
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'London', // 搜索词
      isLoading: false, // 加载
      message: '' // 消息
    };
  }

  onSearchTextChanged(event) {
    this.setState({searchString: event.nativeEvent.text});
    console.log(this.state.searchString);
  }


 /**
   * 执行网络请求, 下划线表示私有
   * @param query url
   * @private
   */
  _executeQuery(query) {
    console.log(query);
    this.setState({isLoading: true});

    // 网络请求
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error => this.setState({
        isLoading: false,
        message: 'Something bad happened ' + error
      }));
  }

  /**
   * 处理网络请求的回调
   * @param response 请求的返回值
   * @private
   */
  _handleResponse(response) {
    const { navigator } = this.props;
    this.setState({isLoading: false, message: ''});
    if (response.application_response_code.substr(0, 1) === '1') {
      console.log('123');
      console.log('Properties found: ' + response.listings);

      // 使用listings调用结果页面SearchResults
      navigator.push({
        title: '搜索结果',
        component: SearchResults,
        index:1,
        params:{
                    listings:response.listings,
                    mynav:navigator
                    
                }
       
      });
        console.log('456');
    } else {
      this.setState({message: 'Location not recognized; please try again.'});
    }
  }

  /**
   * 查询的点击事件
   */
  onSearchPressed() {
    var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
    this._executeQuery(query);
  }

  render() {
    var spinner = this.state.isLoading ?
      (<ActivityIndicator size='large'/>) : (<View/>);
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          搜索英国的房产
        </Text>
        <Text style={styles.description}>
          地址(London)/邮编(W1S 3PR)均可
        </Text>
        <View style={styles.flowRight}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchString}
            onChange={this.onSearchTextChanged.bind(this)} // bind确保使用组件的实例
            placeholder='Search via name or postcode'/>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
          </TouchableHighlight>
        </View>
        <Image source={require('./resources/house.png')}
               style={styles.image}/>
        {spinner}
        <Text style={styles.description}>
          {this.state.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
  container: {
    padding: 30,
    marginTop: 65,
    alignItems: 'center' // 子元素居中
  },
  flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    flex: 1, // 比例
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4, // 比例
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  image: {
    marginTop: 36,
    width: 217,
    height: 138
  }
});

module.exports=SearchPage;
