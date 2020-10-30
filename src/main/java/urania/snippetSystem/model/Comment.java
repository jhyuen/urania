package urania.snippetSystem.model;

import java.time.Instant;
import java.util.UUID;

/**
 * In most cases the response is the name of the constant that was being created.
 * 
 * if an error of some sort, then the response describes that error.
 *  
 */

public class Comment {
	public final String snippetID;
	public final String commentID;
	public final Instant timeStamp;
	public final String commentText;
	public int startLine;
	public int startIndex;
	public int endLine;
	public int endIndex;
	
	public Comment (String snippetID, String commentID, String commentText, int sL, int sI, int eL, int eI) {
		this.snippetID = snippetID;
		this.commentID = commentID; //UUID.randomUUID().toString();
		this.timeStamp = Instant.now();
		this.commentText = commentText;
		this.startLine = sL;
		this.startIndex = sI;
		this.endLine = eL;
		this.endIndex = eI;
	}
	
	 public Comment (String snippetID, String commentID, Instant timestamp, String commentText, int sL, int sI, int eL, int eI) {
	    this.snippetID = snippetID;
	    this.commentID = commentID; //UUID.randomUUID().toString();
	    this.timeStamp = timestamp;
	    this.commentText = commentText;
	    this.startLine = sL;
	    this.startIndex = sI;
	    this.endLine = eL;
	    this.endIndex = eI;
	  }
}
