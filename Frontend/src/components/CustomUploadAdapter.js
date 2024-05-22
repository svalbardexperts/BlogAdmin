import axios from 'axios';

class CustomUploadAdapter {
    constructor(loader, config) {
        this.loader = loader;
        this.config = config;
    }

    upload() {
        return this.loader.file
            .then(file => new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('image', file);
                axios.post('https://svalbardexperts.com/api/story/addImage', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(response => {
                    resolve({
                        default: response.data.url
                    });
                })
                .catch(error => {
                    reject(error);
                });
            }));
    }

    abort() {
        // This method can be used to abort the upload process if needed.
    }
}

export function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
        const config = editor.config.get('simpleUpload');
        return new CustomUploadAdapter(loader, config);
    };
}
