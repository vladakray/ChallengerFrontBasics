import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {ChallengeItem} from "./ChallengeItem";
import {Link, RouteComponentProps} from "react-router-dom";
import {dataService} from "./DataService";
import { ChallengeDayItem } from "./ChallengeDayItem";


interface RouteParams {
    id:string;
}

interface CICProps extends RouteComponentProps<RouteParams> {

}

interface CICState {
    challenge_days: ChallengeDayItem[] ;

}

export class ChallengeInsideComponent extends React.Component<CICProps,CICState> {

    constructor(props: Readonly<CICProps>|CICProps) {
        super(props);
        this.state = {
            challenge_days:[]
        };

        dataService.getById(this.props.match.params.id).then(value => {
            this.setState({
                ...this.state,
                challenge_days:value
                })
        });
    }



    onDoneClicked (day: ChallengeDayItem) {
        let ch_day = this.state.challenge_days.findIndex(item => (item.day === day.day && item.challenge_id === day.challenge_id));
        let array =[...this.state.challenge_days];
        array[ch_day].done = true;
        this.setState({
            ...this.state,
            challenge_days: array
            })
        }

    onFailedClicked (day: ChallengeDayItem) {

        let ch_day = this.state.challenge_days.findIndex(item => (item.day === day.day && item.challenge_id === day.challenge_id));
        let array =[...this.state.challenge_days];
        array[ch_day].done = false;
        this.setState({
            ...this.state,
            challenge_days: array
        })
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

                {this.state.challenge_days && (
                    <p className="h1">h1. Bootstrap heading</p>) &&
                (<Container fluid>
                        <Row className="justify-content-md-start">
                            {this.state.challenge_days.map(value => {
                                return (
                                    <Col sm={4} xs={12} md={2} className="p-2 mx-2 text-center col-3">
                                        <Card bg={value.done === true? 'success':'dark'}
                                              text={'white'}
                                              style={{width: '16rem', height: '16rem'}}>
                                            <Card.Body>
                                                <Card.Title>Day {value.day}</Card.Title>
                                                <Card.Subtitle>Day {value.title}</Card.Subtitle>
                                                <Card.Text
                                                    className="mb-2 text-muted">
                                                    {value.info}
                                                </Card.Text>
                                                </Card.Body>
                                            <Card.Body>
                                                <Button className='mr-1 p-1 align-self-center' variant={"success"}  onClick={event => this.onDoneClicked(value)}>Done</Button>
                                                <Button className='mr-1 p-1 align-self-center' variant={"danger"} onClick={event => this.onFailedClicked(value)}>Failed</Button>
                                            </Card.Body>

                                        </Card>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                )}
            </div>
        )
    }
}