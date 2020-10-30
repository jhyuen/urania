package urania.snippetSystem.http;

import java.time.Instant;

import urania.snippetSystem.model.Comment;

public class CreateCommentResponse {
	
  public final String   snippetID;
  public final String   commentID;
  public final Instant  timeStamp;
  public final String   commentText;
  public final int      startLine;
  public final int      startIndex;
  public final int      endLine;
  public final int      endIndex;
  public final String   response;
  public final int      httpCode;

  public CreateCommentResponse(String s, int code) {
    this.snippetID    = "";
    this.commentID    = "";
    this.timeStamp    = Instant.now();
    this.commentText  = "";
    this.startLine    = 0;
    this.startIndex   = 0;
    this.endLine      = 0;
    this.endIndex     = 0;
    this.response     = s;
    this.httpCode     = code;
  }
  
  public CreateCommentResponse(int code) {
    this.snippetID    = "";
    this.commentID    = "";
    this.timeStamp    = Instant.now();
    this.commentText  = "";
    this.startLine    = 0;
    this.startIndex   = 0;
    this.endLine      = 0;
    this.endIndex     = 0;
    this.response     = "Failed to get comment.";
    this.httpCode     = code;
  }

  //201 means success
  public CreateCommentResponse(Comment comment) {
    this.snippetID    = comment.snippetID; 
    this.commentID    = comment.commentID; 
    this.timeStamp    = comment.timeStamp; 
    this.commentText  = comment.commentText;
    this.startLine    = comment.startLine; 
    this.startIndex   = comment.startIndex;
    this.endLine      = comment.endLine;   
    this.endIndex     = comment.endIndex;  
    this.response     = "Created comment with ID: " + comment.commentID;
    this.httpCode     = 201;
  }
  
	public String toString() {
	    return "CreateComment(" + snippetID + ", " + commentText + ", " + startLine +
	        ", " + startIndex + ", " + endLine + ", " + endIndex + ")";
	}
}
