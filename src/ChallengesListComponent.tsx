import React from "react";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardDeck, Col, Container, Row } from "react-bootstrap";
import {dataService} from "./DataService";
import { ChallengeItem } from "./ChallengeItem";
import {ChallengeDayItem} from "./ChallengeDayItem";
import { Link } from "react-router-dom";


interface ChallengeListComponentSate {
    challenges:ChallengeItem[]
}

export class ChallengeListComponent extends React.Component<{}, ChallengeListComponentSate> {

    constructor(props: Readonly<{}>|{}) {
        super(props);

        this.state = {
            challenges:[]
        };

        dataService.getAll().then(value =>{
            this.setState({
                ...this.state,
                challenges: value
            })
        });

    }


    getRandomColor() {
        let colors = [
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info'
        ];
        let max =6;
        let index = Math.floor(Math.random() * Math.floor(max));
        return colors[index];
    }

    private addToMyChallenges(challenge: ChallengeItem) {
        dataService.saveToMyChallenge(challenge);
    }


    render () {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/">Challenger</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/challenges">Challenges</Nav.Link>
                    </Nav>
                    <Button variant = {"light"} href="/login"> Log out </Button>
                </Navbar>

                <Container fluid>

                    <Row className="justify-content-md-start">
                        {this.state.challenges.map(value => {
                                return(
                                    <Col md={2}
                                         className ="p-1 mx-1">
                                        <Card bg={this.getRandomColor()}
                                              text={'white'}
                                              style={{ width: '16rem', height: '16rem'}}>
                                            <Card.Body>
                                                <Card.Title>{value.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-light">Day {value.current_day}</Card.Subtitle>
                                                <Card.Text>
                                                    {value.description}
                                                </Card.Text>
                                                <Link to={`/challenge/${value.id}`}>
                                                    <Button variant={"dark"} onClick={event => this.addToMyChallenges(value)}>Start challenge</Button>
                                                </Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                );

                            })
                        }
                    </Row>
                </Container>
            </div>

        );
    }

}