import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

export default function Login({ onLogin }: { onLogin: (username: string, password: string) => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'password') {
            onLogin(username, password);
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h2 className="text-center mb-4">后台管理系统登录</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>用户名</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="输入用户名"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>密码</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="输入密码"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            登录
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}