import React, { useState } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UploadService from "../services/FileUploadService";

function Upload() {
    const [selectedFiles, setSelectedFiles] = useState("");
    const [currentFile, setCurrentFile] = useState("");
    const [message, setMessage] = useState("");
    const [fileInfos, setFileInfos] = useState([]);

    const selectFile = (event: any) => {
        setSelectedFiles(event.target.files);
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        setCurrentFile(currentFile);

        UploadService.upload(currentFile, (event: any) => {
        })
            .then((response) => {
                setMessage(response.data.message);
                // return UploadService.getFiles();
            })
            .then((files) => {
                debugger;

            })
            .catch(() => {
                // setProgress(0);
                setMessage("Could not upload the file!");
                setCurrentFile("");
            });

        setSelectedFiles("");
    };

    return (
        <div>
            <Header />
            <div>

                <label className="btn btn-default">
                    <input type="file" onChange={selectFile} />
                </label>

                <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={upload}
                >
                    Upload
                </button>

                <div className="alert alert-light" role="alert">
                    {message}
                </div>

                <div className="card">
                </div>
            </div>
        </div>
    )

}

export default Upload;
