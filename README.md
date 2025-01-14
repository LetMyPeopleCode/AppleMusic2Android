# AppleMusic2Android

Sync local music files and playlists from Apple Music to your Android Device

### **Who It's For:**
People with large collections of MP3s who keep them locally on their Mac, organize them into playlists using Apple Music, and want to sync their Android phone and its music player by copying over the playlists and the song files in them to their Android phone.

### **How it works:**
When you tell it to do an export of a playlist, it *copies* every song you're going to transfer to a specified folder and then creates an .m3u format playlist file. 

Copy that folder (keeping all the songs and playlists in it) into your phone's music folder using a program like [OpenMTP](https://openmtp.ganeshrvel.com/)), and your music player on Android should pick it up. 

So far that's only been tested with Pulsar and VLC on a OnePlus 13, but it worked great in both instances at having the songs and playlists get automatically detected and imported.

### Installation
REQUIRED: [Node.js](https://nodejs.org/en)), this has only been tested with 18.71, but it uses very simple API calls, has 2 NPM dependencies (that install a total of 4 packages), and should have decent backward/forward compatibility.

- Clone this repository from Github
- Go into the directory it was copied into and run the command `npm install` in the console.

- Open Apple Music. Go to `File -> Library -> Export Library`. If you're feeling like making it easy on yourself, save the resulting file into the same folder as this repository and name it `Library.xml`
- Make an empty folder `AM2A` in this directory as well. If you want to change the folder name, do so in the .env file as well.

### Usage

This is a simple command line version. The commands are as follows:

- `index.js analyze` - exports a list of playlists to `playlists.json`
  - Analyzes the XML file produced when you export your library from Apple Music
  - Location of the library file is specified in the `.env` file. If you don't want to put `Library.xml` in the code directory, update its location/name in `.env`.
- `index.js export` - imports the `playlists.json` file and then copies the unique music files and writes M3U playlists to the folder specified in the .env file (default: AM2A).

Copy the AM2A folder (or your changed destination folder), containing the copied files and `.m3u` playlist files to the Music folder of your Android phone. Many music players should pick it all up with no problem.


## V0.1.0

"Developers Only" version: A proof of concept that will be difficult for non-developers to run as it requires node.js installed and editing a JSON file.

### Possible Roadmap Items
- Incorporate an MTP library and have the code do the copying directly to the phone and skip the duplicating files to a folder and then copying it over.
- Add a GUI frontend, possibly packing it up in an Electron App to make it a lot easier for non devs to use.
