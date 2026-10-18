"use client";

import { useUploadFileMutation } from "@/app/lib/redux/features/api";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { successMessage } from "@/app/lib/utils/constants";
import {
  setToasterErrorMessage,
  setToasterSuccessMessage,
} from "@/app/lib/utils/utils";
import { useRef, useState } from "react";

export const UploadImage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (file) formData.append("file", file);

    uploadFile(formData)
      .unwrap()
      .then(() => {
        setToasterSuccessMessage(dispatch);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-4 w-sm">
      <input
        className="input w-full"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="نام"
      />
      <input
        ref={ref}
        name="file"
        type="file"
        accept=".png,.jpg,.jpeg,.webp"
        className="file-input w-full"
        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
      />
      <button
        disabled={!file || !name || isLoading}
        className="btn btn-primary w-full"
        type="submit"
      >
        {isLoading ? (
          <span className="loading loading-spinner" />
        ) : (
          <span>آپلود</span>
        )}
      </button>
    </form>
  );
};
