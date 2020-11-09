package urania.snippetSystem.http;

public class DeleteCommentRequest {
    
  public String snippetID;
  public String commentID;
  
  public String getSnippetID() { return snippetID; }
  public void setSnippetID(String uuid) { this.snippetID = uuid; }

  public String getCommentID() { return commentID; }
  public void setCommentID(String uuid) { this.commentID = uuid; }
  
  public String toString() {
    return "DeleteComment(" + commentID + ")";
  }
    
  public DeleteCommentRequest (String snippetID, String commentID)
  { 
	this.snippetID    = snippetID;
    this.commentID    = commentID; 
  }
  
  //Need a dummy constructor otherwise there are JSON parsing issues
  public DeleteCommentRequest () {}
}
