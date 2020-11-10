package urania.snippetSystem.http;

import java.util.ArrayList;
import java.util.List;

import urania.snippetSystem.model.Snippet;

/**
 * In most cases the response is the name of the constant that was being created.
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class ListSnippetResponse {
	public final List<Snippet> list;
	public final String response;
	public final int httpCode;
	
	public ListSnippetResponse (String s, int code) {
		this.list = new ArrayList<Snippet>();
		this.response = s;
		this.httpCode = code;
	}
	
	// 200 means success
	public ListSnippetResponse(List<Snippet> snippets) {
		this.list = snippets;
		this.response = "Got all snippets";
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
