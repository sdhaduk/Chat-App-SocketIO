import React from "react";
import { Alert, Button, Form, Col, Row, Stack } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const Register: React.FC = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Form>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Register</h2>
              <Form.Control type="text" placeholder="Name" />
              <Form.Control type="email" placeholder="Email" />
              <Form.Control type="password" placeholder="Password" />
              <Button variant="success" type="submit">
                Register
              </Button>
              <Alert variant="danger">An error occurred</Alert>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
