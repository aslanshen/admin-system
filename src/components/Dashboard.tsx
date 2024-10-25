import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export default function Dashboard() {
    return (
        <Container>
            <h2 className="mb-4">仪表盘</h2>
            <Row>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>总文件数</Card.Title>
                            <Card.Text className="display-4">128</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>总文件夹数</Card.Title>
                            <Card.Text className="display-4">16</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>总用户数</Card.Title>
                            <Card.Text className="display-4">32</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title>系统状态</Card.Title>
                            <Card.Text>
                                系统运行正常,所有服务均在线。
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}