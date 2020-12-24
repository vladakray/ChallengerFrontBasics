import React from "react";
import Nav from "react-bootstrap/esm/Nav";
import Navbar from "react-bootstrap/esm/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, CardDeck, Col, Container, Row } from "react-bootstrap";
import {dataService} from "./DataService";
import { ChallengeItem } from "./ChallengeItem";
import {ChallengeDayItem} from "./ChallengeDayItem";
import { Link } from "react-router-dom";


interface HomeListComponentSate {
    my_challenges:ChallengeItem[];
    challenge_days: ChallengeDayItem[]
}

export class HomeListComponent extends React.Component<{}, HomeListComponentSate> {

    constructor(props: Readonly<{}>|{}) {
        super(props);

        this.state = {
            my_challenges:[],
            challenge_days:[]
        };

        dataService.getMyAll().then(value =>{
            this.setState({
                ...this.state,
                my_challenges: value
            })
        });

        dataService.getAllChallengeDays().then( value => {
            this.setState({
                ...this.state,
                challenge_days: value
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

    removeChallenge(challenge: ChallengeItem) {
        dataService.dropMyChallenge(challenge);
        dataService.getMyAll().then(value => {
            this.setState({
                ...this.state,
                my_challenges: value
            })
        });
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
                        {this.state.my_challenges.map(value => {
                                return(
                                    <Col md={2}
                                         className ="p-1 mx-1">
                                        <Card border={this.getRandomColor()}
                                              text={'dark'}
                                              style={{ width: '16rem', height: '16rem'}}>
                                            <Card.Body>
                                                <Card.Title>{value.title}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">Day {value.current_day}</Card.Subtitle>
                                                <Card.Text>
                                                    {value.description}
                                                </Card.Text>
                                                <Link to={`/challenge/${value.id}`}>
                                                    <Button className="p-1 m-1" variant={"info"} >What's for today?</Button>
                                                </Link>
                                                <Button className="p-1 m-1" variant={"secondary"} onClick={event => this.removeChallenge(value)}>Drop challenge</Button>

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