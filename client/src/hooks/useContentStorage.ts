import { useState, useEffect, useCallback, useRef } from 'react';
import { getGistConfig, fetchGistContent, fetchPublicGistContent, updateGistContent } from '@/lib/gistApi';

const STORAGE_KEY = 'portfolio_content';
const CACHE_TIMESTAMP_KEY = 'portfolio_content_ts';
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

// Public Gist ID for read-only access (no auth needed)
const PUBLIC_GIST_ID = import.meta.env.VITE_GIST_ID || '';

export interface ContentData {
    // Personal Info
    ownerName: string;
    ownerName_en?: string;
    ownerEmail: string;
    ownerPhone: string;
    ownerLocation: string;
    ownerLocation_en?: string;
    avatarUrl: string;
    cvPath?: string; // Path to CV file
    cvUrl?: string; // External URL for CV (e.g., Google Drive link)

    // Introduction (bilingual)
    introduction_vi?: string;
    introduction_en?: string;

    // Job Title & Subtitle (bilingual)
    jobTitle_vi?: string;
    jobTitle_en?: string;
    jobSubtitle_vi?: string;
    jobSubtitle_en?: string;

    // Social Links
    socialLinks: {
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        facebook: string;
    };

    // Skills
    skills: (string | { name: string; name_en?: string; rating?: number })[];
    softwareSkills: { name: string; icon: string }[];

    // Experiences
    experiences: {
        id: number;
        title: string; // Vietnamese title (default)
        title_en?: string; // English title
        company: string; // Vietnamese company name (default)
        company_en?: string; // English company name
        period: string;
        description: string; // Vietnamese description (default)
        description_en?: string; // English description
        responsibilities: string[]; // Vietnamese responsibilities (default)
        responsibilities_en?: string[]; // English responsibilities
        visible?: boolean;
    }[];

    // Projects
    projects: {
        id: number;
        title: string; // Vietnamese title (default)
        title_en?: string; // English title
        location: string; // Vietnamese location (default)
        location_en?: string; // English location
        year: string;
        description: string; // Vietnamese description (default)
        description_en?: string; // English description
        role_vi: string;
        role_en: string;
        category: string; // deprecated, kept for migration
        categories: string[];
        responsibilities_vi: string[];
        responsibilities_en: string[];
        highlights_vi: string[];
        highlights_en: string[];
        visible: boolean;
        documentIds?: number[]; // IDs of linked sample documents
    }[];

    // Documents
    documents: {
        id: number;
        title: string; // Vietnamese title (default)
        title_en?: string; // English title
        description: string; // Vietnamese description (default)
        description_en?: string; // English description
        fileName: string;
        fileSize: string;
        type: string; // Vietnamese type (default)
        type_en?: string; // English type
        category: string;
        content: string; // Vietnamese content (default)
        content_en?: string; // English content
        googleDriveId: string;
    }[];

    // Categories
    categories: {
        id: string;
        name_vi: string;
        name_en: string;
        description_vi: string;
        description_en: string;
    }[];
}

export type SyncStatus = 'idle' | 'syncing' | 'synced' | 'error' | 'offline';

function isCacheStale(): boolean {
    const ts = localStorage.getItem(CACHE_TIMESTAMP_KEY);
    if (!ts) return true;
    return Date.now() - Number(ts) > CACHE_TTL_MS;
}

function updateCacheTimestamp(): void {
    localStorage.setItem(CACHE_TIMESTAMP_KEY, String(Date.now()));
}

export function useContentStorage(defaultContent: ContentData) {
    const [content, setContent] = useState<ContentData>(() => {
        // Load from localStorage on init
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    return { ...defaultContent, ...JSON.parse(stored) };
                } catch {
                    return defaultContent;
                }
            }
        }
        return defaultContent;
    });

    const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
    const [lastSynced, setLastSynced] = useState<Date | null>(null);
    const isInitialMount = useRef(true);
    const syncTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Load content on mount: try public Gist first, then admin config
    useEffect(() => {
        const loadContent = async () => {
            // Skip if cache is still fresh
            if (!isCacheStale()) {
                setSyncStatus('synced');
                return;
            }

            setSyncStatus('syncing');

            // Strategy 1: Try admin config (authenticated, for admin users)
            const adminConfig = getGistConfig();
            if (adminConfig) {
                const gistContent = await fetchGistContent<ContentData>(adminConfig);
                if (gistContent && Object.keys(gistContent).length > 0) {
                    setContent(prev => ({ ...defaultContent, ...gistContent }));
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(gistContent));
                    updateCacheTimestamp();
                    setSyncStatus('synced');
                    setLastSynced(new Date());
                    return;
                }
            }

            // Strategy 2: Try public Gist (no auth, for all visitors)
            if (PUBLIC_GIST_ID) {
                const publicContent = await fetchPublicGistContent<ContentData>(PUBLIC_GIST_ID);
                if (publicContent && Object.keys(publicContent).length > 0) {
                    setContent(prev => ({ ...defaultContent, ...publicContent }));
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(publicContent));
                    updateCacheTimestamp();
                    setSyncStatus('synced');
                    setLastSynced(new Date());
                    return;
                }
            }

            // Fallback: use localStorage cache or defaults
            setSyncStatus(adminConfig ? 'error' : 'offline');
        };

        loadContent();
    }, [defaultContent]);


    // Save to localStorage and sync to Gist on change (debounced)
    useEffect(() => {
        // Skip initial mount
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Save to localStorage immediately
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));

        // Debounce Gist sync
        if (syncTimeout.current) {
            clearTimeout(syncTimeout.current);
        }

        const config = getGistConfig();
        if (!config) {
            setSyncStatus('offline');
            return;
        }

        setSyncStatus('syncing');
        syncTimeout.current = setTimeout(async () => {
            const success = await updateGistContent(config, content);
            if (success) {
                setSyncStatus('synced');
                setLastSynced(new Date());
            } else {
                setSyncStatus('error');
            }
        }, 1000); // Debounce 1 second

        return () => {
            if (syncTimeout.current) {
                clearTimeout(syncTimeout.current);
            }
        };
    }, [content]);

    const updateContent = useCallback((updates: Partial<ContentData>) => {
        setContent(prev => ({ ...prev, ...updates }));
    }, []);

    const resetToDefaults = useCallback(() => {
        setContent(defaultContent);
        localStorage.removeItem(STORAGE_KEY);
    }, [defaultContent]);

    // Force sync from Gist
    const syncFromGist = useCallback(async () => {
        const config = getGistConfig();
        if (!config) {
            setSyncStatus('offline');
            return false;
        }

        setSyncStatus('syncing');
        const gistContent = await fetchGistContent<ContentData>(config);

        if (gistContent && Object.keys(gistContent).length > 0) {
            setContent(prev => ({ ...defaultContent, ...gistContent }));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(gistContent));
            setSyncStatus('synced');
            setLastSynced(new Date());
            return true;
        } else {
            setSyncStatus('error');
            return false;
        }
    }, [defaultContent]);

    // Force sync to Gist
    const syncToGist = useCallback(async () => {
        const config = getGistConfig();
        if (!config) {
            setSyncStatus('offline');
            return false;
        }

        setSyncStatus('syncing');
        const success = await updateGistContent(config, content);

        if (success) {
            setSyncStatus('synced');
            setLastSynced(new Date());
            return true;
        } else {
            setSyncStatus('error');
            return false;
        }
    }, [content]);

    return {
        content,
        updateContent,
        resetToDefaults,
        syncStatus,
        lastSynced,
        syncFromGist,
        syncToGist
    };
}
