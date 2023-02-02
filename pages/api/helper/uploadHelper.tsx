
import { storage } from '../../../firebaseConfig';
import { ref, uploadBytes as upload, getDownloadURL as getUrl } from 'firebase/storage';
import { v4 as randomId } from 'uuid';
import { getServerSideProps } from '../../events/[id]';
import { getServerSession } from 'next-auth';

export const uploadImage = (image, uploadFolder) => {
    try {
        const fileName = `${image.name}_${randomId()}`; 
        const imageRef = ref(storage, `${uploadFolder}/${fileName}`);

        upload(imageRef, image).then((snapshot) => {
            getUrl(snapshot.ref).then((url) => {
                // TODO: save url to profile (database)
            });
            alert('Image uploaded...');
        });
    } catch (err) {
        console.error(err.message);
    }
};