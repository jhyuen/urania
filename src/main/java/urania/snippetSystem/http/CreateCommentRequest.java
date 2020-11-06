package urania.snippetSystem.http;

public class CreateCommentRequest {
	
  public String commentID;
  public String commentText;
  public int    startLine;
  public int    startIndex;
  public int    endLine;
  public int    endIndex;
  
  public String getCommentID() { return commentID; }
  public void setCommentID(String uuid) { this.commentID = uuid; }
  
  public String getCommentText() { return commentText; }
  public void setCommentText(String text) { this.commentText = text; }

  public int getStartIndex() { return startIndex; }
  public void setStartIndex(int val) { this.startIndex = val; }
  
  public int getEndLine() { return endLine; }
  public void setEndLine(int val) { this.endLine = val; }

  public int getEndIndex() { return endIndex; }
  public void setEndIndex(int val) { this.endIndex = val; }

	public String toString() {
	    return "CreateComment(" + commentID + ", " + commentText + ", "  + startLine +
	        ", " + startIndex + ", " + endLine + ", " + endIndex + ")";
	}
	
  public CreateCommentRequest (String commentID, String commentText, int startLine,
                               int startIndex, int endLine, int endIndex)
  { 
    this.commentID    = commentID; 
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
