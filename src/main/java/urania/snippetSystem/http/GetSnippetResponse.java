package urania.snippetSystem.http;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

/**
 * In most cases the response is the name of the constant that was being created.
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class GetSnippetResponse {
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
	
	public GetSnippetResponse (String s, int code) {
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
	
	public GetSnippetResponse (int code) {
		this.snippetId = "";
		this.snippetInfo = "";
		this.snippetText = "";
		this.viewerPassword = "";
		this.languageSelected = "";
		this.timeStamp = Instant.now();
		this.viewerPasswordEnabled = false;
		this.list = new ArrayList<Comment>();
		this.response = "Failed to get snippet.";
		this.httpCode = code;
	}
	
	// 201 means success
	public GetSnippetResponse(Snippet snippet, List<Comment> comments) {
		this.snippetId = snippet.snippetID;
		this.snippetInfo = snippet.snippetInfo;
		this.snippetText = snippet.snippetText;
		this.viewerPassword = snippet.viewerPassword;
		this.languageSelected = snippet.languageSelected;
		this.timeStamp = snippet.timeStamp;
		this.viewerPasswordEnabled = snippet.viewerPasswordEnabled;
		this.list = comments;
		this.response = "Got snippet with ID: " + snippet.snippetID;
		this.httpCode = 201;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
