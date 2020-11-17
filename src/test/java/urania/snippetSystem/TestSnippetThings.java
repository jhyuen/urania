package urania.snippetSystem;


import static org.junit.Assert.*;

import java.util.List;
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
			fail ("couldn't update snippet info: " + e.getMessage());
		}
	}

	@Test
	public void testEnableSnippetPassword() {
		SnippetDAO sd = new SnippetDAO();
		try {
			// update snippet to enable password 
			boolean b = sd.enableSnippetPassword("abcd123", true);
	    	assertTrue (b);
	    	
	    	// Check that password is enabled
	    	Snippet snippet = sd.getSnippet("abcd123");
	    	System.out.println("Updated Snippet: " + snippet.snippetID + " - enablePassowrd => " + snippet.viewerPasswordEnabled);
	    	assertTrue (snippet.viewerPasswordEnabled);
	    	
	    	// change snippet "abcd123" back to viewer password disabled
			b = sd.enableSnippetPassword("abcd123", false);
	    	assertTrue (b);
	    	
	    	// Check that password is disabled
	    	snippet = sd.getSnippet("abcd123");
	    	System.out.println("Updated Snippet: " + snippet.snippetID + " - enablePassowrd => " + snippet.viewerPasswordEnabled);
	    	assertFalse (snippet.viewerPasswordEnabled);
			
		} catch (Exception e) {
			fail ("couldn't enable snippet password: " + e.getMessage());
		}
	}

	@Test
	public void testDeleteSnippet() {
		SnippetDAO sd = new SnippetDAO();
		try {
			// Get a non-existent snippet "DNE_Snippet"
	    	Snippet snippet = sd.getSnippet("DNE_Snippet");
	    	assertEquals (snippet, null);

	    	// Create "DNE_Snippet"
	    	Snippet dne_snippet = new Snippet("DNE_Snippet");
	    	boolean b = sd.createSnippet(dne_snippet);
	    	assertTrue (b);
	    	
	    	// Check that "DNE_Snippet" was created
	    	snippet = sd.getSnippet("DNE_Snippet");
	    	assertNotEquals (snippet, null);
	    	
	    	// Delete Snippet
	    	b = sd.deleteSnippet("DNE_Snippet");
	    	assertTrue (b);

			// Get a non-existent snippet "DNE_Snippet"
	    	snippet = sd.getSnippet("DNE_Snippet");
	    	assertEquals (snippet, null);
			
		} catch (Exception e) {
			fail ("couldn't create/delete snippet: " + e.getMessage());
		}
	}
	
	@Test
	public void testGetAllSnippets() {
		SnippetDAO sd = new SnippetDAO();
		try {
			// Get all snippets
	    	List<Snippet> allSnippets = sd.getAllSnippets();

			boolean hasABCD123 = false;
			boolean hasShinesSnippet = false;
			boolean hasEFGH = false;
			for (Snippet s : allSnippets) {
				System.out.println("found snippet " + s.snippetID);
				if (s.snippetID.equals("abcd123")) { hasABCD123 = true; }
				if (s.snippetID.equals("shinessnippet")) { hasShinesSnippet = true; }
				if (s.snippetID.equals("efgh")) { hasEFGH = true; }
			}

			assertTrue("abcd123 Needs to exist in the snippet table for this test case to work.", hasABCD123);
			assertTrue("shinessnippet Needs to exist in the snippet table (from tutorial) for this test case to work.", hasShinesSnippet);
			assertTrue("efgh Needs to exist in the snippet table (from tutorial) for this test case to work.", hasEFGH);
			
		} catch (Exception e) {
			fail ("couldn't list all snippets: " + e.getMessage());
		}
		
	}
}
