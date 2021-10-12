const express = require("express");
const app = express();

app.use(express.json());

const albumsData = [
    {
      albumId: "10",
      artistName: "Beyoncé",
      collectionName: "Lemonade",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg",
      releaseDate: "2016-04-25T07:00:00Z",
      primaryGenreName: "Pop",
      url:
        "https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
      albumId: "11",
      artistName: "Beyoncé",
      collectionName: "Dangerously In Love",
      artworkUrl100:
        "http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg",
      releaseDate: "2003-06-24T07:00:00Z",
      primaryGenreName: "Pop",
      url:
        "https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0",
    },
    {
      albumId: "12",
      artistName: "Beyoncé",
      collectionName: "Homecoming: The Live",
      artworkUrl100:
        "https://cdn.shopify.com/s/files/1/0007/4180/2044/products/homecomingalbum_800x.png?v=1579910016",
      releaseDate: "2019-04-17T07:00:00Z",
      primaryGenreName: "Pop",
      url:
        "https://www.youtube.com/watch?v=nxFltL1YjLo",
    },
  ];

//GET /albums
app.get("/albums", function (request, response) {
    response.send(albumsData);
});

app.get("/albums/:albumId", function (request, response){
    const album = albumsData.find(a => a.albumId === request.params.albumId);
    response.send(album);
});

app.post("/albums/", function (request, response){
    const albumIdInt = parseInt(albumsData[albumsData.length -1].albumId) + 1;
    const albumId = albumIdInt.toString();
    const album = {
        albumId: albumId,
        artistName: request.body.artistName,
        collectionName: request.body.collectionName,
        artworkUrl100: request.body.artworkUrl100, 
        releaseDate: request.body.releaseDate,
        primaryGenreName: request.body.primaryGenreName,
        url: request.body.url,
    };
    albumsData.push(album);
    //res.send(album);
    response.send({success: true});
});

app.put("/albums/:albumId", function (request, response){
  const albumId = request.params.albumId;
  const album = albumsData.find(a => a.albumId === albumId);
  album.artisName = request.body.artisName;
  album.collectionName = request.body.collectionName;
  album.artworkUrl100 = request.body.artworkUrl100;
  album.releaseDate = request.body.releaseDate;
  album.primaryGenreName = request.body.primaryGenreName;
  album.url = request.body.url;
  response.send({success: true});
});


app.delete("/albums/:albumId", function (request, response) {
  const albumId = request.params.albumId;
  const index = albumsData.findIndex(a => a.albumId === albumId)
  albumsData.splice(index, 1);
  //console.log("DELETE /albums route");
  return response.send({success: true});
});

app.listen(3000, () => console.log("Listening on port 3000"));