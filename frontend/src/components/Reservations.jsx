import React, { useEffect, useState } from 'react';
import Navbar1 from "./Navbar1.jsx";
import {Container, Heading, Highlight, Table} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "./CarsGrid.jsx";
import {toaster} from "./ui/toaster.jsx";

const Reservations = () => {
    const currentUser = location.state?.currentUser;
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(BASE_URL + "/getreservation", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch reservations");
                }

                const data = await response.json();
                setReservations(data.reservations);
                toaster.success({
                    title:"Yeas🚀",
                    description:"Udało się pobrać twoje dane.",
                    duration: 4000,
                })
            } catch (err) {
                setError(err.message);
                toaster.error({
                    title:"Error",
                    description:"Nie udało się pobrać danych.",
                    duration: 4000,
                })
            } finally {
                setLoading(false);
            }
        };

        fetchReservations();
    }, [navigate]);

    return (
        <>
            <Navbar1 />
            <Container my={4}>
                <Heading size="xl" letterSpacing="tight">
                    <Highlight query="Reservations" styles={{ color: "teal.600" }}>
                      All Reservations
                    </Highlight>
                </Heading>
                <Table.Root variant="simple">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeader>ID</Table.ColumnHeader>
                            <Table.ColumnHeader>Car ID</Table.ColumnHeader>
                            <Table.ColumnHeader>User ID</Table.ColumnHeader>
                            <Table.ColumnHeader>Reservation Date</Table.ColumnHeader>
                            <Table.ColumnHeader>Return Date</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {reservations.map((reservation) => (
                            <Table.Row key={reservation.id}>
                                <Table.Cell>{reservation.id}</Table.Cell>
                                <Table.Cell>{reservation.car_id}</Table.Cell>
                                <Table.Cell>{reservation.user_id}</Table.Cell>
                                <Table.Cell>{new Date(reservation.reservation_date).toLocaleString()}</Table.Cell>
                                <Table.Cell>{new Date(reservation.return_date).toLocaleString()}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Container>
        </>
    );
};

export default Reservations;