package snippetSystem.model;

import java.util.UUID;

public class Comment {
	public final String snippetID;
	public final String commentID;
	public final String timeStamp;
	public int startLine;
	public int startIndex;
	public int endLine;
	public int endIndex;
	
	public Comment (String snippetID, int sL, int sI, int eL, int eI) {
		this.snippetID = snippetID;
		this.commentID = UUID.randomUUID().toString();
		this.startLine = sL;
		this.startIndex = sI;
		this.endLine = eL;
		this.endIndex = eI;
	}
	
//	public boolean getSystem() { return system; }
//	public void setSystem(boolean s) { system = s; }
	
	/**
	 * Equality of Comments determined by name alone.
	 */
//	public boolean equals (Object o) {
//		if (o == null) { return false; }
//		
//		if (o instanceof Comment) {
//			Comment other = (Comment) o;
//			return name.equals(other.name);
//		}
//		
//		return false;  // not a Comment
//	}
}
