package urania.snippetSystem;


import static org.junit.Assert.*;

import java.util.List;
import java.util.UUID;

import org.junit.Test;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

public class TestCommentDAO {

	@Test
	public void testFindComment() {
	    CommentDAO cd = new CommentDAO();
	    try {
			Comment testComment = new Comment("testSnippetId", "testCommentId", "testCommentText", 0, 0, 1, 1);
			cd.createComment(testComment);
	    	Comment comment = cd.getComment("testCommentId");
	    	System.out.println("comment " + comment.snippetID + " => " + comment.commentID + " => " + comment.commentText);
	    	cd.deleteCommentCommentID("testCommentId");
	    } catch (Exception e) {
	    	fail ("didn't work:" + e.getMessage());
	    }
	}
	
	@Test
	public void testCreateComment() {
		CommentDAO cd = new CommentDAO();
	    try {
	    	// can add it
	    	Comment testComment = new Comment("testSnippetId", "testCommentId", "testCommentText", 0, 0, 1, 1);
	    	assertTrue(cd.createComment(testComment));
	    	
	    	// can retrieve it
	    	Comment comment = cd.getComment(testComment.commentID);
	    	assertEquals("testSnippetId", comment.snippetID);
	    	assertEquals("testCommentId", comment.commentID);
	    	assertEquals("testCommentText", comment.commentText);
	    	assertEquals(0, comment.startLine);
	    	assertEquals(0, comment.startIndex);
	    	assertEquals(1, comment.endLine);
	    	assertEquals(1, comment.endIndex);
	    	
	    	// can delete it
	    	assertTrue (cd.deleteCommentSnippetID("testSnippetId"));
	    } catch (Exception e) {
	    	fail ("didn't work:" + e.getMessage());
	    }
	}
	
	@Test
	public void testDeleteCommentCommentID() {
		CommentDAO cd = new CommentDAO();
		try {
			// Get a non-existent comment "DNE_Comment"
	    	Comment comment= cd.getComment("DNE_Comment");
	    	assertEquals(comment, null);

	    	// Create test comment
	    	Comment test_comment = new Comment("testSnippetId", "testCommentId", "testCommentText", 0, 0, 1, 1);
	    	assertTrue (cd.createComment(test_comment));
	    	
	    	// Check that test comment was created
	    	comment = cd.getComment("testCommentId");
	    	assertNotEquals (comment, null);
	    	
	    	// Delete Comment
	    	assertTrue(cd.deleteCommentCommentID("testCommentId"));

			// Get a non-existent test comment
	    	comment = cd.getComment("testCommentId");
	    	assertEquals (comment, null);
			
		} catch (Exception e) {
			fail ("couldn't create/delete comment: " + e.getMessage());
		}
	}
	
	@Test
	public void testDeleteCommentSnippetID() {
		CommentDAO cd = new CommentDAO();
		try {
			// Get a non-existent comment "DNE_Comment"
	    	Comment comment= cd.getComment("DNE_Comment");
	    	assertEquals(comment, null);

	    	// Create test comment
	    	Comment test_comment = new Comment("testSnippetId", "testCommentId", "testCommentText", 0, 0, 1, 1);
	    	assertTrue (cd.createComment(test_comment));
	    	
	    	// Check that test comment was created
	    	comment = cd.getComment("testCommentId");
	    	assertNotEquals (comment, null);
	    	
	    	// Delete Comment
	    	assertTrue(cd.deleteCommentSnippetID("testSnippetId"));

			// Get a non-existent test comment
	    	comment = cd.getComment("testCommentId");
	    	assertEquals (comment, null);
			
		} catch (Exception e) {
			fail ("couldn't create/delete snippet: " + e.getMessage());
		}
	}
	
	@Test
	public void testGetAllComments() {
		CommentDAO cd = new CommentDAO();
		try {
			Comment test_comment = new Comment("testSnippetId", "testCommentId", "testCommentText", 0, 0, 1, 1);
			cd.createComment(test_comment);
			Comment test_comment_two = new Comment("testSnippetId", "testComment2Id", "test2CommentText", 0, 0, 1, 1);
			cd.createComment(test_comment_two);
			
			// Get all comments
	    	List<Comment> allComments = cd.getAllComments("testSnippetId");

			boolean hasTestComment1 = false;
			boolean hasTestComment2 = false;
			for (Comment c : allComments) {
				if (c.snippetID.equals("testSnippetId")) { 
					if(c.commentID.contentEquals("testCommentId")) { hasTestComment1 = true; } 
					else if(c.commentID.contentEquals("testComment2Id")){ hasTestComment2 = true;}
				}
			}

			assertTrue(hasTestComment1);
			assertTrue(hasTestComment2);
	    	assertTrue(cd.deleteCommentSnippetID("testSnippetId"));
			
		} catch (Exception e) {
			fail ("couldn't list all comments: " + e.getMessage());
		}
		
	}
}
