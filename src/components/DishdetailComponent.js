import React, { Component } from 'react'
import { Loading } from './LoadingComponent';
import {Card, Breadcrumb, BreadcrumbItem, CardImg, CardText, CardTitle,
   Button, Modal, ModalHeader, ModalBody,  Form, FormGroup, Input, Label, Row, Col } from 'reactstrap'
   import { control, LocalForm, Errors, Control } from 'react-redux-form';
   import {Link} from 'react-router-dom';
import FormFeedback from 'reactstrap/lib/FormFeedback';
import { baseUrl } from '../shared/baseUrl';

const maxNameLength = (len) => (val) => !(val) || (val.length <= len)
const minNameLength = (len) => (val) => (val) && (val.length > len)


    // componentDidMount(){
    //     console.log('DishDetail Component componentDidMount invoked')
    // }

    // componentDidUpdate(){
    //     console.log('DishDetail Component componentDidUpdate invoked')
    // }

    class CommentForm extends Component{
        constructor(props)
        {
            super(props)
            this.state = {
                props:props,
                isModalOpen:false,
                yourname: ''
            };
            
            this.RenderComments = this.RenderComments.bind(this);
            this.RenderDish = this.RenderDish.bind(this);
            this.AddComments = this.AddComments.bind(this);
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }

        toggleModal()
        {
            this.setState({
                isModalOpen : !this.state.isModalOpen
            });        
        }
        handleSubmit(values){
            this.state.props.postComment(this.state.props.dish.id, values.rating, values.yourname, values.comment);
        } 
        AddComments(){
            return(
                <React.Fragment>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader isOpen={this.state.isModalOpen} toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Col md={12}>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select  
                                        model=".rating" 
                                        className ="form-control" 
                                        name="rating" id="rating">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                        <Col md={12}>
                            <Label htmlFor="yourname">Your name</Label>
                                    <Control.text  
                                    model=".yourname" 
                                    className ="form-control" 
                                    validators={{minLength:minNameLength(2), maxLength:maxNameLength(15)}}
                                    id="yourname" 
                                    name="yourname" 
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            minLength:"Must be greater than 2 characters",
                                            maxLength:"Must be 15 characters or less"
                                        }}
                                    />
                        </Col> 
                        </Row>
                        <Row className="form-group">
                        <Col md={12}>
                        <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea  
                                    model=".comment" 
                                    className ="form-control" 
                                    id="comment" name="comment" 
                                    rows="6" />
                        </Col>                    
                        </Row>
                        <Button type="submit" value="Submit" color="primary">Submit</Button>
                </LocalForm>
                </ModalBody>
                </Modal>
                <Button outline onClick={this.toggleModal}>
                <span className= "fa fa-pencil"></span>&nbsp; Submit Comment
            </Button>
            </React.Fragment>
            )
        }

    RenderComments(com, addComment, dishId)
    {
        if(com)
        {
           var comments = com.map((comment)=>{
                return(
                    <div key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>--{comment.author}, {new Intl.DateTimeFormat('en-US', {year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </div>)
            })

            return comments;
        }
        else
        {
            return(<div></div>)
        }
    }

    RenderDish(props)
    {
        if(props)
        {
            return (
                    <Card>
                            <CardImg width="100%" src={baseUrl + props.image} alt={props.name} />
                            <CardTitle>
                               <h5>{props.name}</h5>
                            </CardTitle>
                            <CardText>
                                {props.description}
                            </CardText>

                    </Card>
            )
        }
        else
        {
            return (
                <div></div>
            )
        }
    }

    Finalrender(props)
    {
        if(props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );          
        }
        else 
        return(
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>
                            Menu
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {/* {this.props.dish.name} */}
                        {console.log("this.props.dish", this.props.dish)}
                    </BreadcrumbItem>
                </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr/>
                    </div>
                <div className="row">
                    <div className="col-12 col-md-5 mt-1">
                        { this.RenderDish(this.props.dish) }
                    </div>
                    <div className="col-12 col-md-5 mt-1">
                        <h2>Comments</h2>
                        {this.RenderComments(this.props.comment, this.props.AddComment,
                            this.props.dish.id)}
                        {this.AddComments()}
                    </div>
                </div>
            </div>
        )
    }
    render()
    {
       return(this.Finalrender(this.state.props))
    }
 }

export default CommentForm 