import React from 'react';
import './Card.css';
import Card from 'react-bootstrap/Card';

const Bootstrapcard = (props) => (

    //Bootstrap card functional component displaying picture, name, and rank
    <div id = {props.id} onClick={props.clicked}>
        <Card className="Card">
        <Card.Img style={{width: '25%', margin: 'auto', paddingTop: '15px'}} src={props.img}></Card.Img>
            <Card.Body style={{whiteSpace: 'nowrap'}}>
                <Card.Title>{props.name}</Card.Title>
                <Card.Title>Market Cap Rank: {props.rank}</Card.Title>
            </Card.Body>
        </Card>
    </div>
)


export default Bootstrapcard; 