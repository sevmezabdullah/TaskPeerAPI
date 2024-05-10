import { injectable } from "inversify";
import { IFileUploader } from "../interfaces/IFileUploader";
import { v2 as cloudinary } from 'cloudinary';

@injectable()
export class FileUploader implements IFileUploader {
    async uploadFile(file: any): Promise<string> {
        const result = await cloudinary.uploader.upload(file.path, {

            access_mode: 'public',
            resource_type: 'raw',



        });
        if (!result) {
            throw new Error('Upload failed');
        }
        return result.secure_url;
    }
    async deleteFile(fileUrl: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}