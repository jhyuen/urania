package urania.snippetSystem.http;

public class UpdateSnippetTextRequest {
	public String id;
	public String text;
	
	public String getID() { return id; }
	public void setID(String uuid) { this.id = uuid; }
	
	public String getText() { return text; }
	public void setText(String text) { this.text = text; }
	
	public UpdateSnippetTextRequest (String uuid, String text) {
		this.id = uuid;
		this.text = text;
	}
	
	public String toString() {
		return "UpdateSnippetText(" + id + ", " + text + ")";
	}
	
	// Need a dummy constructor otherwise there are JSON parsing issues
	public UpdateSnippetTextRequest () {
	}
}
