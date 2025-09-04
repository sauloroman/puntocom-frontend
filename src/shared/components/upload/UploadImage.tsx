import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoImageOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { UploadButton } from "../button/UploadButton";

interface UploadImageProps {
  onUpload: (formData: FormData) => void;
}

export const UploadImage: React.FC<UploadImageProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFile = acceptedFiles[0];
    if (newFile) {
      setFile(newFile);
      setPreview(URL.createObjectURL(newFile));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  const handleRemove = () => {
    setPreview(null);
    setFile(null);
  };

  const handleUpload = () => {
    if (!file || !onUpload) return;
    const formData = new FormData();
    formData.append("files", file);
    onUpload(formData);
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      
      <div
        {...getRootProps()}
        className={`${preview && "hidden"} w-full border-2 border-dashed border-indigo-400 p-6 rounded-xl text-center cursor-pointer h-52 flex items-center justify-center hover:border-indigo-500 transition`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-sm font-semibold text-gray-700">
          <IoImageOutline className="text-indigo-300" size={80} />
          {isDragActive ? (
            <p className="text-blue-600">Suelta tu imagen aquí...</p>
          ) : (
            <p className="text-gray-600">Arrastra o haz clic para subir</p>
          )}
        </div>
      </div>

      {preview && (
        <>
          <div className="flex justify-center w-full h-46 bg-gray-100 p-6 rounded-md">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden shadow-md border border-gray-200">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleRemove}
                className="cursor-pointer absolute top-1 right-1 bg-white/80 hover:bg-white text-red-400 rounded-full p-1 shadow transition"
              >
                <MdClose size={18} />
              </button>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="w-50" onClick={handleUpload} >
              <UploadButton text="Subir Imagen" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
