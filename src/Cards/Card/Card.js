import React from 'react';
import './Card.css';
import Card from 'react-bootstrap/Card';

const Bootstrapcard = (props) => {
    return(
    <div id = {props.id}>
        <Card className="Card">
        <Card.Img style={{width: '25%', margin: 'auto', paddingTop: '15px'}} src={props.img}></Card.Img>
            <Card.Body>
                <Card.Title style={{wrap: 'nowrap'}}><h3>{props.name}</h3></Card.Title>
                <Card.Title><h5>Market Cap Rank: {props.rank}</h5></Card.Title>
            </Card.Body>
        </Card>
    </div>
    )
}

export default Bootstrapcard;