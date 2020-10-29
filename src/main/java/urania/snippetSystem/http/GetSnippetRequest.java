package urania.snippetSystem.http;

public class GetSnippetRequest {
	
	public String id;
	
	public String getID () { return id; }
	public void setID (String newID) { this.id = newID; }
	
	public GetSnippetRequest (String uuid) {
		this.id = uuid;
	}
	
	public String toString() {
		return "CreateSnippet(" + id + ")";
	}

	public GetSnippetRequest () {
	}
}
