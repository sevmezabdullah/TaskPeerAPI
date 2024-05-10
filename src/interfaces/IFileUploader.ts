export interface IFileUploader {
    uploadFile(file: any): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}