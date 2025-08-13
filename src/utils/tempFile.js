import fs from "fs";
import path from "path";
import os from "os";

export function saveBufferToTempFile(buffer, filename = "audio.wav") {
  const tempFilePath = path.join(os.tmpdir(), filename);
  fs.writeFileSync(tempFilePath, buffer);
  return tempFilePath;
}

export function removeTempFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}
