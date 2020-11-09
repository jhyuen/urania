package urania.snippetSystem.http;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

public class DeleteCommentResponse {
	public final String snippetId;
	public final String snippetInfo;
	public final String snippetText;
	public final Instant timeStamp;
	public final String viewerPassword;
	public final boolean viewerPasswordEnabled;
	public final String languageSelected;
	public final List<Comment> list;
	public final String response;
	public final int httpCode;
	
	public DeleteCommentResponse (String s, int code) {
		this.snippetId = "";
		this.snippetInfo = "";
		this.snippetText = "";
		this.viewerPassword = "";
		this.languageSelected = "";
		this.timeStamp = Instant.now();
		this.viewerPasswordEnabled = false;
		this.list = new ArrayList<Comment>();
		this.response = s;
		this.httpCode = code;
	}
	
	public DeleteCommentResponse (int code) {
		this.snippetId = "";
		this.snippetInfo = "";
		this.snippetText = "";
		this.viewerPassword = "";
		this.languageSelected = "";
		this.timeStamp = Instant.now();
		this.viewerPasswordEnabled = false;
		this.list = new ArrayList<Comment>();
		this.response = "Failed to delete comment.";
		this.httpCode = code;
	}
	
	// 200 means success
	public DeleteCommentResponse(Snippet snippet, List<Comment> comments) {
		this.snippetId = snippet.snippetID;
		this.snippetInfo = snippet.snippetInfo;
		this.snippetText = snippet.snippetText;
		this.viewerPassword = snippet.viewerPassword;
		this.languageSelected = snippet.languageSelected;
		this.timeStamp = snippet.timeStamp;
		this.viewerPasswordEnabled = snippet.viewerPasswordEnabled;
		this.list = comments;
		this.response = "Delete comment in snippet with ID: " + snippet.snippetID;
		this.httpCode = 200;
	}
  
    public String toString() {
        return "DeleteComment(" + response + ")";
    }
}
