import React, {Component} from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {API_KEY} from "../../constants/api";

import {connect} from 'react-redux';
import {searchResults} from "../../actions";

const styles = require('./SearchBarStyles');
const cx = '003927507691498275033:wo4exwvpzpc';
const apiURL = 'https://www.googleapis.com/customsearch/v1';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTerm: ''
        }
    }

    searchOnGoogle = (searchParam) => {
        let URL = apiURL + '?key=' + API_KEY + '&cx=' + cx + '&q=' + this.state.searchTerm;
        fetch(URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            response.json().then((data) => {
                this.props.searchResults(data.items);
            })
        }).catch((error) => console.log(error));
    }
    render() {
        return(
            <View style={styles.searchBarContainer}>
                <TextInput
                    placeholder = 'Enter your search terms'
                    style = {styles.textInputSearch}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(searchTerm) => this.setState({ searchTerm })}
                    value={this.state.searchTerm}
                />
                <TouchableOpacity
                    style={styles.textSearchButton}
                    onPress={() => this.searchOnGoogle()}
                >
                    <FontAwesome name="search" size={16} color="#000" />
                </TouchableOpacity>
            </View>
        )
    }
}

export default connect(null, {searchResults})(SearchBar);