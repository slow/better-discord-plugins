/**
 * @name BegoneAutoPause
 * @source https://github.com/slow/better-discord-plugins/blob/master/BegoneAutoPause/BegoneAutoPause.plugin.js
 * @updateUrl https://raw.githubusercontent.com/slow/better-discord-plugins/master/BegoneAutoPause/BegoneAutoPause.plugin.js
 * @website https://github.com/slow/better-discord-plugins/tree/master/BegoneAutoPause/BegoneAutoPause.plugin.js
 * @authorId 282595588950982656
 * @donate https://paypal.me/eternal404
 */

/*@cc_on
@if (@_jscript)
	
  // Offer to self-install for clueless users that try to run this directly.
  var shell = WScript.CreateObject("WScript.Shell");
  var fs = new ActiveXObject("Scripting.FileSystemObject");
  var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
  var pathSelf = WScript.ScriptFullName;
  // Put the user at ease by addressing them in the first person
  shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
  if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
     shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
  } else if (!fs.FolderExists(pathPlugins)) {
     shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
  } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
     fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
     // Show the user where to put plugins in the future
     shell.Exec("explorer " + pathPlugins);
     shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
  }
  WScript.Quit();

@else@*/

let Modules = BdApi.findModuleByProps('initialize', 'wasAutoPaused');
let Spotify = BdApi.findModuleByProps('fetchIsSpotifyProtocolRegistered');

class BegoneAutoPause {
   constructor() {
      Object.assign(this, ...Object.entries({
         getName: 'BegoneAutoPause',
         getDescription: 'Stops Discord from automatically pausing your music after 30 seconds.',
         getVersion: '1.0.0',
         getAuthor: 'eternal'
      }).map(([f, v]) => ({ [f]: () => v })));
   }

   start() {
      Modules._wasAutoPaused = Modules.__proto__.wasAutoPaused;
      Modules.__proto__.wasAutoPaused = () => false;
      Spotify._pause = Spotify.pause;
      Spotify.pause = () => void 0;
   }

   stop() {
      Modules.__proto__.wasAutoPaused = Modules._wasAutoPaused;
      Spotify.pause = Spotify._pause;
   }
}
