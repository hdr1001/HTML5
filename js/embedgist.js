//Locate the gist placeholders & replace them with the gist
function addGtiHubGists() {
   document.querySelectorAll('.ghgist').forEach(elem => {
      console.log('Located placeholder for gist with id ' + elem.getAttribute('data-ghgistid'));
   });
}

//JavaScript code to load when the HTML DOM is loaded
document.addEventListener('DOMContentLoaded', event => {
   console.log('DOM content loaded, hosted on URL ' + window.location);
   
   addGtiHubGists();
});
