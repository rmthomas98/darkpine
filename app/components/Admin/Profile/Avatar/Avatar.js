import { useEffect, useState } from "react";
import styles from "./Avatar.module.css";
import Image from "next/image";
import defaultAvatar from "../../../../public/assets/images/avatar.svg";
import toast, { Toaster } from "react-hot-toast";
import { fileLessThan } from "../../../../helpers/toasts/fileLessThan";
import { mustBeImage } from "../../../../helpers/toasts/mustBeImage";
import axios from "axios";
import { useRouter } from "next/router";

const Avatar = ({ user }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const handleFileSelect = (e) => {
    if (!e.target.files || !e.target.files.length) {
      setSelectedFile(undefined);
      return;
    }

    console.log(e.target.files[0]);
    if (e.target.files[0].type.split("/")[0] === "image") {
      if (e.target.files[0].size < 16000000) {
        setSelectedFile(e.target.files[0]);
      } else {
        // error toast must be image
        fileLessThan();
      }
    } else {
      // error toast must be less than 16 mb
      mustBeImage();
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectURL = URL.createObjectURL(selectedFile);
    setPreview(objectURL);

    return () => URL.revokeObjectURL(objectURL);
  }, [selectedFile]);

  useEffect(() => {
    if (preview) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [preview]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!preview) return;
    setIsLoading(true);

    const loadingToast = toast.loading("Updating avatar...", {
      style: {
        fontSize: "13px",
        fontWeight: 500,
        background: "#333",
        color: "#fff",
      },
    });

    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("customerId", user.customerId);

    const response = await axios.post(
      "/api/admin/profile/update-avatar",
      formData
    );

    if (response.data === "success") {
      setIsLoading(false);
      setIsDisabled(true);
      toast.success("Avatar updated!", {
        id: loadingToast,
        style: {
          fontSize: "13px",
          fontWeight: 500,
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#06ce95",
          secondary: "#fff",
        },
      });
      router.replace(router.asPath);
    } else {
      setIsLoading(false);
      toast.error("An error has occurred.", {
        id: loadingToast,
        style: {
          fontSize: "13px",
          fontWeight: 500,
          background: "#333",
          color: "#fff",
        },
        iconTheme: {
          primary: "#e6375d",
          secondary: "#fff",
        },
      });
    }
  };

  return (
    <>
      <Toaster />
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.header}>
          <p className={styles.title}>Your Avatar</p>
        </div>
        <div className={styles.mainContainer}>
          {user.avatar && !preview && (
            <div className={styles.imageContainer}>
              <Image
                src={user.avatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          )}
          {!preview && !user.avatar && (
            <div className={styles.imageContainer}>
              <Image
                src={defaultAvatar}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>
          )}
          {preview && (
            <>
              <div className={styles.imageContainer}>
                <Image
                  src={preview}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>
            </>
          )}
          <label htmlFor="file-upload" className={styles.fileUploadBtn}>
            Choose File
          </label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileSelect}
            className={styles.fileInput}
          />
        </div>
        <div className={styles.footer}>
          <p className={styles.footerText}>Update your avatar.</p>
          <button
            type="submit"
            disabled={isLoading || isDisabled}
            className={
              isLoading || isDisabled ? styles.disabled : styles.confirmBtn
            }
          >
            Confirm
          </button>
        </div>
      </form>
    </>
  );
};

export default Avatar;
