package urania.snippetSystem.http;

public class CreateCommentRequest {
	
  public String snippetID;
  public String commentText;
  public int    startLine;
  public int    startIndex;
  public int    endLine;
  public int    endIndex;
  
  public String getSnippetID() { return snippetID; }
  public void setSnippetID(String uuid) { this.snippetID = uuid; }
  
  public String getCommentText() { return commentText; }
  public void setCommentText(String text) { this.commentText = text; }

  public int getStartIndex() { return startIndex; }
  public void setStartIndex(int val) { this.startIndex = val; }
  
  public int getEndLine() { return endLine; }
  public void setEndLine(int val) { this.endLine = val; }

  public int getEndIndex() { return endIndex; }
  public void setEndIndex(int val) { this.endIndex = val; }

	public String toString() {
	    return "CreateComment(" + snippetID + ", " + commentText + ", "  + startLine +
	        ", " + startIndex + ", " + endLine + ", " + endIndex + ")";
	}
	
  public CreateCommentRequest (String snippetID, String commentText, int startLine,
                               int startIndex, int endLine, int endIndex)
  { 
    this.snippetID    = snippetID; 
    this.commentText  = commentText;
    this.startLine    = startLine; 
    this.startIndex   = startIndex;
    this.endLine      = endLine;   
    this.endIndex     = endIndex;  
  }
	
	//Need a dummy constructor otherwise there are JSON parsing issues
	public CreateCommentRequest () {
	}
}
