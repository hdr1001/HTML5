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

         if(xhr.response.files) {
            //Send the content of the gist(s) to the console
            Object.keys(xhr.response.files).forEach(key => {
               let elemGist = document.createElement('p');
               elemGist.appendChild(document.createTextNode(xhr.response.files[key].content));

               elem.parentNode.replaceChild(elemGist, elem);
            });
         }
         else {
            console.log('No \"files\" property on the object returned')
         }
      }
   };

   xhr.onerror = () => { //Technical network error
      console.log('Technical network error occured while retrieving the Gist');
   };
 
   xhr.send(); //Fetch the data
}

//Locate the gist placeholders & replace them with the gist
function addGitHubGists() {

   const apiGitHubGistUrl = 'https://api.github.com/gists/';

   document.querySelectorAll('.ghgist').forEach(elemDiv => {
      console.log('Located placeholder for GitHub Gist');

      //For this to work a GitHub Gist ID must be specified
      let sGistID = elemDiv.getAttribute('data-ghgistid');

      if(sGistID) {
         console.log('About to add Gist with ID ' + sGistID + ' to the page');

         addGistToPage(elemDiv, apiGitHubGistUrl + sGistID);
      }
      else {
         console.log('Invalid URL ' + getGitHubGistUrl(sOwner, sGistID));
      }
   });
}

//JavaScript code to load when the HTML DOM is loaded
document.addEventListener('DOMContentLoaded', event => {
   console.log('DOM content loaded, hosted on URL ' + window.location);
   
   addGitHubGists();
});
