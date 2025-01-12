# AppleMusic2Android

Syncs local music files and playlists from Apple Music to your Android

### **Who It's For:**
People with large collections of MP3s who keep them locally on their Mac, organized them into playlists, who want to sync their Android phone and its music player by copying over the playlists and the songs in them.

### **How it works:**
When you tell it to do an export, it *copies* every song you're going to transfer to your specified folder and then creates an .m3u format playlist file.

### **Then what?**
Use your favorite method to copy that export folder into your phone's Music folder.

## V0.0.1

"Developers Only" version: You need to know how to edit a JSON file.

### Installation
REQUIRED: Node.js, this has oinly been tested with 22 and above, but it uses very simple API calls and should have decent backward compatibility.

- Clone this repository from Github
- Go into the directory it imported was copied into and run the command `npm install` in the console.

- Open Apple Music. Go to `File -> Library -> Export Library`. If you're feeling like making it easy on yourself, save the resulting file into the same folder as this repository and name it `Library.xml`
- Make an empty folder `AM2A` in this directory as well. If you want to change the folder name, do so in the .env file as well.

### Usage

This is a simple command line version. The commands are as follows:

- `index.js analyze` - Analyzes your library and exports a list of playlists to `playlists.json`
  - Analyzes the XML file produced when you export your library from Apple Music
  - Location of the file is specified in .env
- `index.js export` - imports the `playlists.json` file and then copies the unique music files and writes M3U playlists to the folder specified in the .env file.