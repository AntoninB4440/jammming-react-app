import React from 'react';

import './SearchResults.css'

import TrackList from '../TrackList/TrackList'

class SearchResults extends React.Component{

    render(){
        return (
            <div className="SearchResult">
                
                <div className="Results">
                <h2>Results</h2>
                </div>
                <div>
                <TrackList tracks={this.props.searchResults} 
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        isRemoval={false}/>
                        </div>
            </div>
        )
    }
}

export default SearchResults;