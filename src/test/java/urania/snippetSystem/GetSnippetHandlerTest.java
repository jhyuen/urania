package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;

import urania.snippetSystem.GetSnippetHandler;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.CreateCommentRequest;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;
import urania.snippetSystem.http.GetSnippetRequest;
import urania.snippetSystem.http.GetSnippetResponse;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class GetSnippetHandlerTest extends LambdaTest {

    GetSnippetResponse testSuccessInput(String incoming) throws IOException {
    	GetSnippetHandler handler = new GetSnippetHandler();
    	GetSnippetRequest req = new Gson().fromJson(incoming, GetSnippetRequest.class);
       
        GetSnippetResponse resp = handler.handleRequest(req, createContext("get"));
        Assert.assertEquals(201, resp.httpCode);
        return resp;
    }
	
    void testFailInput(String incoming, int failureCode) throws IOException {
    	GetSnippetHandler handler = new GetSnippetHandler();
    	GetSnippetRequest req = new Gson().fromJson(incoming, GetSnippetRequest.class);

    	GetSnippetResponse resp = handler.handleRequest(req, createContext("get"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    private static Object input;

    @Test
    public void testShouldBeOk () {
    	GetSnippetRequest gsr = new GetSnippetRequest("test_snippetId");
        String SAMPLE_INPUT_STRING = new Gson().toJson(gsr);
        
        SnippetDAO sd = new SnippetDAO() ;
        Snippet snippet = new Snippet("test_snippetId");
		try {
			sd.createSnippet(snippet);
		} catch (Exception ioe) {
        	Assert.fail("Create snippet failed:" + ioe.getMessage());
		}
		
        try {
        	testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
    
    @Test
    public void testExtraInput() {
		String SAMPLE_INPUT_STRING = "{\"snippetID\": \"test_snippedId\", \"hgfgdfgdfg\": \"this is not a number\"}";
        
		SnippetDAO sd = new SnippetDAO() ;
        Snippet snippet = new Snippet("test_snippetId");
		try {
			sd.createSnippet(snippet);
		} catch (Exception ioe) {
        	Assert.fail("Create snippet failed:" + ioe.getMessage());
		}
		
        try {
        	testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
    
    @Test
    public void testNothing() {
        String SAMPLE_INPUT_STRING = new Gson().toJson(new GetSnippetRequest());

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
