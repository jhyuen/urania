package urania.snippetSystem.http;

public class EnableSnippetPasswordRequest {
	public String id;
	public Boolean enable;
	
	public String getID() { return id; }
	public void setID(String uuid) { this.id = uuid; }
	
	public Boolean getEnable() { return enable; }
	public void setEnable(Boolean enable) { this.enable = enable; }
	
	public EnableSnippetPasswordRequest (String uuid, Boolean enable) {
		this.id = uuid;
		this.enable = enable;
	}
	
	public String toString() {
		return "EnableSnippetPassword(" + id + ", " + enable + ")";
	}
	
	// Need a dummy constructor otherwise there are JSON parsing issues
	public EnableSnippetPasswordRequest () {
	}
}
