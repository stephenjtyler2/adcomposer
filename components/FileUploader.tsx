import React, { useState } from 'react';
import axios from 'axios';

import { Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import {ApiImage} from '@backend/apitypes';

const maxImgSizeMB:number = parseInt(process.env.NEXT_PUBLIC_MAX_IMG_UPLOAD_SIZE_MB??"5");
const maxImgSizeBytes =  maxImgSizeMB * 1024 * 1024;

export type Props = {
    onUploadSuccess?: (imageInfo:ApiImage) => void;
}

export default function FileUploader({onUploadSuccess}:Props) {
    
    // State
    const [uploadFailed, setUploadFailed] = useState<boolean>(false);
    const [uploadComplete, setUploadComplete] = useState<boolean>(false);
    const [uploadingView, setUploadingView] = useState<boolean>(false);

    // Event Handlers
    const handleFileSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("upload file");
        
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            // console.log(file.name);
            // console.log(file.type);
            // console.log(file.size);
            if (file.size> maxImgSizeBytes) {
                alert(`Images cannot be larger than ${maxImgSizeMB}MB.`)
            }
            else {
                doUpload(file);
                // need to clear the value field or the onChange event will not fire again if the same path is selected a second time.
            }
            event.target.value = "";
        }
    }

    const doUpload = (file: File) => {
        // console.log('do upload');
        const formData = new FormData();
        formData.append('file', file);

        setUploadingView(true);
        axios.post('/api/upload', formData)
        .then(response => {
            console.log("Post response successful");
            setUploadComplete(true);
            if (onUploadSuccess) {
                let imgInfo:ApiImage = response.data as ApiImage;
                onUploadSuccess(imgInfo);
            }
        })
        .catch(error => {
            console.log("Post response error");
            console.error(error);
            // handle error here
            setUploadFailed(true);
        });
    }

    const handleUploadingViewDialogClose = () => {
        setUploadFailed(false);
        setUploadComplete(false);
        setUploadingView(false);
    }

    const renderUploadingView = () => {
        return (
            <Dialog
                open={uploadingView}
                onClose={handleUploadingViewDialogClose}>

                <DialogTitle>Image Upload</DialogTitle>
                {uploadFailed && <>
                    <DialogContent>
                        <DialogContentText>
                            Image upload failed.  Please try again later.
                        </DialogContentText>
                    </DialogContent>
                </>}
                {uploadComplete && <>
                    <DialogContent>
                        <DialogContentText>
                            Image upload complete.
                        </DialogContentText>
                    </DialogContent>
                </>}

                {(!uploadFailed && !uploadComplete) && <>
                    <DialogContent>
                        <DialogContentText>
                            Uploading Image...
                        </DialogContentText>
                        <Box sx={{ my: 1 }}>
                            <LinearProgress />
                        </Box>
                    </DialogContent>
                </>}
                {(uploadFailed || uploadComplete) &&
                    <DialogActions>
                        <Button onClick={handleUploadingViewDialogClose}>Close</Button>
                    </DialogActions>
                }
            </Dialog>
        );
    }

    // console.log("about to render")
    return (
        <Box>
            <input
                id="btnFileUpload"
                accept="image/png, image/jpeg, image/bmp, image/tiff, image/gif"
                onChange={handleFileSelected}
                hidden
                type="file"
                disabled={uploadingView}
            />
            <label htmlFor="btnFileUpload">
                <Button disabled={uploadingView} variant="contained" component="span" startIcon={<UploadIcon />}>
                    Upload
                </Button>
            </label>
            {uploadingView && renderUploadingView()}
        </Box>
    );

}