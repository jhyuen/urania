package urania.snippetSystem.http;

public class GetSnippetRequest {
	
	public String SnippetID;
	
	public String getID () { return SnippetID; }
	public void setID (String newID) { this.SnippetID = newID; }
	
	public GetSnippetRequest (String uuid) {
		this.SnippetID = uuid;
	}
	
	public String toString() {
		return "CreateSnippet(" + SnippetID + ")";
	}

	public GetSnippetRequest () {
	}
}
