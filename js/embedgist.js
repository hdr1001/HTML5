//Add a gist to a HTML5 web page
function addGistToPage(elem, url) {
   //HTTP request to retrieve the Gist
   const xhr = new XMLHttpRequest();

   //Format of the content retrieved is JSON
   xhr.responseType = 'json';

   xhr.open('GET', url);

   xhr.onload = () => {
      if (xhr.status != 200) { //Record HTTP (exception) status
         console.log(`Error rerieving Gist: HTTP status ${xhr.status}, ${xhr.statusText}`);
      }
      else { //Success
         console.log('Successfully loaded the Gist');

         //Send the Gist content to the console
         console.log(xhr.response.div);
      }
   };

   xhr.onerror = () => { //Technical network error
      console.log('Technical network error occured while retrieving the Gist');
   };
 
   xhr.send(); //Fetch the data
}

//Locate the gist placeholders & replace them with the gist
function addGtiHubGists() {
   function getGitHubGistUrl(owner, id) {
      return 'https://gist.github.com/' + owner + '/' + id + '.json';
   }

   document.querySelectorAll('.ghgist').forEach(elem => {
      console.log('Located placeholder for gist');

      //For this to work a GitHub Gist owner and ID must be specified
      let sOwner = elem.getAttribute('data-ghowner');
      let sGistID = elem.getAttribute('data-ghgistid');

      if(sOwner && sGistID) {
         console.log('About to add Gist with ID ' + sGistID + ' to the page');

         addGistToPage(elem, getGitHubGistUrl(sOwner, sGistID));
      }
      else {
         console.log('Invalid URL ' + getGitHubGistUrl(sOwner, sGistID));
      }
   });
}

//JavaScript code to load when the HTML DOM is loaded
document.addEventListener('DOMContentLoaded', event => {
   console.log('DOM content loaded, hosted on URL ' + window.location);
   
   addGtiHubGists();
});
