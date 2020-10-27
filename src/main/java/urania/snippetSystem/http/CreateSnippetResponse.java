package urania.snippetSystem.http;

/**
 * In most cases the response is the name of the constant that was being created.
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class CreateSnippetResponse {
	public final String response;
	public final int httpCode;
	
	public CreateSnippetResponse (String s, int code) {
		this.response = s;
		this.httpCode = code;
	}
	
	public CreateSnippetResponse (int code) {
		this.response = "Failed to create a new snippet.";
		this.httpCode = code;
	}
	
	// 200 means success
	public CreateSnippetResponse(String id) {
		this.response = "Created a new snippet with ID: " + id;
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
