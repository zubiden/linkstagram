import AwsS3 from "@uppy/aws-s3"
import Uppy from "@uppy/core"
import { IImage } from "../types"
import { API_BASE } from "./api"

export const getUppy = () => {
    const uppy = Uppy<Uppy.StrictTypes>({
        restrictions: {
            maxNumberOfFiles: 10,
            allowedFileTypes: ["image/png", "image/jpg", "image/jpeg"],
            maxFileSize: 5 * 1024 * 1024 // 5MB
        },
    })

    uppy.use(AwsS3, {
        companionUrl: API_BASE,
    });

    return uppy;
}

export const addFile = (uppy: Uppy.Uppy, file: File) => {
    return uppy.addFile({
        name: file.name,
        type: file.type,
        data: file,
        source: 'Local'
    })
}

export const uploadFiles = async (files: File[]) => {
    const uppy = getUppy();
    files.forEach(file => addFile(uppy, file));

    const result = await uppy.upload();
    if(result.failed.length) {
        return result.failed;
    }
    if(result.successful.length) {
        return transformFileData(result.successful);
    }
    return [];
}

export const transformFileData = (files: Uppy.UploadedUppyFile<any, any>[]): IImage[] => {
    return files.map(file => {
        const key: string = (file.meta as any).key;
        const [storage, id] = key.split("/");
        const params: IImage = {
            id: id,
            storage: storage,
            metadata: {
                filename: file.meta.name,
                size: file.data.size,
                mime_type: file.data.type
            }
        }
        return params;
    });
}