import { useState, useEffect, useCallback, useRef } from 'react';
import { getGistConfig, fetchGistContent, updateGistContent } from '@/lib/gistApi';

const STORAGE_KEY = 'portfolio_content';

export interface ContentData {
    // Personal Info
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    ownerLocation: string;
    avatarUrl: string;

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
        title: string;
        company: string;
        period: string;
        description: string;
        responsibilities: string[];
    }[];

    // Projects
    projects: {
        id: number;
        title: string;
        location: string;
        year: string;
        description: string;
        role_vi: string;
        role_en: string;
        category: string;
        responsibilities_vi: string[];
        responsibilities_en: string[];
        highlights_vi: string[];
        highlights_en: string[];
    }[];

    // Documents
    documents: {
        id: number;
        title: string;
        description: string;
        fileName: string;
        fileSize: string;
        type: string;
        category: string;
        content: string;
        googleDriveId: string;
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
