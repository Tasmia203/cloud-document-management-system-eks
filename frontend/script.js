const API="http://localhost:5000";

async function loadFiles(){

    const response=await fetch(`${API}/files`);

    const files=await response.json();

    const list=document.getElementById("fileList");

    list.innerHTML="";

    files.forEach(file=>{

        list.innerHTML+=`

        <li>

            ${file}

            <a href="${API}/download/${file}" target="_blank">

            Download

            </a>

            <button onclick="deleteFile('${file}')">

            Delete

            </button>

        </li>

        `;

    });

}

async function uploadFile(){

    const input=document.getElementById("fileInput");

    const data=new FormData();

    data.append("file",input.files[0]);

    await fetch(`${API}/upload`,{

        method:"POST",

        body:data

    });

    loadFiles();

}

async function deleteFile(file){

    await fetch(`${API}/delete/${file}`,{

        method:"DELETE"

    });

    loadFiles();

}

loadFiles();