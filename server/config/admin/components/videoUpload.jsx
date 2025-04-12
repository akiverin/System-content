// admin/components/VideoUpload.jsx
import React, { useState } from "react";
import {
  Label,
  FormGroup,
  Button,
  Icon,
  DropZone,
} from "@adminjs/design-system";
import axios from "axios";

const VideoUpload = (props) => {
  const { onChange, property, record } = props;

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState(
    record?.params?.[property.name] || ""
  );

  // ✅ Новый обработчик DropZone — принимает массив файлов, а не event
  const handleDropZoneChange = async (files) => {
    const file = files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("video", file);

    try {
      const response = await axios.post("/api/videos/upload-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const { secure_url } = response.data;
      onChange(property.name, secure_url);
      setPreviewUrl(secure_url);
    } catch (err) {
      setError("Ошибка загрузки файла");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormGroup>
      <Label>{property.label + (property.isRequired ? " *" : "")}</Label>

      {previewUrl && (
        <div style={{ marginBottom: "1rem" }}>
          <video width="240" controls>
            <source src={previewUrl} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        </div>
      )}

      <DropZone
        multiple={false}
        onChange={handleDropZoneChange}
        disabled={uploading}
        mimeTypes={["mp4", "mov", "avi", "mkv"]}
        maxSize="8000000"
      />

      {uploading && (
        <Button variant="primary" size="sm" disabled>
          <Icon icon="Loading" /> Загрузка...
        </Button>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </FormGroup>
  );
};

export default VideoUpload;
