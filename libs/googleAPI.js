var leadManager = leadManager || {};
leadManager.preloaded = false;
leadManager.leaderboards = {};

 // Enter a client ID for a web application from the Google Developer Console.
 // The provided clientId will only work if the sample is run directly from
 // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
 // In your Developer Console project, add a JavaScript origin that corresponds to the domain
 // where you will be running the script.
 var clientId = '93006245578';

 // Enter the API key from the Google Develoepr Console - to handle any unauthenticated
 // requests in the code.
 // The provided key works for this sample only when run from
 // https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
 // To use in your own application, replace this API key with your own.
 var apiKey = 'AIzaSyBP5pEkJZRmNzyUEat5MfU9NkIjPXWHznY';

 // To enter one or more authentication scopes, refer to the documentation for the API.
 var scopes = 'https://www.googleapis.com/auth/plus.me';

 // Use a button to handle authentication the first time.
 function handleClientLoad() {
   gapi.client.setApiKey(apiKey);
   window.setTimeout(checkAuth, 1);
 }

 function checkAuth() {
   gapi.auth.authorize({
     client_id: clientId,
     scope: scopes,
     immediate: true
   }, handleAuthResult);
 }


 function handleAuthResult(authResult) {
   var authorizeButton = document.getElementById('authorize-button');
   if (authResult && !authResult.error) {
     authorizeButton.style.visibility = 'hidden';
     makeApiCall();
     getLeaderboards();
   } else {
     authorizeButton.style.visibility = '';
     authorizeButton.onclick = handleAuthClick;
   }
 }

 function handleAuthClick(event) {
   gapi.auth.authorize({
     client_id: clientId,
     scope: scopes,
     immediate: false
   }, handleAuthResult);
   return false;
 }

 // Load the API and make an API call.  Display the results on the screen.
 function makeApiCall() {
   gapi.client.load('plus', 'v1', function () {
     var request = gapi.client.plus.people.get({
       'userId': 'me'
     });
     request.execute(function (resp) {


       /*var heading = document.createElement('h4');
            var image = document.createElement('img');
            image.src = resp.image.url;
            heading.appendChild(image);
            heading.appendChild(document.createTextNode(resp.displayName));*/

       //document.getElementById('content').appendChild(heading);
     });
   });
 }

 function getLeaderboards() {
   var request = gapi.client.games.leaderboards.list();
   request.execute(function (response) {
     console.log('Leaderboard data', response);
     if (response.kind == 'games#leaderboardListResponse' &&
       response.hasOwnProperty('items')) {
       for (var i = 0; i < response.items.length; i++) {
         leadManager.leaderboards[response.items[i].id] = response.items[i];
       }
     }
     leadManager.preloaded = true;
     //welcome.dataLoaded(welcome.ENUM_LEADERBOARDS);
   });
 }