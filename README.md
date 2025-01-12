# AppleMusic2Android

Syncs local music files and playlists from Apple Music to your Android

### **Who It's For:**
People with large collections of MP3s who keep them locally on their Mac, organized them into playlists, who want to sync their Android phone and its music player by copying over the playlists and the songs in them.

### **How it works:**
When you tell it to do an export, it *copies* every song you're going to transfer to your specified folder and then creates an .m3u format playlist file.

### **Then what?**
Use your favorite method to copy that export folder into your phone's Music folder.

## V0.0.1

"Developers Only" version: A proof of concept that will be difficult for non-developers to run.

### Installation
REQUIRED: Node.js, this has only been tested with 18.71, but it uses very simple API calls, has 2 NPM dependencies (that install a total of 4 packages), and should have decent backward/forward compatibility.

- Clone this repository from Github
- Go into the directory it imported was copied into and run the command `npm install` in the console.

- Open Apple Music. Go to `File -> Library -> Export Library`. If you're feeling like making it easy on yourself, save the resulting file into the same folder as this repository and name it `Library.xml`
- Make an empty folder `AM2A` in this directory as well. If you want to change the folder name, do so in the .env file as well.

### Usage

This is a simple command line version. The commands are as follows:

- `index.js analyze` - exports a list of playlists to `playlists.json`
  - Analyzes the XML file produced when you export your library from Apple Music
  - Location of the file is specified in .env if you don't want to put Library.xml in the code directory
- `index.js export` - imports the `playlists.json` file and then copies the unique music files and writes M3U playlists to the folder specified in the .env file.

Copy the folder full of songs and .m3u files to the Music folder of your Android phone and many music players should pick it all up with no problem.

### Known problems

Some file names don't seem to transfer, or they do, but don't show up in the playlists. We'll need to examine that for later updates.

### Possible Roadmap Items
- Incorporate an MTP library to let the code do the copying directly to the phone and skip the duplicating files to a folder and then copying it over.
- Add a GUI frontend, possibly packing it up in an Electron App to make it a lot easier for non devs to use.
- Fix the known problem.