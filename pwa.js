Exit code: 0
Wall time: 0.4 seconds
Output:
// Service workers require HTTPS or localhost; normal file:// use still runs the app.
if('serviceWorker' in navigator && location.protocol!=='file:') window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(console.warn));

