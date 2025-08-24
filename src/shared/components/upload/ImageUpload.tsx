import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoImageOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { UploadButton } from "../button/UploadButton";

export const UploadImage = () => {
    const [preview, setPreview] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    });

    const handleRemove = () => setPreview(null);

    return (
        <div className="flex flex-col items-center space-y-4 w-full">

            <div
                {...getRootProps()}
                className={`${preview && 'hidden'} w-full border-2 border-dashed border-indigo-400 p-6 rounded-xl text-center cursor-pointer h-52 flex items-center justify-center hover:border-indigo-500 transition`}
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
                    <div className={`${preview || 'hidden'} flex justify-center w-full h-64 bg-gray-100 p-6 rounded-md`}>

                        <div className="relative w-80 h-52 rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={handleRemove}
                                className="cursor-pointer absolute top-1 right-1 bg-white/80 hover:bg-white text-red-400 rounded-full p-1 shadow transition"
                            >
                                <MdClose size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="w-50">
                            <UploadButton text="Subir Imágen" />
                        </div>
                    </div>
                </>
            )}

        </div>
    );
};
