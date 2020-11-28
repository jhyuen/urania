package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import com.google.gson.Gson;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.DeleteCommentRequest;
import urania.snippetSystem.http.DeleteCommentResponse;
import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class DeleteCommentHandlerTest extends LambdaTest {

    DeleteCommentResponse testSuccessInput(String incoming) throws IOException {
        DeleteCommentHandler handler = new DeleteCommentHandler();
        DeleteCommentRequest req = new Gson().fromJson(incoming, DeleteCommentRequest.class);

        DeleteCommentResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(201, resp.httpCode);
        return resp;
    }

    void testFailInput(String incoming, int failureCode) throws IOException {
        DeleteCommentHandler handler = new DeleteCommentHandler();
        DeleteCommentRequest req = new Gson().fromJson(incoming, DeleteCommentRequest.class);

        DeleteCommentResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    
    @Test public void testShouldBeOk () {
        // create 2 comments
        CommentDAO cd = new CommentDAO();
        Comment comment = new Comment("testSnippet", "testComment", "this is a test", 0, 0, 1, 1);
        Comment comment2 = new Comment("testSnippet", "testComment2", "this is a test2", 0, 0, 1, 1);
                
        try {
            cd.createComment(comment);
            cd.createComment(comment2);
        } catch (Exception e) {
            Assert.fail("Create comment failed:" + e.getMessage());
        }
        
        // delete comment 1
        DeleteCommentRequest dcr = new DeleteCommentRequest("testSnippet", "testComment");
        String SAMPLE_INPUT_STRING = new Gson().toJson(dcr);
        
        DeleteCommentResponse response = null;
        try {
            response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        Assert.assertEquals(1, response.list.size());
        
        // delete comment 2
        dcr = new DeleteCommentRequest("testSnippet", "testComment2");
        SAMPLE_INPUT_STRING = new Gson().toJson(dcr);
        
        try {
            response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        Assert.assertEquals(0, response.list.size());
    }
    
    @Test public void testExtra() {
        CommentDAO cd = new CommentDAO();
        Comment comment = new Comment("testSnippet", "testComment", "this is a test", 0, 0, 1, 1);
                
        try {
            cd.createComment(comment);
        } catch (Exception e) {
            Assert.fail("Create comment failed:" + e.getMessage());
        }

        String SAMPLE_INPUT_STRING = "{\"snippetID\": \"testSnippet\", \"commentID\": \"testComment\", \"nonsence\": 0}";

        try {
            testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) { 
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }

    @Test
    public void testNothing() {
        String SAMPLE_INPUT_STRING = new Gson().toJson(new DeleteCommentRequest());

        try {
            testFailInput(SAMPLE_INPUT_STRING, 400);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }

    @Test public void testBadJson() { 
        String SAMPLE_INPUT_STRING = "{\"sdsd\": \"e3\", \"hgfgdfgdfg\": \"this is not a number\"}";

        try {
            testFailInput(SAMPLE_INPUT_STRING, 400); }
        catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
}
