export type FileUpload = File & { uploadingProgress: number };

export type FileUploadResponse = { id: string; name: string };

export type FileMetaData = {
  id: string;
  name: string;
  size: string;
  status: FileStatus | null;
};

export const FileStatuses = ["Pendiente","Abierto","Aprobado","Rechazado"] as const;
export type FileStatus = (typeof FileStatuses)[number];
