console.log("javascript file is running......");
const fileList=[];
const mergedFile={
data:"",
name:""
}

 
  


//its when user select "choose file" and select any file from  machine(laptop/destkp/mobile/tab)
function onChange(event){
console.log('file uploaded',
  event.target.files[0]
);
const fileName=event.target.files[0].name;
if(fileName){
 let fileFormat= fileName.slice(fileName.length-3,fileName.length);
  if(fileFormat!=="txt")
  {
    alert(fileFormat+" "+" Not Supported Yet")
    return;

  }
  
}
fileList.push(event.target.files[0]);

  makeTableRow(fileName,"#");
   

}
function onSubmit(event){
    event.preventDefault();
    if(fileList.length===0)
    return;
    

    console.log("file is submitted............",event.target.myfile);
    handleFileLoad(event);
}

function handleFileSelect(event) {
   const f1=document.querySelector('input').files[0];
     
  
}

function readFileAndReturnStringOfFile(file, callBack){
  let fileData="";

  const reader = new FileReader()
  reader.onload =(event)=>{
   fileData+= event.target.result;
  // console.log("reading file",event.target.result);
   callBack(fileData);
  }; 
  reader.readAsText(file);

   
}

function handleFileLoad (event) {

  console.log(event.target.result);
    console.log(fileList)
  let   mulitpleFileDataAsString="";
   
  for(let i=0;i<fileList.length;i++)
  {
    readFileAndReturnStringOfFile(fileList[i],(fileDataAsString)=>{
      // debugger;
     mulitpleFileDataAsString+=fileDataAsString;
     mulitpleFileDataAsString+="\n";
       if(i===fileList.length-1){
        console.log("merged file data-> ",mulitpleFileDataAsString);
       // download("mergedFile.txt",mulitpleFileDataAsString);
       //add merge file data in global obj
       mergedFile.data=mulitpleFileDataAsString;
       mergedFile.name="_MergedFile_";

       //eneable loader
       console.log(loader);
       loader.classList.remove('disable-loader');
       setTimeout( createMergeFileDivInDownloadContainer,2000)

       }
      
   })
  }

     //diabled loader
     
     function createMergeFileDivInDownloadContainer(){

      
      
      //create div , assign it to download container with download button and merge file name
      const mergedFileDiv=document.getElementById('downloadContainer');
      console.log(mergedFileDiv);

     const fileName= document.getElementById('filename');
     fileName.innerHTML=`<h3>FileName-_mergedfile_txt</h3>`
      
      const downloadBtn=document.getElementById('downloadbtn');
    
      downloadBtn.classList.remove('btn-download-disabled');
      downloadBtn.classList.add('btn-download-allowed');
      
     // downloadBtn.onclick(download(mergedFileDiv.name, mergedFileDiv.data))
      downloadBtn.addEventListener('click',()=>download(mergedFile.name,mergedFile.data))
       const loader=document.getElementById('loader');
       
      loader.classList.add('disable-loader');
       
       

     }



   
 // download("meghraj.txt",event.target.result);
   
}

function download() {
  const filename=mergedFile.name;
  const text=mergedFile.data
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
  window.location.reload();
}


function makeTableRow(filename, index){
  const table=document.getElementById('filelisttable');
  const row=table.insertRow(1);
  const cell1=  row.insertCell(0);
  const cell2=  row.insertCell(1);
   cell1.innerHTML=`${index}`
   cell2.innerHTML=`${filename}`
   const cell3=  row.insertCell(2);
   cell3.innerHTML=`<a href="">update</a>`
   const cell4=  row.insertCell(3);
   cell4.innerHTML=`<a href="">delete</a>`
   
}
 