package urania.snippetSystem.http;

public class DeleteStaleSnippetRequest {
	public double daysOld;
	
	public double getDaysOld () { return daysOld; }
	public void setDaysOld (double setDaysOld) { this.daysOld = setDaysOld; }
	
	public DeleteStaleSnippetRequest (double daysOld) {
		this.daysOld = daysOld;
	}
	
	public String toString() {
		return "DeleteStaleSnippets that are (" + daysOld + ") days old";
	}

	public DeleteStaleSnippetRequest () {
	}
}
