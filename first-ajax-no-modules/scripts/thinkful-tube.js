/*eslint-env jquery*/
/* global store*/
'use strict';
/* eslint-disable-next-line no-unused-vars */
const thinkfulTube = (function() {

  const API_KEY = 'AIzaSyCRbaNBF08000E_9OCK8S8YOa8HPbBNGRE';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      q: searchTerm,
      part: 'snippet',
      key: API_KEY,
      maxResults: 10
    };
    $.getJSON(BASE_URL, query, callback);
  };

  const decorateResponse = function(response) {
    const decArr = response.items.map(item => {return{
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    };
    });
    store.addVideosToStore(decArr);
    render();
  };

  const generateVideoItemHtml = function(video) {
    return `
    <li data-video-id=${video.id}>
      <img src="${video.thumbnail}" />
      <h3>${video.title}</h3>
    </li>
    `;
  };

  const render = function() {
    //console.log(store.videos);
    $('.results').html(store.videos.map(video=>generateVideoItemHtml(video)).join(''));
  };


  const handleFormSubmit = function() {
    $('form').submit(event =>{
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      $('#search-term').val('');
      fetchVideos(searchTerm, decorateResponse); //is this step e?
    });
  };

  function bindEventListeners() {
    handleFormSubmit();

  }

  return {
    bindEventListeners,
  };
})();