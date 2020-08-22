import React from 'react';
import { Form, Row, Col, Card } from 'react-bootstrap';
import './index.less';
import { config } from '../../../../globalConfig';

interface state {
    doctorList: any[];
}

export default class page extends React.Component<{}, state> {
    department: string = '内科';

    constructor(props: {}) {
        super(props);
        this.state = {
            doctorList: []
        }
    }

    getDoctorList = () => {
        fetch(config.domain + "userGetDoctorListDetail", {
            method: 'POST',
            body: JSON.stringify({
                department: this.department
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then(val => {
            this.setState(() => ({
                doctorList: val,
            }))
        })
    }

    selectDepart = (event: any) => {
        let depart = event.target.value;
        this.department = depart;
        this.getDoctorList();
    }

    componentDidMount() {
        this.getDoctorList();
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
    }
    render() {
        return (
            <div className="second-container">
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Form.Group as={Row} style={{ margin: '0' }}>
                        <Form.Label column sm={{ span: 2, offset: 2 }}>
                            请选择科室:
                        </Form.Label>
                        <Col sm={8}>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Control as="select" onChange={this.selectDepart}>
                                    {config.department.map(el => {
                                        return (
                                            <option key={el}>{el}</option>
                                        )
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Form.Group>
                </Form>
                <div className="doctor-info">
                    {
                        this.state.doctorList.map(el => {
                            return (
                                <Card className="card">
                                    <Card.Img variant="top" src={config.domain + el.url} />
                                    <Card.Body>
                                        <Card.Title>{el.name}医生</Card.Title>
                                        <Card.Text>
                                            {el.des}<br />
                                            联系方式：{el.contact}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}