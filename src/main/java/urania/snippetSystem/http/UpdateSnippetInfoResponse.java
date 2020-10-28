package urania.snippetSystem.http;

/**
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */
public class UpdateSnippetInfoResponse {
	public final String response;
	public final int httpCode;
	
	public UpdateSnippetInfoResponse (String s, int code) {
		this.response = s;
		this.httpCode = code;
	}
	
	public UpdateSnippetInfoResponse (int code) {
		this.response = "Failed to update snippet info.";
		this.httpCode = code;
	}
	
	// 200 means success
	public UpdateSnippetInfoResponse(String id) {
		this.response = "Updated snippet info for ID: " + id;
		this.httpCode = 200;
	}
	
	public String toString() {
		return "Response(" + response + ")";
	}
}
