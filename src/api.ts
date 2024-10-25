import axios from 'axios';

const API_BASE_URL = 'https://api.example.com';

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
}

export interface FileMetadata {
    id: string;
    name: string;
    folderId: string;
    url: string;
}

const api = {
    login: async (credentials: LoginCredentials) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, credentials);
            return response.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    getFolders: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/folders`);
            return response.data;
        } catch (error) {
            console.error('Get folders error:', error);
            throw error;
        }
    },

    createFolder: async (folder: Omit<Folder, 'id'>) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/folders`, folder);
            return response.data;
        } catch (error) {
            console.error('Create folder error:', error);
            throw error;
        }
    },

    uploadFile: async (file: File, folderId: string) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folderId', folderId);
            const response = await axios.post(`${API_BASE_URL}/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Upload file error:', error);
            throw error;
        }
    },

    getFiles: async (folderId: string) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/files`, {
                params: { folderId },
            });
            return response.data;
        } catch (error) {
            console.error('Get files error:', error);
            throw error;
        }
    },
};

export default api;