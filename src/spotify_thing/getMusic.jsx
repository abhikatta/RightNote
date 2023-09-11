// From spotify:
// Understanding how the spotify embed works:
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token =
  "BQDFImoabTZ1OWCAtpyLksnL1BKQrH_2e-3PXtjZ1B0oaYWWRMo8J4NUvqQn3Bg3iKN4W4AJqR_NIs0OBgLcC9RvFBbbcWFDKBU1BKC6cIt23hcuSbXpeinOwwKnvpzR692GdCgxa13DZmyTaHRNsmDys5pbzV--9hlK5eu-eezX-phpOb-eruC9rlTpirFAE9-6s7eX5B_TjZiAZfjGbnSyMNFH_M4oVupRZkPw6weTU7H5o-Oa_WBJBw0-UcewaDKigkGCFWIOmLROLuldL-VQ";
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

async function getTopTracks() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (
    await fetchWebApi("v1/me/top/tracks?time_range=short_term&limit=5", "GET")
  ).items;
}

const topTracks = await getTopTracks();
console.log(
  topTracks?.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

const topTracksIds = [
  "0AAMnNeIc6CdnfNU85GwCH",
  "0iEdt7cayQ2XbicDeWFztj",
  "1cWiqwPAOLRrXQ8SqfqsZU",
  "7neh3zxtgTMy8sokYe5rt2",
  "1Y3LN4zO1Edc2EluIoSPJN",
];

async function getRecommendations() {
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (
    await fetchWebApi(
      `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(",")}`,
      "GET"
    )
  ).tracks;
}

const recommendedTracks = await getRecommendations();
console.log(
  recommendedTracks.map(
    ({ name, artists }) =>
      `${name} by ${artists.map((artist) => artist.name).join(", ")}`
  )
);

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

const tracksUri = [
  "spotify:track:0AAMnNeIc6CdnfNU85GwCH",
  "spotify:track:7ggnnK9KC8ZKhahPdnY0c3",
  "spotify:track:0iEdt7cayQ2XbicDeWFztj",
  "spotify:track:7bd6i95HUlQkNkTQClwcW5",
  "spotify:track:1cWiqwPAOLRrXQ8SqfqsZU",
  "spotify:track:7GD5TXfErRxFDJwWRjz1bg",
  "spotify:track:7neh3zxtgTMy8sokYe5rt2",
  "spotify:track:0FHbWBQhUMjoemVffbgyC6",
  "spotify:track:1Y3LN4zO1Edc2EluIoSPJN",
  "spotify:track:2f5WkystuejnBzgV18GTGa",
];

async function createPlaylist(tracksUri) {
  const { id: user_id } = await fetchWebApi("v1/me", "GET");

  const playlist = await fetchWebApi(`v1/users/${user_id}/playlists`, "POST", {
    name: "My recommendation playlist",
    description: "Playlist created by the tutorial on developer.spotify.com",
    public: false,
  });

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(",")}`,
    "POST"
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);

const playlistId = "3XtSeTxv4A43Z9b8vbxF4i";

<iframe
  title="Spotify Embed: Recommendation Playlist "
  src={`https://open.spotify.com/embed/playlist/3XtSeTxv4A43Z9b8vbxF4i?utm_source=generator&theme=0`}
  width="100%"
  height="100%"
  style={{ minHeight: "360px" }}
  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
  loading="lazy"
/>;
