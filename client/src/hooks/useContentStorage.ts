import { useState, useEffect, useCallback, useRef } from 'react';
import { getGistConfig, fetchGistContent, updateGistContent } from '@/lib/gistApi';

const STORAGE_KEY = 'portfolio_content';

export interface ContentData {
    // Personal Info
    ownerName: string;
    ownerName_en?: string;
    ownerEmail: string;
    ownerPhone: string;
    ownerLocation: string;
    ownerLocation_en?: string;
    avatarUrl: string;

    // Introduction (bilingual)
    introduction_vi?: string;
    introduction_en?: string;

    // Social Links
    socialLinks: {
        email: string;
        phone: string;
        linkedin: string;
        github: string;
        facebook: string;
    };

    // Skills
    skills: string[];
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

    // Load from Gist on initial mount
    useEffect(() => {
        const loadFromGist = async () => {
            const config = getGistConfig();
            if (!config) {
                setSyncStatus('offline');
                return;
            }

            setSyncStatus('syncing');
            const gistContent = await fetchGistContent<ContentData>(config);

            if (gistContent && Object.keys(gistContent).length > 0) {
                setContent(prev => ({ ...defaultContent, ...gistContent }));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(gistContent));
                setSyncStatus('synced');
                setLastSynced(new Date());
            } else {
                setSyncStatus('offline');
            }
        };

        loadFromGist();
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
