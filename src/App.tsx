import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Materials from './components/Materials';
import menuItems from './menu.json';

function Placeholder({ title }: { title: string }) {
  return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <h2>{title} - 开发中</h2>
      </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState('dashboard');

  const handleLogin = (username: string, password: string) => {
    // 在实际应用中,您应该在这里进行真正的身份验证
    setIsLoggedIn(true);
  };

  const renderPanel = () => {
    switch (activePanel) {
      case 'dashboard':
        return <Dashboard />;
      case 'materials':
        return <Materials />;
      case 'users':
        return <Placeholder title="用户管理" />;
      case 'settings':
        return <Placeholder title="系统设置" />;
      default:
        return <Dashboard />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
      <Container fluid>
        <Row>
          <Col md={2} className="bg-light min-vh-100 p-0">
            <Nav className="flex-column">
              {menuItems.map((item) => (
                  <Nav.Link
                      key={item.id}
                      className={`p-3 ${activePanel === item.id ? 'active' : ''}`}
                      onClick={() => setActivePanel(item.id)}
                  >
                    <i className={`bi bi-${item.icon} me-2`} aria-hidden="true"></i>
                    {item.name}
                  </Nav.Link>
              ))}
            </Nav>
          </Col>
          <Col md={10}>
            <div className="p-4">
              {renderPanel()}
            </div>
          </Col>
        </Row>
      </Container>
  );
}