import { supabase } from '../lib/supabase';
import imageCompression from 'browser-image-compression';
import { v4 as randomId } from 'uuid';

export async function uploadImage(image, uploadFolder) {
    if (image.size > 2100000) {
        const options = { maxSizeMB: 2 };
        image = await imageCompression(image, options);
    }

    const fileName = `${randomId()}`;

    const { data } = await supabase.storage
        .from('images')
        .upload(`${uploadFolder}/${fileName}`, image, {
            cacheControl: '3600',
            upsert: false,
        });

    const publicUrl = `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL}/storage/v1/object/public/images/${data.path}`;
    return publicUrl;
}
