const EmbeddedFrame = ({ spotifyEmbed }) => {
  // Authorization token that must have been created previously, either on app or web.
  // See : https://developer.spotify.com/documentation/web-api/concepts/authorization
  const playlistId = "4ojtKirkS3qdKvFETouEEH";
  return (
    <div className={`${spotifyEmbed ? "scale-100 " : " hidden"}`}>
      <iframe
        // style={{ minHeight: "200px", minWidth: "450px" }}
        title="My recommended spotify playlist"
        className={`
        sm:min-w-[35rem] md:min-w-[45rem] lg:min-w-[55rem] min-w-[22rem]
        sm:min-h-[15rem] md:min-h-[22rem] lg:min-h-[30rem] min-h-[12rem]
        rounded-xl sm:mt-6 md:mt-4 lg:mt-6 mt-8

      `}
        src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    </div>
  );
};
export default EmbeddedFrame;

// https://open.spotify.com/playlist/37i9dQZF1EpudJHVqvpCgt?si=a0b77655f49e4b2b
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQA9zsA6dt9p7HuK016HBGVeCkT2CVc80KbW24PnhLDF4vJnBKMxKvwwUMdBFu_254btfobakTj_Epd5S63lsaJaBqRtBk-rKdhYGaOnJmoGFqPSfAnxk0zUfUgOs4AemW0NllR2TIEt61vlSN72OJ5eCnDD00F_CD1Nu5yEtZtjETCzdCqMXiqWWqauBZ5Q5lXKueaBfCmSuyENu8bRDDGchOXskWT84kzyCjjpZbvYIQBRAjuDp9my_qQdm6gmzFbleUFA_f-PIH5T9HzFTTjX';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// const tracksUri = [
//   'spotify:track:0AAMnNeIc6CdnfNU85GwCH','spotify:track:2E4INiVkDRBXXkFL4kB1Vk','spotify:track:0iEdt7cayQ2XbicDeWFztj','spotify:track:6IPwKM3fUUzlElbvKw2sKl','spotify:track:1cWiqwPAOLRrXQ8SqfqsZU','spotify:track:4jf5URUdjQl9pdj7lSVqBa','spotify:track:7neh3zxtgTMy8sokYe5rt2','spotify:track:4dHpmIzCAIljTQVNKMjGtM','spotify:track:1Y3LN4zO1Edc2EluIoSPJN','spotify:track:50x1Ic8CaXkYNvjmxe3WXy'
// ];

// async function createPlaylist(tracksUri){
//   const { id: user_id } = await fetchWebApi('v1/me', 'GET')

//   const playlist = await fetchWebApi(
//     `v1/users/${user_id}/playlists`, 'POST', {
//       "name": "My recommendation playlist",
//       "description": "Playlist created by the tutorial on developer.spotify.com",
//       "public": false
//   })

//   await fetchWebApi(
//     `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
//     'POST'
//   );

//   return playlist;
// }

// const createdPlaylist = await createPlaylist(tracksUri);
// console.log(createdPlaylist.name, createdPlaylist.id);
// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQA9zsA6dt9p7HuK016HBGVeCkT2CVc80KbW24PnhLDF4vJnBKMxKvwwUMdBFu_254btfobakTj_Epd5S63lsaJaBqRtBk-rKdhYGaOnJmoGFqPSfAnxk0zUfUgOs4AemW0NllR2TIEt61vlSN72OJ5eCnDD00F_CD1Nu5yEtZtjETCzdCqMXiqWWqauBZ5Q5lXKueaBfCmSuyENu8bRDDGchOXskWT84kzyCjjpZbvYIQBRAjuDp9my_qQdm6gmzFbleUFA_f-PIH5T9HzFTTjX';
// async function fetchWebApi(endpoint, method, body) {
//   const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//     method,
//     body:JSON.stringify(body)
//   });
//   return await res.json();
// }

// const topTracksIds = [
//   '0AAMnNeIc6CdnfNU85GwCH','0iEdt7cayQ2XbicDeWFztj','1cWiqwPAOLRrXQ8SqfqsZU','7neh3zxtgTMy8sokYe5rt2','1Y3LN4zO1Edc2EluIoSPJN'
// ];

// async function getRecommendations(){
//   // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
//   return (await fetchWebApi(
//     `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
//   )).tracks;
// }

// const recommendedTracks = await getRecommendations();
// console.log(
//   recommendedTracks.map(
//     ({name, artists}) =>
//       `${name} by ${artists.map(artist => artist.name).join(', ')}`
//   )
// );
