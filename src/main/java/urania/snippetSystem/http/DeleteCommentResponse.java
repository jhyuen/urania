package urania.snippetSystem.http;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

public class DeleteCommentResponse {
	
	public final List<Comment> list;
	public final String   response;
	public final int      httpCode;
	
	public DeleteCommentResponse (String s, int code) {
		this.list = new ArrayList<Comment>();
	    this.response     = s;
	    this.httpCode     = code;
	}
	
	public DeleteCommentResponse (int code) {
		this.list = new ArrayList<Comment>();
	    this.response     = "Failed to get comments.";
	    this.httpCode     = code;
	}
	
	// 200 means success
	public DeleteCommentResponse(Snippet snippet, List<Comment> comments) {
		this.list = comments;
	    this.response     = "Got comments with the same id";
	    this.httpCode     = 201;
	}
  
    public String toString() {
        return "DeleteComment(" + response + ")";
    }
}
