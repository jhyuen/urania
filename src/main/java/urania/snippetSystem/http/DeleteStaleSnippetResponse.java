package urania.snippetSystem.http;

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
public class DeleteStaleSnippetResponse {
	
	public final List<Snippet> list;
	public final String response;
	public final int httpCode;
	
	public DeleteStaleSnippetResponse (String s, int code) {
		this.list = new ArrayList<Snippet>();
		this.response = s;
		this.httpCode = code;
	}
	
	public DeleteStaleSnippetResponse (int code) {
		this.list = new ArrayList<Snippet>();
		this.response = "Failed to delete stale snippets.";
		this.httpCode = code;
	}
	
	// 200 means success
	public DeleteStaleSnippetResponse (String daysOld, List<Snippet> snippets) {
		this.list = snippets;
		this.response = "Deleted snippets that are " + daysOld + " days old";
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
