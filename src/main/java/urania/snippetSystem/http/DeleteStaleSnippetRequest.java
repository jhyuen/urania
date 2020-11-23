package urania.snippetSystem.http;

public class DeleteStaleSnippetRequest {
	public int daysOld;
	
	public int getDaysOld () { return daysOld; }
	public void setDaysOld (int setDaysOld) { this.daysOld = setDaysOld; }
	
	public DeleteStaleSnippetRequest (int daysOld) {
		this.daysOld = daysOld;
	}
	
	public String toString() {
		return "DeleteStaleSnippets that are (" + daysOld + ") days old";
	}

	public DeleteStaleSnippetRequest () {
	}
}
