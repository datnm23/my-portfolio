// GitHub Gist API helper functions

const GIST_API_URL = 'https://api.github.com/gists';

export interface GistConfig {
    gistId: string;
    token: string;
}

export interface GistResponse {
    id: string;
    files: Record<string, { content: string; filename: string }>;
    updated_at: string;
}

// Get Gist config from localStorage
export function getGistConfig(): GistConfig | null {
    const config = localStorage.getItem('gist_config');
    if (!config) return null;
    try {
        const parsed = JSON.parse(config);
        if (parsed.gistId && parsed.token) {
            return parsed as GistConfig;
        }
        return null;
    } catch {
        return null;
    }
}

// Save Gist config to localStorage
export function saveGistConfig(config: GistConfig): void {
    localStorage.setItem('gist_config', JSON.stringify(config));
}

// Clear Gist config
export function clearGistConfig(): void {
    localStorage.removeItem('gist_config');
}

// Fetch content from Gist
export async function fetchGistContent<T>(config: GistConfig): Promise<T | null> {
    try {
        const response = await fetch(`${GIST_API_URL}/${config.gistId}`, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!response.ok) {
            console.error('Failed to fetch Gist:', response.status, response.statusText);
            return null;
        }

        const gist: GistResponse = await response.json();
        const contentFile = gist.files['content.json'];

        if (!contentFile) {
            console.error('content.json not found in Gist');
            return null;
        }

        return JSON.parse(contentFile.content) as T;
    } catch (error) {
        console.error('Error fetching Gist:', error);
        return null;
    }
}

// Update content in Gist
export async function updateGistContent<T>(config: GistConfig, content: T): Promise<boolean> {
    try {
        const response = await fetch(`${GIST_API_URL}/${config.gistId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                files: {
                    'content.json': {
                        content: JSON.stringify(content, null, 2),
                    },
                },
            }),
        });

        if (!response.ok) {
            console.error('Failed to update Gist:', response.status, response.statusText);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error updating Gist:', error);
        return false;
    }
}

// Test Gist connection
export async function testGistConnection(config: GistConfig): Promise<{ success: boolean; message: string }> {
    try {
        const response = await fetch(`${GIST_API_URL}/${config.gistId}`, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (response.status === 401) {
            return { success: false, message: 'Token không hợp lệ hoặc đã hết hạn' };
        }

        if (response.status === 404) {
            return { success: false, message: 'Gist ID không tồn tại' };
        }

        if (!response.ok) {
            return { success: false, message: `Lỗi: ${response.status} ${response.statusText}` };
        }

        const gist: GistResponse = await response.json();

        if (!gist.files['content.json']) {
            return { success: false, message: 'Gist không chứa file content.json' };
        }

        return { success: true, message: 'Kết nối thành công!' };
    } catch (error) {
        return { success: false, message: `Lỗi kết nối: ${error}` };
    }
}
