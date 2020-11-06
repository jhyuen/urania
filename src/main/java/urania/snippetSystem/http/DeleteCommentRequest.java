package urania.snippetSystem.http;

public class DeleteCommentRequest {
    
  public String commentID;
  
  public String getCommentID() { return commentID; }
  public void setCommentID(String uuid) { this.commentID = uuid; }
  
  public String toString() {
    return "DeleteComment(" + commentID + ")";
  }
    
  public DeleteCommentRequest (String commentID)
  { 
    this.commentID    = commentID; 
  }
  
  //Need a dummy constructor otherwise there are JSON parsing issues
  public DeleteCommentRequest () {}
}
