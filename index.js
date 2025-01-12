const fs = require('fs');
require('dotenv').config();
var parseString = require('xml2js').parseString;

const args = process.argv.slice(2);

var playlists = [];
var playlist_list = {};
var action = "";
var songs = [];

if((args.length == 0) && args[0] !== "analyze" && args[0] !== "export") {
  console.log("Do you want to analyze or export?");
  process.exit(1);
}

main();

async function main(){
  let prelim = await analyze();
  if(args[0] === "analyze"){
    let lists = await JSON.stringify(playlist_list);
    fs.writeFileSync("./playlists.json", lists);
    console.log("File analyzed, lists in playlists.json");
    process.exit(1)
  }
  // all the stuff to make the playlists and copy the files
}

async function analyze(){
  let pfile = process.env.LIBRARY_FILE_PATH; // get path from .env
  let library = fs.readFileSync(pfile); // read the library file from disk
  let oo = await parseString(library, async function (err, result) {
    if(err){
      console.log("parsing failed");
      console.dir(err);
      process.exit(1);
    };
    let presongs = result.plist.dict[0].dict[0].dict;
    songs = await extractSongs(presongs);
    let lists = result.plist.dict[0].array[0].dict; 
    playlist_list = await extractListNames(lists); 
    playlists = await extractListvals(lists); console.dir(playlists);
  })
  return true;
}

async function writeListofLists(pdata){

}

async function copyFiles(pdata){

}

async function writeLists(pdata){

}

function extractSongs(slist){
  let songs = [];
  for(let i = 0; i < slist.length; i++){
    let song = slist[i];
    let songid = song.integer[0];
    let pathplace = song.string.length - 1;
    let pathtype = song.string.length - 2;
    let songtype = song.string[pathtype];
    let songpath = song.string[pathplace];
        if(songtype === "File"){

      songs[songid] = songpath;
    }
  }
  return songs
}

async function extractListvals(slist){
  let listvals = [];
  for(let i = 0; i < slist.length; i++){
    let list = slist[i];
    let listid = list.integer[0];
    let songids = list["array"];
    listvals.push({
      "ID": listid,
      "Songs": songids.dict
    }) 
  }
  return listvals;  
}

async function extractListNames(slist){
  let lists = [];
  for(let i = 0; i < slist.length; i++){
    let list = slist[i];
    let listid = list.integer[0];
    let listname = list.string[0];
    lists.push({
      "ID": listid,
      "Name": listname
    })
  }
  return lists;
}