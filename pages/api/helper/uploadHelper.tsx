
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytes as upload, getDownloadURL as getUrl } from 'firebase/storage';
import { v4 as randomId } from 'uuid';

export async function uploadImage (image, uploadFolder) {
    return new Promise(function(resolve) {
        const fileName = `${image.name}_${randomId()}`; 
        const imageRef = ref(storage, `${uploadFolder}/${fileName}`);

        upload(imageRef, image).then((snapshot) => {
            getUrl(snapshot.ref).then((url) => {
                resolve(url)
            });
        })
    })
};