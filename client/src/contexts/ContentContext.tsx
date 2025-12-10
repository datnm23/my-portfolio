import { createContext, useContext, ReactNode } from 'react';
import { useContentStorage, ContentData, SyncStatus } from '@/hooks/useContentStorage';
import {
    OWNER_NAME, OWNER_EMAIL, OWNER_PHONE, OWNER_LOCATION,
    SOCIAL_LINKS, SKILLS, SOFTWARE_SKILLS, EXPERIENCES, PROJECTS, SAMPLE_DOCUMENTS, AVATAR_URL
} from '@/const';

// Default content from const.ts
const defaultContent: ContentData = {
    ownerName: OWNER_NAME,
    ownerEmail: OWNER_EMAIL,
    ownerPhone: OWNER_PHONE,
    ownerLocation: OWNER_LOCATION,
    avatarUrl: AVATAR_URL,
    socialLinks: SOCIAL_LINKS,
    skills: SKILLS,
    softwareSkills: SOFTWARE_SKILLS,
    experiences: EXPERIENCES,
    projects: PROJECTS,
    documents: SAMPLE_DOCUMENTS,
};

interface ContentContextType {
    content: ContentData;
    updateContent: (updates: Partial<ContentData>) => void;
    resetToDefaults: () => void;
    syncStatus: SyncStatus;
    lastSynced: Date | null;
    syncFromGist: () => Promise<boolean>;
    syncToGist: () => Promise<boolean>;
}

const ContentContext = createContext<ContentContextType | null>(null);

export function ContentProvider({ children }: { children: ReactNode }) {
    const {
        content,
        updateContent,
        resetToDefaults,
        syncStatus,
        lastSynced,
        syncFromGist,
        syncToGist
    } = useContentStorage(defaultContent);

    return (
        <ContentContext.Provider value={{
            content,
            updateContent,
            resetToDefaults,
            syncStatus,
            lastSynced,
            syncFromGist,
            syncToGist
        }}>
            {children}
        </ContentContext.Provider>
    );
}

export function useContent() {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within ContentProvider');
    }
    return context;
}
