package urania.snippetSystem.http;

import java.time.Instant;

import urania.snippetSystem.model.Snippet;

/**
 * In most cases the response is the name of the constant that was being created.
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class DeleteSnippetResponse {
	public final String response;
	public final int httpCode;
	
	public DeleteSnippetResponse (String s, int code) {
		this.response = s;
		this.httpCode = code;
	}
	
	public DeleteSnippetResponse (int code) {
		this.response = "Failed to delete snippet.";
		this.httpCode = code;
	}
	
	// 200 means success
	public DeleteSnippetResponse(String uuid) {
		this.response = "Deleted snippet with ID: " + uuid;
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
