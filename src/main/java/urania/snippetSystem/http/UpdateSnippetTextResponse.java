package urania.snippetSystem.http;

/**
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class UpdateSnippetTextResponse {
	public final String response;
	public final int httpCode;
	
	public UpdateSnippetTextResponse (String s, int code) {
		this.response = s;
		this.httpCode = code;
	}
	
	public UpdateSnippetTextResponse (int code) {
		this.response = "Failed to update snippet text.";
		this.httpCode = code;
	}
	
	// 200 means success
	public UpdateSnippetTextResponse(String id) {
		this.response = "Updated snippet text for ID: " + id;
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
