import React from 'react';

import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../Util/Spotify';

import './App.css'

class App extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      searchResults:[],
      playlistName : 'My playList',
      playlistTracks:[]
    };

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  //force an empty search automatically when the page loads
  componentDidMount() {
    window.addEventListener('load', () => {Spotify.getAccessToken()});
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)){
        return;
      }
    tracks.push(track);
    this.setState({playlistTracks : tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    let newTracks= tracks.filter( removedTrack => removedTrack.id !== track.id);
    
    this.setState({playlistTracks : newTracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackURIs).then(() => {
        this.setState({
          playlistName: 'New Playlist',
          playlistTracks: []
        });
      });
  }

  

  render(){
    return(
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing by Antonin Barcelo</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults} 
                          onAdd={this.addTrack}/>
          <Playlist playlistName={this.state.playlistName} 
                    playlistTracks={this.state.playlistTracks}
                    onRemove={this.removeTrack}
                    onNameChange={this.updatePlaylistName}
                    onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;