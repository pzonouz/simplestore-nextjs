"use client";

import { useCreateFileMutation } from "@/app/lib/redux/features/api";
// import { useUploadFileMutation } from "@/app/lib/redux/features/api";
import { useAppDispatch } from "@/app/lib/redux/hooks";
import { translateError } from "@/app/lib/utils/translate";
import {
  setToasterErrorMessage,
  setToasterSuccessMessage,
} from "@/app/lib/utils/utils";
import { setAbortedLogsStyle } from "next/dist/server/node-environment-extensions/console-dim.external";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "../../ui/Toaster";

export const UploadImage = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);
  const [backendError, setBackendError] = useState("");

  const [name, setName] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [createFile, { isLoading: createLoading }] = useCreateFileMutation();

  const handleSubmit = (e: React.ChangeEvent) => {
    e.preventDefault();
    if (url) {
      createFile({ name: name, url: url })
        .unwrap()
        .then((res) => {
          setName("");
          setUrl("");
          setBackendError("");
          setToasterSuccessMessage(dispatch);
        })
        .catch((err) => {
          setBackendError(translateError(err));
        });
    }
  };
  useEffect(() => {
    if (!file) return;
    const formData = new FormData();
    if (file) formData.append("file", file);
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res?.ok) {
          res.text().then((res) => {
            setUrl(res);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [file]);
  return (
    <>
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
        {url && (
          <Image
            width={200}
            height={200}
            src={`${process.env.NEXT_PUBLIC_BASE_URL}${url}`}
            alt=""
          />
        )}
        {backendError && <p className="text-error">{backendError}</p>}
        <button
          disabled={!file || !name || loading}
          className="btn btn-primary w-full"
          type="submit"
        >
          {loading ? (
            <span className="loading loading-spinner" />
          ) : (
            <span>ثبت</span>
          )}
        </button>
      </form>
      <Toaster />
    </>
  );
};
