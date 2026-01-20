/**
 * Utility functions for handling file paths and asset URLs
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
 * Download a file from the public directory
 * @param fileName - The file name (e.g., "CV_Nguyen_Manh_Dat.pdf")
 * @param customName - Optional custom download name
 */
export function downloadFile(fileName: string, customName?: string): void {
  try {
    const url = getAssetUrl(fileName);
    const link = document.createElement("a");
    link.href = url;
    link.download = customName || fileName;
    link.target = "_blank"; // Open in new tab to handle CORS issues
    
    // Temporarily add to DOM
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    console.log(`Download initiated: ${fileName} from ${url}`);
  } catch (error) {
    console.error("Error downloading file:", error);
    // Fallback: try to open in new tab
    try {
      const url = getAssetUrl(fileName);
      window.open(url, "_blank");
    } catch (fallbackError) {
      console.error("Fallback failed:", fallbackError);
      throw new Error(`Failed to download ${fileName}`);
    }
  }
}

/**
 * Open a file in a new tab
 * @param fileName - The file name
 */
export function openFile(fileName: string): void {
  try {
    const url = getAssetUrl(fileName);
    window.open(url, "_blank");
  } catch (error) {
    console.error("Error opening file:", error);
    throw error;
  }
}

/**
 * Check if a file exists and is accessible
 * @param fileName - The file name to check
 * @returns Promise that resolves to true if accessible, false otherwise
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
 * Get Google Drive preview URLs for different formats
 * @param googleDriveId - The Google Drive file ID
 * @returns Array of possible preview URLs
 */
export function getGoogleDriveUrls(googleDriveId: string): string[] {
  if (!googleDriveId) {
    throw new Error("Google Drive ID is required");
  }
  
  return [
    `https://docs.google.com/spreadsheets/d/${googleDriveId}/edit?usp=sharing`,
    `https://drive.google.com/file/d/${googleDriveId}/view?usp=sharing`,
    `https://docs.google.com/viewer?url=https://drive.google.com/uc?id=${googleDriveId}&export=download`,
    `https://drive.google.com/uc?id=${googleDriveId}&export=download`
  ];
}

/**
 * Open Google Drive file with fallback options
 * @param googleDriveId - The Google Drive file ID
 */
export function openGoogleDriveFile(googleDriveId: string): void {
  if (!googleDriveId) {
    throw new Error("Google Drive ID is missing");
  }
  
  try {
    const urls = getGoogleDriveUrls(googleDriveId);
    
    // Try the first URL (spreadsheet edit link)
    window.open(urls[0], "_blank");
    
    // Log all possible URLs for debugging
    console.log("Google Drive URLs for ID:", googleDriveId);
    urls.forEach((url, index) => {
      console.log(`URL ${index + 1}:`, url);
    });
    
  } catch (error) {
    console.error("Error opening Google Drive file:", error);
    throw error;
  }
}
