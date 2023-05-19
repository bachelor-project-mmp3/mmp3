import { supabase } from '../lib/supabase';
import imageCompression from 'browser-image-compression';
import { v4 as randomId } from 'uuid';

export async function uploadImage(image, uploadFolder) {
    /*
    if (image.size > 2100000) {
        const options = { maxSizeMB: 2 };
        image = await imageCompression(image, options);
    }*/

    const extension = image.name.split('.').pop();
    const fileName = `${randomId()}.${extension}`;

    const { data, error } = await supabase.storage
        .from('images')
        .upload(`${uploadFolder}/${fileName}`, image as File);

    if (error) {
        console.log(error);
    }

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/images/${data.path}`;
    return publicUrl;
}
