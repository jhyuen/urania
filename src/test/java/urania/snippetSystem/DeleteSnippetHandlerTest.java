package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import com.google.gson.Gson;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.DeleteCommentRequest;
import urania.snippetSystem.http.DeleteCommentResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;
import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class DeleteSnippetHandlerTest extends LambdaTest {

    DeleteSnippetResponse testSuccessInput(String incoming) throws IOException {
        DeleteSnippetHandler handler = new DeleteSnippetHandler();
        DeleteSnippetRequest req = new Gson().fromJson(incoming, DeleteSnippetRequest.class);

        DeleteSnippetResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(200, resp.httpCode);
        return resp;
    }

    void testFailInput(String incoming, int failureCode) throws IOException {
        DeleteSnippetHandler handler = new DeleteSnippetHandler();
        DeleteSnippetRequest req = new Gson().fromJson(incoming, DeleteSnippetRequest.class);

        DeleteSnippetResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    
    @Test public void testShouldBeOk () {
        // create a test snippet
        SnippetDAO sd = new SnippetDAO() ;
        Snippet snippet = new Snippet("test_snippetId");
        try {
            sd.createSnippet(snippet);
        } catch (Exception ioe) {
            Assert.fail("Create snippet failed:" + ioe.getMessage());
        }
        
        // delete snippet
        DeleteSnippetRequest dsr = new DeleteSnippetRequest("test_snippetId");
        String SAMPLE_INPUT_STRING = new Gson().toJson(dsr);
        
        DeleteSnippetResponse response = null;
        try {
            response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
    
    @Test public void testExtra() {
        // create a test snippet
        SnippetDAO sd = new SnippetDAO() ;
        Snippet snippet = new Snippet("test_snippetId");
        try {
            sd.createSnippet(snippet);
        } catch (Exception ioe) {
            Assert.fail("Create snippet failed:" + ioe.getMessage());
        }

        String SAMPLE_INPUT_STRING = "{\"id\": \"test_snippetId\", \"nonsence\": 0}";

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
