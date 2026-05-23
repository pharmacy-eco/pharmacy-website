import { http } from "@/lib/http";

const fnUploadFileImage = async (payload: FormData): Promise<any | undefined> => {
  return await http.post<FormData, any | undefined>("/uploads", payload);
};

const FileService = {
  fnUploadFileImage
};

export default FileService;
