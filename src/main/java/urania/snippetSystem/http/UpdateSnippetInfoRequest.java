package urania.snippetSystem.http;

public class UpdateSnippetInfoRequest {
	public String id;
	public String info;
	
	public String getID() { return id; }
	public void setID(String uuid) { this.id = uuid; }
	
	public String getText() { return info; }
	public void setText(String info) { this.info = info; }
	
	public UpdateSnippetInfoRequest (String uuid, String info) {
		this.id = uuid;
		this.info = info;
	}
	
	public String toString() {
		return "UpdateSnippetInfo(" + id + ", " + info + ")";
	}
	
	// Need a dummy constructor otherwise there are JSON parsing issues
	public UpdateSnippetInfoRequest () {
	}
}
