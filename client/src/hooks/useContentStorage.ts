import { useState, useEffect, useCallback } from 'react';

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

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
    }, [content]);

    const updateContent = useCallback((updates: Partial<ContentData>) => {
        setContent(prev => ({ ...prev, ...updates }));
    }, []);

    const resetToDefaults = useCallback(() => {
        setContent(defaultContent);
        localStorage.removeItem(STORAGE_KEY);
    }, [defaultContent]);

    return { content, updateContent, resetToDefaults };
}
