import http from "../http-common";

const upload = (file, onUploadProgress) => {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("sub_id", file.name);

    return http.post("/v1/images/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            "x-api-key": "45d49036-1938-44e2-b443-af805aeb55fb"
        }
    });
};


export default {
    upload,
    // getFiles,
};