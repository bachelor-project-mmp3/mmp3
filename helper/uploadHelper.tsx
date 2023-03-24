import { storage } from '../firebaseConfig';
import imageCompression from 'browser-image-compression';
import {
    ref,
    uploadBytes as upload,
    getDownloadURL as getUrl,
} from 'firebase/storage';
import { v4 as randomId } from 'uuid';

export async function uploadImage(image, uploadFolder) {
    if (image.size > 2100000) {
        const options = { maxSizeMB: 2 };
        image = await imageCompression(image, options);
    }

    return new Promise(function (resolve) {
        const fileName = `${image.name}_${randomId()}`;
        const imageRef = ref(storage, `${uploadFolder}/${fileName}`);

        upload(imageRef, image).then((snapshot) => {
            getUrl(snapshot.ref).then((url) => {
                resolve(url);
            });
        });
    });
}
