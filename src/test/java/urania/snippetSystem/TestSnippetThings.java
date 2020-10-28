package urania.snippetSystem;


import static org.junit.Assert.*;

import java.util.UUID;

import org.junit.Test;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.model.Snippet;

public class TestSnippetThings {

	@Test
	public void testFindSnippet() {
	    SnippetDAO sd = new SnippetDAO();
	    try {
	    	Snippet snippet = sd.getSnippet("asfedv");
	    	System.out.println("snippet " + snippet.snippetID + " => " + snippet.snippetText + " => " + snippet.timeStamp);
	    } catch (Exception e) {
	    	fail ("didn't work:" + e.getMessage());
	    }
	}
	
	@Test
	public void testCreateSnippet() {
	    SnippetDAO sd = new SnippetDAO();
	    try {
	    	// can add it
	    	String id = UUID.randomUUID().toString();
	    	Snippet snippet = new Snippet(id);
	    	boolean b = sd.createSnippet(snippet);
	    	System.out.println("add constant: " + b);
	    	assertTrue (b);
	    	
	    	// can retrieve it
	    	Snippet s2 = sd.getSnippet(snippet.snippetID);
	    	System.out.println("C2:" + s2.snippetID);
	    	
	    	// can delete it
	    	assertTrue (sd.deleteSnippet(id));
	    } catch (Exception e) {
	    	fail ("didn't work:" + e.getMessage());
	    }
	}
	
	@Test
	public void testUpdateSnippetText() {
		SnippetDAO sd = new SnippetDAO();
		try {
			// change snippet "abcd123" to have snippet text "updated text"
			boolean b = sd.updateSnippetText("abcd123", "updated text");
	    	assertTrue (b);
	    	
	    	// Check that text is changed
	    	Snippet snippet = sd.getSnippet("abcd123");
	    	System.out.println("Updated Snippet: " + snippet.snippetID + " - text => " + snippet.snippetText);
	    	assertEquals ("updated text", snippet.snippetText);
	    	
	    	// change snippet "abcd123" back to "original text"
			b = sd.updateSnippetText("abcd123", "original text");
	    	assertTrue (b);
			
		} catch (Exception e) {
			fail ("couldn't update snippet text: " + e.getMessage());
		}
	}

	@Test
	public void testUpdateSnippetInfo() {
		SnippetDAO sd = new SnippetDAO();
		try {
			// change snippet "abcd123" to have snippet text "updated text"
			boolean b = sd.updateSnippetInfo("abcd123", "updated info");
	    	assertTrue (b);
	    	
	    	// Check that text is changed
	    	Snippet snippet = sd.getSnippet("abcd123");
	    	System.out.println("Updated Snippet: " + snippet.snippetID + " - text => " + snippet.snippetInfo);
	    	assertEquals ("updated info", snippet.snippetInfo);
	    	
	    	// change snippet "abcd123" back to "original text"
			b = sd.updateSnippetText("abcd123", "original info");
	    	assertTrue (b);
			
		} catch (Exception e) {
			fail ("couldn't update snippet text: " + e.getMessage());
		}
	}
}
