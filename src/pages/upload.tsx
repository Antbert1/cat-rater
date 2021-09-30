import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import UploadService from "../services/FileUploadService";
import defaultImg from '../assets/blankCat.png';
import back from '../assets/backChevron.png';

function Upload(props: any) {
    const [selectedFiles, setSelectedFiles] = useState("");
    const [imageSrc, setImageSrc] = useState(defaultImg);
    const [currentFile, setCurrentFile] = useState("");
    const [message, setMessage] = useState("");

    const selectFile = (event: any) => {
        setSelectedFiles(event.target.files);
        let files = event.target.files;
        if (files.length > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onloadend = function (e) {
                let image = reader.result as string;
                setImageSrc(image)
            }
        }
    };

    const upload = () => {
        let currentFile = selectedFiles[0];

        setCurrentFile(currentFile);

        UploadService.upload(currentFile, (event: any) => {
        }).then((response) => {
            setMessage(response.data.message);
        })
            .catch(() => {
                setMessage("Could not upload the file!");
                setCurrentFile("");
            });

        setSelectedFiles("");
        props.history.push('/');
    };

    return (
        <div>
            <Header />
            <Link to="/">
                <div className="back">
                    <img src={back} alt={"back chevron"} />
                    Back
                </div>
            </Link>
            <div>
                <div className="catImage">
                    <img src={imageSrc} alt="blank cat" />
                </div>
                <div className="uploaderContent">
                    <label htmlFor="image-upload" className="customImgUpload buttonStyle">
                        UPLOAD CAT
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
            </div>
        </div>
    )

}

export default Upload;
