package urania.snippetSystem;

import java.io.IOException;

import org.junit.Assert;
import org.junit.BeforeClass;
import org.junit.Test;

import com.amazonaws.services.lambda.runtime.Context;
import com.google.gson.Gson;

import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;
import urania.snippetSystem.model.Snippet;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class CreateSnippetHandlerTest extends LambdaTest {

    CreateSnippetResponse testSuccessInput(String incoming) throws IOException {
    	CreateSnippetHandler handler = new CreateSnippetHandler();
    	CreateSnippetRequest req = new Gson().fromJson(incoming, CreateSnippetRequest.class);
       
        CreateSnippetResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(201, resp.httpCode);
        return resp;
    }
	
    void testFailInput(String incoming, int failureCode) throws IOException {
    	CreateSnippetHandler handler = new CreateSnippetHandler();
    	CreateSnippetRequest req = new Gson().fromJson(incoming, CreateSnippetRequest.class);

    	CreateSnippetResponse resp = handler.handleRequest(req, createContext("create"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    private static Object input;

    @Test
    public void testShouldBeOk () {
        CreateSnippetRequest csr = new CreateSnippetRequest();
        String SAMPLE_INPUT_STRING = new Gson().toJson(csr);
        
        CreateSnippetResponse response = null;
        try {
        	response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        DeleteSnippetRequest dsr = new DeleteSnippetRequest(response.snippetId);
        DeleteSnippetResponse d_resp = new DeleteSnippetHandler().handleRequest(dsr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 200);
    }
    
    @Test
    public void testExtraInput() {
		String SAMPLE_INPUT_STRING = "{\"sdsd\": \"e3\", \"hgfgdfgdfg\": \"this is not a number\"}";
        
        CreateSnippetResponse response = null;
        try {
        	response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        DeleteSnippetRequest dsr = new DeleteSnippetRequest(response.snippetId);
        DeleteSnippetResponse d_resp = new DeleteSnippetHandler().handleRequest(dsr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 200);
    }
}
