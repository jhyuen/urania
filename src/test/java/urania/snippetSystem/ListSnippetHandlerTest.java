package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;

import urania.snippetSystem.GetSnippetHandler;
import urania.snippetSystem.ListSnippetHandler;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.CreateCommentRequest;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;
import urania.snippetSystem.http.GetSnippetRequest;
import urania.snippetSystem.http.GetSnippetResponse;
import urania.snippetSystem.http.ListSnippetRequest;
import urania.snippetSystem.http.ListSnippetResponse;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class ListSnippetHandlerTest extends LambdaTest {

    ListSnippetResponse testSuccessInput(String incoming) throws IOException {
    	ListSnippetHandler handler = new ListSnippetHandler();
    	ListSnippetRequest req = new Gson().fromJson(incoming, ListSnippetRequest.class);
       
        ListSnippetResponse resp = handler.handleRequest(req, createContext("get"));
        Assert.assertEquals(201, resp.httpCode);
        return resp;
    }
	
    void testFailInput(String incoming, int failureCode) throws IOException {
    	ListSnippetHandler handler = new ListSnippetHandler();
    	ListSnippetRequest req = new Gson().fromJson(incoming, ListSnippetRequest.class);

    	ListSnippetResponse resp = handler.handleRequest(req, createContext("get"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    private static Object input;

    @Test
    public void testShouldBeOk () {
    	ListSnippetRequest gsr = new ListSnippetRequest();
        String SAMPLE_INPUT_STRING = new Gson().toJson(gsr);
        
        try {
        	testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
    
    @Test
    public void testExtraInput() {
		String SAMPLE_INPUT_STRING = "{\"snippetID\": \"test_snippedId\", \"hgfgdfgdfg\": \"this is not a number\"}";
		
        try {
        	testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
}
