package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.kinesis.model.EnableEnhancedMonitoringRequest;
import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;

import urania.snippetSystem.GetSnippetHandler;
import urania.snippetSystem.ListSnippetHandler;
import urania.snippetSystem.UpdateSnippetInfoHandler;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.CreateCommentRequest;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;
import urania.snippetSystem.http.EnableSnippetPasswordRequest;
import urania.snippetSystem.http.EnableSnippetPasswordResponse;
import urania.snippetSystem.http.GetSnippetRequest;
import urania.snippetSystem.http.GetSnippetResponse;
import urania.snippetSystem.http.ListSnippetRequest;
import urania.snippetSystem.http.ListSnippetResponse;
import urania.snippetSystem.http.UpdateSnippetInfoRequest;
import urania.snippetSystem.http.UpdateSnippetInfoResponse;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class EnableSnippetPasswordHandlerTest extends LambdaTest {

    EnableSnippetPasswordResponse testSuccessInput(String incoming) throws IOException {
        EnableSnippetPasswordHandler handler = new EnableSnippetPasswordHandler();
        EnableSnippetPasswordRequest req = new Gson().fromJson(incoming, EnableSnippetPasswordRequest.class);
       
        EnableSnippetPasswordResponse resp = handler.handleRequest(req, createContext("update"));
        Assert.assertEquals(200, resp.httpCode);
        return resp;
    }
    
    void testFailInput(String incoming, int failureCode) throws IOException {
        EnableSnippetPasswordHandler handler = new EnableSnippetPasswordHandler();
        EnableSnippetPasswordRequest req = new Gson().fromJson(incoming, EnableSnippetPasswordRequest.class);

        EnableSnippetPasswordResponse resp = handler.handleRequest(req, createContext("update"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }

    @Test
    public void testShouldBeOk () {
        // create a test snippet
        SnippetDAO sd = new SnippetDAO() ;
        Snippet snippet = new Snippet("test_snippetId");
        try {
            sd.createSnippet(snippet);
        } catch (Exception ioe) {
            Assert.fail("Create snippet failed:" + ioe.getMessage());
        }

        // enable password
        EnableSnippetPasswordRequest gsr = new EnableSnippetPasswordRequest("test_snippetId", true);
        String SAMPLE_INPUT_STRING = new Gson().toJson(gsr);

        EnableSnippetPasswordResponse response = null;
        
        try {
            response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        Assert.assertEquals(response.response, "Updated snippet password selection for ID: test_snippetId");
        
        DeleteSnippetRequest dsr = new DeleteSnippetRequest("test_snippetId");
        DeleteSnippetResponse d_resp = new DeleteSnippetHandler().handleRequest(dsr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 200);
    }
    
    @Test
    public void testExtraInput() {
        String SAMPLE_INPUT_STRING = "{\"id\": \"test_snippetId\", \"enable\": true, \"hgfgdfgdfg\": \"this is not a number\"}";
        
        SnippetDAO sd = new SnippetDAO() ;
        Snippet snippet = new Snippet("test_snippetId");
        
        try {
            sd.createSnippet(snippet);
        } catch (Exception ioe) {
            Assert.fail("Create snippet failed:" + ioe.getMessage());
        }
        
        EnableSnippetPasswordResponse response = null;
        
        try {
            response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        Assert.assertEquals(response.response, "Updated snippet password selection for ID: test_snippetId");
        
        DeleteSnippetRequest dsr = new DeleteSnippetRequest("test_snippetId");
        DeleteSnippetResponse d_resp = new DeleteSnippetHandler().handleRequest(dsr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 200);
    }
    
    @Test
    public void testNothing() {
        UpdateSnippetInfoRequest gsr = new UpdateSnippetInfoRequest();
        String SAMPLE_INPUT_STRING = new Gson().toJson(gsr);
        
        try {
            testFailInput(SAMPLE_INPUT_STRING, 400);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
    
    @Test
    public void testBadJson() {
        String SAMPLE_INPUT_STRING = "{\"fasdfasdf\": \"fsdfdf\", \"hgfgdfgdfg\": \"this is not a number\"}";
        
        try {
            testFailInput(SAMPLE_INPUT_STRING, 400);
        } catch (IOException ioe) {
            Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
}
