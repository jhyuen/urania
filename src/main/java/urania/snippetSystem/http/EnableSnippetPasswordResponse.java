package urania.snippetSystem.http;

/**
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class EnableSnippetPasswordResponse {
	public final String response;
	public final int httpCode;
	
	public EnableSnippetPasswordResponse (String s, int code) {
		this.response = s;
		this.httpCode = code;
	}
	
	public EnableSnippetPasswordResponse (int code) {
		this.response = "Failed to update snippet password selection.";
		this.httpCode = code;
	}
	
	// 200 means success
	public EnableSnippetPasswordResponse(String id) {
		this.response = "Updated snippet password selection for ID: " + id;
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
