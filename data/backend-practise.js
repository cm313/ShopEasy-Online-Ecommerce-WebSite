const httpRequest = new XMLHttpRequest();
httpRequest.addEventListener('load', ()=>{
  console.log(httpRequest.response);
});

httpRequest.open('GET', 'https://supersimplebackend.dev');
httpRequest.send();
