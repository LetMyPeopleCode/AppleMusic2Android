/**
 *  ** APPLE MUSIC PLAYLIST EXPORTER **
 *  VERSION: 0.1.0 - MLP
 *  AUTHOR: Greg Bulmash (bulmash.com))
 *  © 2025 Greg Bulmash - All Rights Reserved
 *  License: Apache 2.0
 *  
 * Reads the XML file exported by the Apple Music app when you ask it to export the Library. 
 * Preps a folder of music files and M3U playlists you can copy to an Android device.
 * 
 * See readme for commands and usage.
 * 
 */


const fs = require('fs');
const path = require('path');
require('dotenv').config();
var parseString = require('xml2js').parseString;
const args = process.argv.slice(2);

var playlists = [];
var playlist_list = {};
var songslist = [];

if((args.length == 0) && args[0] !== "analyze" && args[0] !== "export") {
  console.log("Do you want to analyze or export?");
  process.exit(1);
}

main();

/** 
 * 
 * 
 *                            MAIN BODY OF THE PROGRAM
 * 
 *  
 **/

async function main(){
  // the analyze function is needed by both command line args
  let prelim = await analyze();

  // analyze argument - generates a JSON list of playlists

  if(args[0] === "analyze"){
    let lists = await JSON.stringify(playlist_list, null, 4);
    fs.writeFileSync("./playlists.json", lists);
    console.log("File analyzed, lists in playlists.json");
    process.exit(1)
  }


  // create argument - writes the folder of songs and M3U playlists
  let lists = [];
  try {
    lists = await JSON.parse(fs.readFileSync("./playlists.json"));
  } catch (e){
    console.log("The JSON file list failed to parse");
    process.exit(1);
  }
  for(let i = 0; i < lists.length; i++){
    let list = lists[i];
    console.log("Creating playlist: " + list.Name);
    let foo = await makeTransfer(list);
  }
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
    songslist = await extractSongs(presongs);
    let lists = result.plist.dict[0].array[0].dict; 
    playlist_list = await extractListNames(lists); 
    playlists = await extractListvals(lists);
  })
  return true;
}

function makeTransfer(list){
  let listpath = process.env.OUTPUT_PATH;
  let m3u = "";
  let playfile = list.Name + ".m3u";
  let songs = playlists[list.ID][0].dict;

  for(let u = 0; u<songs.length; u++){  
    let song = songs[u].integer[0];
    let songpath = songslist[song];
    // make it work on Mac
    songpath = songpath.replace("file://", "");
    songpath = decodeURI(songpath);
    let filename = path.basename(songpath);
    // copy file
    let topath = listpath + "/" + filename;
    if(!fs.existsSync(songpath)){ // some paths don't always work
      continue;
    }
    if(!fs.existsSync(topath)){ // avoid errors trying to copy the same file twice
      fs.copyFileSync(songpath, topath);
    }
    m3u += filename + "\n";  
  }
  fs.writeFileSync(listpath + "/" + playfile, m3u);
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
    listvals[listid] = songids
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