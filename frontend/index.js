console.log("javascript file is running......");
const fileList=[];
let filesAfterUnpacking=[];
const mergedFile={
data:"",
name:""
}
var pack=true;
var unpack=false;
 
  


//its when user select "choose file" and select any file frm  machine(laptop/destkp/mobile/tab)
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
if(fileList.length>0 && unpack){

  alert('please upload only one file for umpacking',unpack);
  window.location.reload();
  return;
}
 
fileList.push(event.target.files[0]);

  makeTableRow(fileName,"#");
   

}
function onSubmit(event){
    event.preventDefault();
    if(fileList.length===0)
    return;
    
    if(unpack){
       console.log('unapcking file...');
        
      readFileForUnpacking(fileList[0],()=>{
        console.log("unpacked files",filesAfterUnpacking)
        loader.classList.remove('disable-loader');
         setTimeout(()=>{
           
           createMergeFileDivInDownloadContainer()
           makeDownloadButton();
          
         },2000)
      })

    }else{
      handleFileLoad(event);

    }
     
    console.log("file is submitted............",event.target.myfile);
     
}
 

//we need to read file line by line to unpack
function readFileForUnpacking(file, callBack){
  
  let fileData="";

  const reader = new FileReader()
  reader.onload =(event)=>{
   fileData+= event.target.result;
  // console.log("reading file",event.target.result);
      const allLinesInFile=fileData.split("\n");
       console.log(allLinesInFile);
     let  holdDataTillLineBreak="";
      let count=0;
      allLinesInFile.forEach((line,index)=>{
            
             
              //make the file with the holdDataTillbreak and push it to unpackfile array
              //make count=0; make holdataTillLINeBreak="";
              if(line!=="")
              {
                filesAfterUnpacking.push({
                  fileName:"unpackedFile",
                  data:line
                });
              }
            
               
            

             
      });
      callBack();
  }; 
  reader.readAsText(file);

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
       
     if(i<fileList.length-1)
       {
        mulitpleFileDataAsString+="\n\n";
       }
    
       if(i===fileList.length-1){
        console.log("merged file data-> ",mulitpleFileDataAsString);
       // download("mergedFile.txt",mulitpleFileDataAsString);
       //add merge file data in global obj
       mergedFile.data=mulitpleFileDataAsString;
       mergedFile.name="_MergedFile_";

       //eneable loader
       console.log(loader);
       loader.classList.remove('disable-loader');
       setTimeout( ()=>{

         createMergeFileDivInDownloadContainer();
         makeDownloadButton();
       },2000)
           
       }
      
   })
  }

     //diabled loader
    

   
 // download("meghraj.txt",event.target.result);
   
}


function createMergeFileDivInDownloadContainer(){
  const mergedFileDiv=document.getElementById('downloadContainer');
      
      if(unpack){
        
        console.log(mergedFileDiv);
      for(let i=0;i<filesAfterUnpacking.length;i++){
       const fileName= document.getElementById('filename');
       const h3=document.createElement("div");
       h3.classList.add("downloadFileList");
        h3.innerHTML=`FileName- ${+Math.random()}_mergedfile_txt`;
       fileName.appendChild(h3)
      }

      }else{
     
        console.log(mergedFileDiv);
      
       const fileName= document.getElementById('filename');
       fileName.innerHTML=`<h3>FileName-_mergedfile_txt</h3>`

      }
  //creaelsete div , assign it to download container with download button and merge file name
  
  
   
   

 }

 function makeDownloadButton(){
   
  const downloadBtn=document.getElementById('downloadbtn');

  downloadBtn.classList.remove('btn-download-disabled');
  downloadBtn.classList.add('btn-download-allowed');
  
 // downloadBtn.onclick(download(mergedFileDiv.name, mergedFileDiv.data))
   
  downloadBtn.addEventListener('click',()=>download(mergedFile.name,mergedFile.data))
   const loader=document.getElementById('loader');
   
  loader.classList.add('disable-loader');

 }

function download() {
  console.log('into download');
  if(pack)
  { 
    const filename=mergedFile.name;
    const text=mergedFile.data
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);

  }else{
    if(unpack){
     filesAfterUnpacking.forEach((file)=>{

      const filename=file.fileName;
    const text=file.data
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
      
     })
    
     filesAfterUnpacking=[];

    }
  }
  

  window.location.reload();
}

function radiobuttonClicked(event){
   
  if(fileList.length>0 || filesAfterUnpacking.length>0){
    window.location.reload();
  }
  console.log('radio button clicked....',event.value);
  if(event.value==="packing"){
    pack=true;
    unpack=false;
    document.getElementById('packbtn').classList.remove('disabled');
    document.getElementById('unpackbtn').classList.add('disabled');

  }else{
    pack=false;
    unpack=true;
    document.getElementById('unpackbtn').classList.remove('disabled');
    document.getElementById('packbtn').classList.add('disabled');
  }

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
 