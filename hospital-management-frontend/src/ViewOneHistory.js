import React, { Component } from 'react';
import { withRouter } from './withRouter'; // Import withRouter helper

import {
    Box,
    Heading,
    Grommet,
    Table,
    TableBody,
    TableCell,
    TableRow
} from 'grommet';

import './App.css';

const theme = {
    global: {
        colors: {
            brand: '#000000',
            focus: '#000000'
        },
        font: {
            family: 'Lato',
        },
    },
};

export class ViewOneHistory extends Component {
    state = { medhiststate: [], medhiststate2: []}

    componentDidMount() {
        const { email } = this.props.params;  // Access params from props
        this.allDiagnoses(email);
        this.getHistory(email);
    }

    async getHistory(email) {
        let emailQuery = encodeURIComponent(email); // URL encode email to avoid issues
        try {
            const response = await fetch(`http://localhost:3001/OneHistory?patientEmail=${emailQuery}`);
            const data = await response.json();
            console.log('History Data:', data); // Log the response for debugging
            this.setState({ medhiststate: data.data });
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    }

    async allDiagnoses(email) {
        let emailQuery = encodeURIComponent(email); // URL encode email to avoid issues
        try {
            const response = await fetch(`http://localhost:3001/allDiagnoses?patientEmail=${emailQuery}`);
            const data = await response.json();
            console.log('Diagnoses Data:', data); // Log the response for debugging
            this.setState({ medhiststate2: data.data });
        } catch (error) {
            console.error('Error fetching diagnoses:', error);
        }
    }

    render() {
        const { medhiststate, medhiststate2 } = this.state;

        const Header = () => (
            <Box
                tag='header'
                background='brand'
                pad='small'
                elevation='small'
                justify='between'
                direction='row'
                align='center'
                flex={false}
            >
                <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>HMS</Heading></a>
            </Box>
        );

        const Body = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    {medhiststate.length === 0 ? (
                        <p>No History Data Available</p>
                    ) : (
                        medhiststate.map((patient, index) =>
                            <Table key={index}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Name</strong>
                                        </TableCell>
                                        <TableCell>{patient.name}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell><strong>Email</strong></TableCell>
                                        <TableCell>{patient.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Gender</strong>
                                        </TableCell>
                                        <TableCell>{patient.gender}</TableCell>
                                        <TableCell />
                                        <TableCell><strong>Address</strong></TableCell>
                                        <TableCell>{patient.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Conditions</strong>
                                        </TableCell>
                                        <TableCell>{patient.conditions}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Surgeries</strong>
                                        </TableCell>
                                        <TableCell>{patient.surgeries}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell scope="row">
                                            <strong>Medications</strong>
                                        </TableCell>
                                        <TableCell>{patient.medication}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        )
                    )}
                </div>
                <hr />
            </div>
        );

        const Body2 = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    {medhiststate2.length === 0 ? (
                        <p>No Diagnoses Data Available</p>
                    ) : (
                        medhiststate2.map((patient, index) =>
                            <div key={index}>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell scope="row">
                                                <strong>Date</strong>
                                            </TableCell>
                                            <TableCell>{patient.date.split('T')[0]}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell><strong>Doctor</strong></TableCell>
                                            <TableCell>{patient.doctor}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell scope="row">
                                                <strong>Concerns</strong>
                                            </TableCell>
                                            <TableCell>{patient.concerns}</TableCell>
                                            <TableCell />
                                            <TableCell><strong>Symptoms</strong></TableCell>
                                            <TableCell>{patient.symptoms}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell scope="row">
                                                <strong>Diagnosis</strong>
                                            </TableCell>
                                            <TableCell>{patient.diagnosis}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell scope="row">
                                                <strong>Prescription</strong>
                                            </TableCell>
                                            <TableCell>{patient.prescription}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <hr />
                            </div>
                        )
                    )}
                </div>
            </div>
        );

        return (
            <Grommet full={true} theme={theme}>
                <Box fill={true}>
                    <Header />
                    <Body />
                    <Body2 />
                </Box>
            </Grommet>
        );
    }
}

export default withRouter(ViewOneHistory); // Wrap with withRouter to use params
