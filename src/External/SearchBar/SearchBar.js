import React,{Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal : '',
        }
    }

    onSubmit = () => {
        // console.log(this.state.inputVal);
        this.props.parentCallback(this.state.inputVal);
    };

    render(){
        return(
            <div style={{maxWidth: "50rem", margin: "auto", textAlign: "center"}}>
                Please Connect Wallet to View Tokens Or Search For An Address Below
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={this.textInput} placeholder="Enter Ethereum Address" onChange={e => this.setState({ inputVal: e.target.value })} type="text"/>
                        <Form.Text className="text-muted" style={{wordWrap: 'break-word'}}>
                            I.E. 0xd6a984153acb6c9e2d788f08c2465a1358bb89a7
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" onClick={this.onSubmit}>
                        Submit
                    </Button>
                </Form>
            </div>
        )
    }
}

export default SearchBar;