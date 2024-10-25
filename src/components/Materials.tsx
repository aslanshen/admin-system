import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import api from '../api';

type Folder = {
    id: string;
    name: string;
    parentId: string | null;
    children: Folder[];
};

export default function Materials() {
    const [folders, setFolders] = useState<Folder[]>([]);
    const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
    const [newFolderName, setNewFolderName] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchFolders();
    }, []);

    const fetchFolders = async () => {
        try {
            const fetchedFolders = await api.getFolders();
            setFolders(fetchedFolders);
            setError(null);
        } catch (error) {
            console.error('Failed to fetch folders:', error);
            setError('Failed to fetch folders. Please try again.');
        }
    };

    const createFolder = async () => {
        if (!newFolderName) return;
        try {
            const newFolder = await api.createFolder({
                name: newFolderName,
                parentId: currentFolder ? currentFolder.id : null,
            });
            if (currentFolder) {
                setFolders(folders.map(folder =>
                    folder.id === currentFolder.id
                        ? { ...folder, children: [...folder.children, newFolder] }
                        : folder
                ));
            } else {
                setFolders([...folders, newFolder]);
            }
            setNewFolderName('');
            setError(null);
        } catch (error) {
            console.error('Failed to create folder:', error);
            setError('Failed to create folder. Please try again.');
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const uploadFile = async () => {
        if (file && currentFolder) {
            setUploadStatus('上传中...');
            try {
                await api.uploadFile(file, currentFolder.id);
                setUploadStatus(`文件 ${file.name} 已成功上传到 ${currentFolder.name}`);
                setFile(null);
                setError(null);
            } catch (error) {
                console.error('Failed to upload file:', error);
                setError('Failed to upload file. Please try again.');
                setUploadStatus(null);
            }
        }
    };

    const renderFolders = (folderList: Folder[], level: number) => (
        <ListGroup>
            {folderList.map(folder => (
                <ListGroup.Item
                    key={folder.id}
                    action
                    onClick={() => setCurrentFolder(folder)}
                    className={`d-flex justify-content-between align-items-center ${level === 1 ? 'bg-light' : ''}`}
                >
          <span>
            <i className={`bi bi-folder me-2 ${level === 1 ? 'text-primary' : ''}`} aria-hidden="true"></i>
              {folder.name}
          </span>
                    {level === 1 && <span className="badge bg-primary rounded-pill">{folder.children.length}</span>}
                </ListGroup.Item>
            ))}
        </ListGroup>
    );

    return (
        <Container>
            <h2 className="mb-4">素材管理</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
                <Col md={6}>
                    <h4>文件夹结构</h4>
                    <Form className="mb-3">
                        <Form.Group>
                            <Form.Control
                                type="text"
                                placeholder="新文件夹名称"
                                value={newFolderName}
                                onChange={(e) => setNewFolderName(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={createFolder} className="mt-2">
                            <i className="bi bi-folder-plus me-2" aria-hidden="true"></i>
                            创建文件夹
                        </Button>
                    </Form>
                    <h5>一级 class</h5>
                    {renderFolders(folders, 1)}
                    {currentFolder && (
                        <>
                            <h5 className="mt-3">二级 collection</h5>
                            {renderFolders(currentFolder.children, 2)}
                            <Button variant="link" className="mt-2 p-0" onClick={() => setCurrentFolder(null)}>
                                <i className="bi bi-arrow-up-circle me-2" aria-hidden="true"></i>
                                返回上级
                            </Button>
                        </>
                    )}
                </Col>
                <Col md={6}>
                    <h4>文件上传</h4>
                    <Form>
                        <Form.Group>
                            <Form.Control type="file" onChange={handleFileUpload} />
                        </Form.Group>
                        <Button variant="primary" onClick={uploadFile} className="mt-2" disabled={!file || !currentFolder}>
                            <i className="bi bi-cloud-upload me-2" aria-hidden="true"></i>
                            上传文件
                        </Button>
                    </Form>
                    {file && <p className="mt-2">已选择文件: {file.name}</p>}
                    {uploadStatus && <Alert variant="info" className="mt-2">{uploadStatus}</Alert>}
                </Col>
            </Row>
        </Container>
    );
}