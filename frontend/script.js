const API = "";

async function loadFiles() {

    try {

        const response = await fetch("/files", {
            cache: "no-store"
        });

        const files = await response.json();

        console.log("Files:", files);

        const list = document.getElementById("fileList");

        list.innerHTML = "";

        files.forEach(file => {

            list.innerHTML += `
                <li>
                    ${file}

                    <a href="/download/${encodeURIComponent(file)}" target="_blank">
                        Download
                    </a>

                    <button onclick="deleteFile('${file}')">
                        Delete
                    </button>
                </li>
            `;

        });

    }

    catch (err) {

        console.error("Unable to load files", err);

    }

}


async function uploadFile() {

    console.log("Upload button clicked");

    const input = document.getElementById("fileInput");

    console.log(input.files);

    if (input.files.length === 0) {

        alert("Please choose a file first.");

        return;

    }

    const data = new FormData();

    data.append("file", input.files[0]);

    console.log("Sending upload request...");

    try {

        const response = await fetch("/upload", {

            method: "POST",

            body: data

        });

        console.log("Response:", response.status);

        if (!response.ok) {

            const error = await response.text();

            console.error(error);

            alert("Upload failed.");

            return;

        }

        input.value = "";

        await loadFiles();

        console.log("Upload complete.");

    }

    catch (err) {

        console.error(err);

        alert("Upload failed.");

    }

}


async function deleteFile(file) {

    try {

        await fetch(`/delete/${encodeURIComponent(file)}`, {

            method: "DELETE"

        });

        await loadFiles();

    }

    catch (err) {

        console.error(err);

    }

}


loadFiles();