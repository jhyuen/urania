package snippetSystem.model;

import java.util.UUID;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Snippet {
	public final String snippetID;
	public String snippetText;
	public String snippetInfo;
	public final String timeStamp;
	public String languageSelected;
	private final String viewerPassword;
	public boolean viewerPasswordEnabled;
	
	public Snippet(String uuid) {
		this.snippetID = uuid;
		this.viewerPassword = UUID.randomUUID().toString();
		this.viewerPasswordEnabled = false;
		this.snippetText = "";
		this.snippetInfo = "";
		this.timeStamp = generateTimestamp();
	}
	
	public Snippet (String snippetText, String snippetInfo) {
		this.snippetID = UUID.randomUUID().toString();
		this.viewerPassword = UUID.randomUUID().toString();
		this.viewerPasswordEnabled = false;
		this.snippetText = snippetText;
		this.snippetInfo = snippetInfo;
		this.timeStamp = generateTimestamp();
	}
	
	private String generateTimestamp () {
		String timestamp;
		LocalDateTime ldt = LocalDateTime.now();
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("mm-dd-uuuu HH:mm:ss");
		timestamp = ldt.format(formatter);
		return timestamp;
	}
	
//	public boolean getSystem() { return system; }
//	public void setSystem(boolean s) { system = s; }
	
	/**
	 * Equality of Constants determined by name alone.
	 */
//	public boolean equals (Object o) {
//		if (o == null) { return false; }
//		
//		if (o instanceof Constant) {
//			Constant other = (Constant) o;
//			return name.equals(other.name);
//		}
//		
//		return false;  // not a Constant
//	}
}
