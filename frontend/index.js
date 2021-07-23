console.log("javascript file is running......");

function onSubmit(event){
    event.preventDefault()
    console.log("file is submitted............",event.target.myfile);
    handleFileSelect(event);
}

function handleFileSelect(event) {
   const f1=document.querySelector('input').files[0];
     
  const reader = new FileReader()
  reader.onload = handleFileLoad;
  
  reader.readAsText(event.target.myfile.files[0])
}

function handleFileLoad(event) {

  console.log(event.target.result);
   
}