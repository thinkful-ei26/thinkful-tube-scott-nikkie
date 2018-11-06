/*eslint-env jquery*/
/* global store, API*/
'use strict';
/* eslint-disable-next-line no-unused-vars */
const videoList = (function() {

  const generateVideoItemHtml = function(video) {
    const base_video_url = 'https://www.youtube.com/watch?v=';
    const base_channel = 'https://www.youtube.com/channel/';
    return `
    <li data-video-id=${video.id}>
      <h3>${video.title}</h3>
      <a href ="${base_video_url}${video.id}" target = "_blank" ><img src="${video.thumbnail}" /> </a>
      <br>
      <a href = "${base_channel}${video.channel}" target = "_blank">More from this channel</a>
    </li>

    `;
  };

  const generateButtonTokens = function(nextPageToken,prevPageToken){
    //put in a previous element only if it exists (if you go next then prev, it shouldnt have prev again bc its the first page - but it does FIX)
    if (prevPageToken){
      return `
      <button class = "prev" data-next-id = "${prevPageToken}"> Previous</button>
      <button class = "next" data-next-id = "${nextPageToken}"> Next</button>
    `;
    }
    return `
      <button class = "next" data-next-id = "${nextPageToken}"> Next</button>
    `;
  };

  const render = function() {
    $('.results').html(store.videos.map(video=>generateVideoItemHtml(video)).join(''));
    $('.buttons').html(generateButtonTokens(store.nextToken, store.prevToken));
  };

  const handleFormSubmit = function() {
    $('form').submit(event =>{
      event.preventDefault();
      const searchTerm = $('#search-term').val();
      //add searchTerm in the store 
      // $('#search-term').val('');
      API.fetchVideos(searchTerm, API.decorateResponse); //is this step e?
    });
  };

  const handleNextButtonSubmit = function(){
    $('.buttons').on('click', '.next', event =>{
      // event.preventDefault();
      //we want to somehow use the data-nexttoken to render the next page. But how do we do that using the token?
      API.fetchNextVideos($('#search-term').val(), API.decorateResponse); //we need the searchTerm 
    });
  };

  const handlePrevButtonSubmit = function(){
    $('.buttons').on('click', '.prev', event =>{
      // event.preventDefault();
      //we want to somehow use the data-nexttoken to render the next page. But how do we do that using the token?
      API.fetchPrevVideos($('#search-term').val(), API.decorateResponse); //we need the searchTerm 
    });
  };

  function bindEventListeners() {
    handleFormSubmit();
    handleNextButtonSubmit();
    handlePrevButtonSubmit();
  }

  return {
    bindEventListeners,
    render
  };
})();
