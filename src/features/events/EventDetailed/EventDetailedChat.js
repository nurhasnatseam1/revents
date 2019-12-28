import React,{Component,Fragment} from 'react';
import {Segment,Header,Comment} from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';
import {Link} from 'react-router-dom';
import {formatDistance} from 'date-fns';



class EventDetailedChat extends Component{
      state={
            showReplyForm:false,
            selectedCommentId:null
      }

      handleOpenReplyForm=id=>{
            this.setState({showReplyForm:true,selectedCommentId:id})
      }
      handleCloseReplyForm=()=>{
            this.setState({selectedCommentId:null,showReplyForm:false})
      }

      render(){
            const {addEventComment,eventId,eventChat}=this.props;
            const {showReplyForm,selectedCommentId}=this.state
            return(
                  <Fragment>
                        <Segment textAlign='center' attached='top' inverted color='teal' style={{border:'none'}} >
                              <Header>Chat about this event</Header>
                        </Segment>
                        <Segment attached >
                              <Comment.Group>
                                    {eventChat && eventChat.map(comment=>{
                                          return (
                                                <Comment key={comment.id}>
                                                      <Comment.Avatar src={comment.photoURL || '/assets/user.png'}/>
                                                      <Comment.Conent>
                                                            <Comment.Author as={Link} to={`/profile/${comment.id}`}></Comment.Author>
                                                            {comment.displayName}
                                                            <Comment.Metadata>
                                                             <div>{formatDistance(comment.date,Date.now())} ago</div>
                                                            </Comment.Metadata>
                                                            <Comment.Text>{comment.text}</Comment.Text>
                                                            <Comment.Actions>
                                                                  <Comment.Action onClick={this.handleOpenReplyForm(comment.id)}>Reply</Comment.Action>
                                                                  {showReplyForm && selectedCommentId === comment.id  && (
                                                                        <EventDetailedChatForm addEventComment={addEventComment} eventId={eventId} form={`reply_${comment.id}`} closeForm={this.handleCloseReplyForm} parentId={comment.id}></EventDetailedChatForm>
                                                                  )}
                                                            </Comment.Actions>
                                                      </Comment.Conent>
                                                      {comment.childNodes && comment.childNodes.map(child=>(
                                                            <Comment.Group key={child.id}>
                                                                  <Comment>
                                                                        <Comment.Avatar src={child.photoURL||'/assets/user.png'}/>
                                                                        <Comment.Author as={Link} to={`/profile/${child.uid}`}>{child.displayName}</Comment.Author>
                                                                        <Comment.Metadata>
                                                                              <div>
                                                                                    {formatDistance(child.date,Date.now())} ago
                                                                              </div>
                                                                        </Comment.Metadata>
                                                                        <Comment.Text>{child.text}</Comment.Text>
                                                                        <Comment.Actions>
                                                                              <Comment.Action onClick={this.handleOpenReplyForm(child.id)}>Reply</Comment.Action>
                                                                              {showReplyForm && selectedCommentId ===child.id && (
                                                                                    <EventDetailedChatForm addEventComment={addEventComment} eventId={eventId} form={`reply_${child.id}`} closeForm={this.handleCloseReplyForm} parentid={child.parentId} ></EventDetailedChatForm>
                                                                              )}
                                                                        </Comment.Actions>
                                                                  </Comment>
                                                            </Comment.Group>
                                                      ))}
                                                </Comment>
                                          )

                                    })}
                              </Comment.Group>
                              <EventDetailedChatForm addEventCommnet={addEventComment} eventId={eventId} form={'newComment'} parentId={0}/>
                        </Segment>
                  </Fragment>
            )
      }
}

export default EventDetailedChat;