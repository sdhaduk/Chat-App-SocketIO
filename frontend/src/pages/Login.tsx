import React, { useContext } from "react";
import { Alert, Button, Form, Col, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login: React.FC = () => {
  const { updateLoginInfo, loginUser, loginError, isLoginLoading, loginInfo } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Login</h2>
              <Form.Control
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
              />
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, password: e.target.value })
                }
              />
              <Button variant="success" type="submit">
                {isLoginLoading ? "Loading" : "Login"}
              </Button>
              
              {loginError?.error && <Alert variant="danger">{loginError.message}</Alert>}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
