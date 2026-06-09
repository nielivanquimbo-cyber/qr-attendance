const WEBAPP_URL =
"https://script.google.com/macros/s/AKfycbxzdsXDfHi2CHv-LpGdEgicxXGiBplqRYZRFPNLsQuU4s0ktIS4laiuH6NRohGj3luZ/exec";

let lastScan = "";

function onScanSuccess(decodedText){

  if(decodedText === lastScan){
    return;
  }

  lastScan = decodedText;

  document.getElementById("result")
  .innerText =
  "Saving Attendance...";

fetch(WEBAPP_URL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    studentID: decodedText
  })
})

  .then(response=>response.json())

  .then(data=>{

    document.getElementById("result")
    .innerText =
    "Recorded: " + decodedText;

    setTimeout(()=>{
      lastScan = "";
    },2000);

  })

  .catch(error=>{

    document.getElementById("result")
    .innerText =
    "Error Saving";

  });

}

const html5QrCode =
new Html5Qrcode("reader");

Html5Qrcode.getCameras()
.then(devices=>{

  html5QrCode.start(

    devices[0].id,

    {
      fps:10,
      qrbox:250
    },

    onScanSuccess

  );

});