/**
 * Utility functions for handling file paths and asset URLs
 * DEFAULT: All downloads use Google Drive when googleDriveId is available
 */

/**
 * Get the correct asset URL based on the current environment
 * @param path - The asset path (e.g., "/CV_Nguyen_Manh_Dat.pdf")
 * @returns The correct URL for the asset
 */
export function getAssetUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Check if running in development or production
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  
  // In development, use relative path from public directory
  if (isDev) {
    return `/${cleanPath}`;
  }
  
  // In production, consider the base path from environment or default
  const base = '/my-portfolio/'; // Set based on your deployment path
  return `${base}${cleanPath}`;
}

/**
 * Get Google Drive download URL
 */
export function getGoogleDriveDownloadUrl(googleDriveId: string): string {
  return `https://drive.google.com/uc?id=${googleDriveId}&export=download`;
}

/**
 * Get Google Drive view URL
 */
export function getGoogleDriveViewUrl(googleDriveId: string): string {
  return `https://drive.google.com/file/d/${googleDriveId}/view?usp=sharing`;
}

/**
 * Get Google Drive preview URL (for spreadsheets)
 */
export function getGoogleDrivePreviewUrl(googleDriveId: string): string {
  return `https://docs.google.com/spreadsheets/d/${googleDriveId}/edit?usp=sharing`;
}

/**
 * Download a file - Google Drive is the DEFAULT method
 * @param fileName - The file name for display
 * @param googleDriveId - Google Drive file ID (used by default)
 */
export function downloadFile(fileName: string, googleDriveId?: string): void {
  try {
    if (googleDriveId) {
      // DEFAULT: Download from Google Drive
      const downloadUrl = getGoogleDriveDownloadUrl(googleDriveId);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback: local file (only if no Google Drive ID)
      const url = getAssetUrl(fileName);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    if (googleDriveId) {
      window.open(getGoogleDriveViewUrl(googleDriveId), "_blank");
    }
  }
}

/**
 * Alias for backward compatibility
 */
export function downloadGoogleDriveFile(googleDriveId: string, fileName?: string): void {
  downloadFile(fileName || 'download', googleDriveId);
}

/**
 * Open/preview a file - Google Drive is the DEFAULT method
 * @param googleDriveId - Google Drive file ID
 */
export function openGoogleDriveFile(googleDriveId: string): void {
  if (!googleDriveId) {
    throw new Error("Google Drive ID is missing");
  }
  
  try {
    window.open(getGoogleDrivePreviewUrl(googleDriveId), "_blank");
  } catch (error) {
    console.error("Error opening Google Drive file:", error);
    throw error;
  }
}

/**
 * Open a file in a new tab
 */
export function openFile(fileName: string, googleDriveId?: string): void {
  try {
    if (googleDriveId) {
      window.open(getGoogleDriveViewUrl(googleDriveId), "_blank");
    } else {
      const url = getAssetUrl(fileName);
      window.open(url, "_blank");
    }
  } catch (error) {
    console.error("Error opening file:", error);
    throw error;
  }
}

/**
 * Check if a file exists and is accessible
 */
export async function checkFileExists(fileName: string): Promise<boolean> {
  try {
    const url = getAssetUrl(fileName);
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error("Error checking file existence:", error);
    return false;
  }
}

/**
 * Get Google Drive URLs for different formats (legacy helper)
 */
export function getGoogleDriveUrls(googleDriveId: string): string[] {
  if (!googleDriveId) {
    throw new Error("Google Drive ID is required");
  }
  
  return [
    getGoogleDrivePreviewUrl(googleDriveId),
    getGoogleDriveViewUrl(googleDriveId),
    `https://docs.google.com/viewer?url=${getGoogleDriveDownloadUrl(googleDriveId)}`,
    getGoogleDriveDownloadUrl(googleDriveId)
  ];
}
