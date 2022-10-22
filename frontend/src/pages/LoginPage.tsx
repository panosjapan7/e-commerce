import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

axios.defaults.baseURL = process.env.REACT_APP_SERVER_PORT || "http://localhost:4000"

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState({});
    const navigate = useNavigate();

    const userLogin = async () => {
        const { data } = await axios.post("/users/", {
            email: email,
            password: password
        })
        setLogin(data);
        console.log(data)
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        userLogin();
        console.log("You have logged in!")
        navigate("/")
    }


  return (
    <Container>
    <Row>
        <Col md={6} className="signup__form--container">
            <Form style={{ width: "100%"}} onSubmit={handleSubmit}>
                <h1 className="signup__form--title">Log in</h1>
                
                <Form.Group id="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={email} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setEmail(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group id="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} required onChange={(e: { target: { value: React.SetStateAction<string> } }) => setPassword(e.target.value)} />
                </Form.Group>
                <br />
                <Form.Group>
                <Button type="submit">Log in</Button>
                </Form.Group>

            </Form>
        </Col>
    </Row>
</Container>
    )
}
