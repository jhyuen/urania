package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.Test;

import com.google.gson.Gson;

import urania.snippetSystem.CreateCommentHandler;
import urania.snippetSystem.CreateSnippetHandler;
import urania.snippetSystem.DeleteSnippetHandler;
import urania.snippetSystem.http.CreateCommentRequest;
import urania.snippetSystem.http.CreateCommentResponse;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.DeleteCommentRequest;
import urania.snippetSystem.http.DeleteCommentResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class CreateCommentHandlerTest extends LambdaTest {

    CreateCommentResponse testSuccessInput(String incoming) throws IOException {
        CreateCommentHandler handler = new CreateCommentHandler();
        CreateCommentRequest req = new Gson().fromJson(incoming, CreateCommentRequest.class);

        CreateCommentResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(201, resp.httpCode);
        return resp;
    }

    void testFailInput(String incoming, int failureCode) throws IOException {
        CreateCommentHandler handler = new CreateCommentHandler();
        CreateCommentRequest req = new Gson().fromJson(incoming, CreateCommentRequest.class);

        CreateCommentResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    // private static Object input;

    
    @Test public void testShouldBeOk () {
        CreateCommentRequest csr = new CreateCommentRequest("testSnippet", "this is a test", 0, 0, 1, 1);
        String SAMPLE_INPUT_STRING = new Gson().toJson(csr);
        
        CreateCommentResponse response = null;
        try {
            response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        DeleteCommentRequest dcr = new
        DeleteCommentRequest(response.list.get(0).snippetID,
        response.list.get(0).commentID); DeleteCommentResponse d_resp = new DeleteCommentHandler().handleRequest(dcr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 201);
    }
    
    
    @Test public void testExtra() {
        String SAMPLE_INPUT_STRING = "{\"snippetID\": \"testSnippet\", \"commentText\": \"this is a test\", \"startLine\": 0, \"startIndex\": 0, \"endLine\": 1, \"endIndex\": 1, \"extraThing\": 7 }";
    
        CreateCommentResponse response = null;
        try { response = testSuccessInput(SAMPLE_INPUT_STRING); }
        catch (IOException ioe) { Assert.fail("Invalid:" + ioe.getMessage()); }
        
        DeleteCommentRequest dcr = new
        DeleteCommentRequest(response.list.get(0).snippetID,
        response.list.get(0).commentID); DeleteCommentResponse d_resp = new DeleteCommentHandler().handleRequest(dcr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 201);
    }

    @Test
    public void testNothing() {
        String SAMPLE_INPUT_STRING = new Gson().toJson(new CreateCommentRequest());

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
