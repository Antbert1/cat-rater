import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from '../components/Header';
import UploadService from "../services/FileUploadService";
import defaultImg from '../assets/blankCat.png';
import back from '../assets/backChevron.png';

function Upload(props: any) {
    const [selectedFiles, setSelectedFiles] = useState("");
    const [imageSrc, setImageSrc] = useState(defaultImg);
    const [currentFile, setCurrentFile] = useState("");
    const [saveButton, setSaveButton] = useState(false);
    const [message, setMessage] = useState("");

    const selectFile = (event: any) => {
        setSelectedFiles(event.target.files);
        let files = event.target.files;
        if (files.length > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                let image = reader.result as string;
                setImageSrc(image);
                setSaveButton(true);
            }
        }
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        setCurrentFile(currentFile);

        UploadService.upload(currentFile, (event: any) => {
        }).then((response) => {
            setMessage(response.data.message);
            props.history.push('/');
        })
            .catch(() => {
                setMessage("Could not upload the image!");
                setCurrentFile("");
            });

        setSelectedFiles("");

    };

    return (
        <div>
            <Header />
            <div className="container">
                <Link to="/">
                    <div className="back">
                        <img src={back} alt={"back chevron"} />
                        &nbsp;Back
                    </div>
                </Link>
                <div>
                    <div className="catImage">
                        <img src={imageSrc} alt="blank cat" />
                    </div>
                    <div className="uploaderContent">
                        <label htmlFor="image-upload" className="customImgUpload buttonStyle">
                            Upload New Cat
                        </label>
                    </div>
                    <input
                        type="file"
                        id="image-upload"
                        name="imageFile"
                        accept="image/jpeg, image/png"
                        onChange={selectFile}
                        className="defaultInput"
                    />
                    <div className="uploaderContent">
                        <button
                            className={"saveBtn btn " + (saveButton ? 'activeSave' : 'inactiveSave')}
                            disabled={!selectedFiles}
                            onClick={upload}
                        >
                            Submit
                        </button>
                    </div>


                    <div className="alert alert-light" role="alert">
                        {message}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Upload;
