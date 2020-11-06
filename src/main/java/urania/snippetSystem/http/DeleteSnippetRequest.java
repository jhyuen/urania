package urania.snippetSystem.http;

public class DeleteSnippetRequest {
	public String id;
	
	public String getID () { return id; }
	public void setID (String newID) { this.id = newID; }
	
	public DeleteSnippetRequest (String uuid) {
		this.id = uuid;
	}
	
	public String toString() {
		return "DeleteSnippet(" + id + ")";
	}

	public DeleteSnippetRequest () {
	}
}
