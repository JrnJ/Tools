class Converter {
    constructor() {
        this.base64String;
        this.imageElement = document.querySelector('#imageViewer');
        this.dropzone = document.querySelector('#dropInput');
        this.encryptOffset = 8;

        // Set Clicks
        document.querySelector('#viewImage').addEventListener('click', (e) => {
            this.showImage();
        });
        document.querySelector('#downloadAsBase64').addEventListener('click', (e) => {
            this.downloadAsBase64();
        });
        document.querySelector('#downloadAsImage').addEventListener('click', (e) => {
            this.downloadAsImage();
        });
        document.querySelector('#encrypt').addEventListener('click', (e) => {
            this.encrypt();
        });
        document.querySelector('#decrypt').addEventListener('click', (e) => {
            this.decrypt();
        });

        // Goal: Always store it as a base64 string
        document.querySelector('#fileInput').addEventListener('change', (e) => {
            let file = e.target.files[0];

            // Check if its text file (assuming base64)
            if (file.type.includes('text')) {
                const reader = new FileReader();
    
                reader.onloadend = () => {
                    this.base64String = reader.result.trim();
                };
    
                reader.readAsText(file);
            }

            // Check if its an image file
            if (file.type.includes('image')) {
                this.convertImageToBase64();
            }
        });

        // // Prevent default drag behaviors
        // const preventDefaults = (e) => {
        //     e.preventDefault();
        //     e.stopPropagation();
        // };

        // ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        //     this.dropzone.addEventListener(eventName, preventDefaults, false);
        //     document.body.addEventListener(eventName, preventDefaults, false);
        // });
        // this.dropzone.addEventListener('drop', (e) => {
        //     let dataTranser = e.dataTransfer;
        //     console.log(dataTranser.files);
        //     // let file = dataTranser.files[0];

        //     let url = dataTranser.getData('URL');
        //     console.log(url);
        // });
    }

    convertImageToBase64() {
        const fileInput = document.querySelector('#fileInput');

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
    
            if (file.type.includes('image')) {
                // If it's an image file, convert it to base64 directly
                const reader = new FileReader();
    
                reader.onloadend = () => {
                    this.base64String = reader.result.split(',')[1]; // Remove the data URI prefix
                };
    
                reader.readAsDataURL(file);
            }
        }
    }

    convertUrlImageToBase64(url) {

    }

    showImage() {
        if (!this.base64String) {
            return;
        }

        this.imageElement.setAttribute('src', 'data:image/jpeg;base64,' + this.base64String);
    }

    downloadAsBase64() {
        if (!this.base64String) {
            return;
        }

        // Create a blob
        const blob = new Blob([this.base64String], {
            type: 'text/plain'
        });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = this.getFilename('image.txt');

        document.body.appendChild(downloadLink);
        downloadLink.click();

        document.body.removeChild(downloadLink);
    }

    downloadAsImage() {
        if (!this.base64String) {
            return;
        }

        const binaryString = atob(this.base64String);
    
        // Create a byte array
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Create a Blob
        const blob = new Blob([bytes], {
            type: 'image/png'
        });

        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = this.getFilename('image.png');
    
        document.body.appendChild(downloadLink);
        downloadLink.click();
    
        document.body.removeChild(downloadLink);
    }

    getFilename(fallbackName = "file") {
        let fileName = document.querySelector('#nameInput').value;
        if (fileName == "") {
            fileName = fallbackName;
        }

        return fileName;
    }

    encrypt() {
        let newBase64String = this.base64String;

        // 1. Offset characters
        {
            let string = '';
            for (let i = 0; i < newBase64String.length; i++) {
                string += String.fromCharCode(newBase64String.charCodeAt(i) + this.encryptOffset);
            }
            newBase64String = string;
        }

        // 2. Invert characters
        {
            let string = '';
            for (let i = newBase64String.length - 1; i >= 0; i--) {
                string += newBase64String[i];
            }
            newBase64String = string;
        }

        // End
        this.base64String = newBase64String;
    }

    decrypt() {
        let newBase64String = this.base64String;

        // . Invert characters
        {
            let string = '';
            for (let i = newBase64String.length - 1; i >= 0; i--) {
                string += newBase64String[i];
            }
            newBase64String = string;
        }

        // . Offset characters
        {
            let string = '';
            for (let i = 0; i < newBase64String.length; i++) {
                string += String.fromCharCode(newBase64String.charCodeAt(i) - this.encryptOffset);
            }
            newBase64String = string;
        }

        // End
        this.base64String = newBase64String;
    }
}

const converter = new Converter();