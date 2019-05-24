import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

const styles = require('./SearchResultsStyles');

class SearchResults extends Component {
    render() {
        return(
            <View style={styles.searchResultsContainer}>
                {this.props.results.map((result, key) => (<Text key={key}>{result.title}</Text>))}
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.results
    };
}

export default connect(mapStateToProps, null)(SearchResults);