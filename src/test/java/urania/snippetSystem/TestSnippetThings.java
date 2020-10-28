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
//	    	String id = UUID.randomUUID().toString().substring(0, 20); // no more than 20 because of DB restrictions...
//	    	Constant constant = new Constant(id, 14);
	    	String id = UUID.randomUUID().toString();
	    	Snippet snippet = new Snippet(id);
	    	boolean b = sd.createSnippet(snippet);
	    	System.out.println("add constant: " + b);
	    	
	    	// can retrieve it
	    	Snippet s2 = sd.getSnippet(snippet.snippetID);
	    	System.out.println("C2:" + s2.snippetID);
	    	
	    	// can delete it
//	    	assertTrue (cd.deleteConstant(c2));
	    } catch (Exception e) {
	    	fail ("didn't work:" + e.getMessage());
	    }
	}
}
