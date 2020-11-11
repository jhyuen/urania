package urania.snippetSystem.http; 
import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Comment;

public class CreateCommentResponse {

  public final List<Comment> list;
  public final String   response;
  public final int      httpCode;

  public CreateCommentResponse(String s, int code) {
	this.list = new ArrayList<Comment>();
    this.response     = s;
    this.httpCode     = code;
  }
  
  public CreateCommentResponse(int code) {
	this.list = new ArrayList<Comment>();
    this.response     = "Failed to get comments.";
    this.httpCode     = code;
  }

  //201 means success
  public CreateCommentResponse(List<Comment> comments) {
	this.list = comments;
    this.response     = "Got comments with the same id";
    this.httpCode     = 201;
  }
  
  public String toString() {
	return "CreateComment(" + response + ")";
  }
}
