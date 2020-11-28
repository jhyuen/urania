package urania.snippetSystem;

import java.io.IOException;
import java.sql.PreparedStatement;

import org.junit.Assert;
import org.junit.Test;

import com.google.gson.Gson;

import urania.snippetSystem.CreateCommentHandler;
import urania.snippetSystem.CreateSnippetHandler;
import urania.snippetSystem.DeleteSnippetHandler;
import urania.snippetSystem.db.DatabaseUtil;
import urania.snippetSystem.http.CreateCommentRequest;
import urania.snippetSystem.http.CreateCommentResponse;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.DeleteCommentRequest;
import urania.snippetSystem.http.DeleteCommentResponse;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;
import urania.snippetSystem.http.DeleteStaleSnippetRequest;
import urania.snippetSystem.http.DeleteStaleSnippetResponse;

/**
 * A simple test harness for locally invoking your Lambda function handler.
 */
public class DeleteStaleSnippetHandlerTest extends LambdaTest {
	
	DeleteStaleSnippetResponse testSuccessInput(String incoming) throws IOException {
    	DeleteStaleSnippetHandler handler = new DeleteStaleSnippetHandler();
    	DeleteStaleSnippetRequest req = new Gson().fromJson(incoming, DeleteStaleSnippetRequest.class);
       
    	DeleteStaleSnippetResponse resp = handler.handleRequest(req, createContext("delete"));
        Assert.assertEquals(200, resp.httpCode);
        
        // should test for remaining snippets...
        
        return resp;
    }
	
    void testFailInput(String incoming, int failureCode) throws IOException {
    	DeleteStaleSnippetHandler handler = new DeleteStaleSnippetHandler();
    	DeleteStaleSnippetRequest req = new Gson().fromJson(incoming, DeleteStaleSnippetRequest.class);

    	DeleteStaleSnippetResponse resp = handler.handleRequest(req, createContext("delete"));
        Assert.assertEquals(failureCode, resp.httpCode);
    }
    
    private static Object input;

    @Test
    public void testShouldBeOk () {
    	// make old snippets
    	
    	
    	PreparedStatement insertSnippets = conn.prepareStatement("SELECT snippetId FROM " + tblName + " WHERE timeStamp < ?;");
    	
    	double daysOld = C; 
    	String daysOld = "";
        String SAMPLE_INPUT_STRING = String.format("{\"daysOld\": %s }", daysOld);
        
        DeleteStaleSnippetResponse response = null;
        try {
        	response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
    }
    
    @Test
    public void testExtra() {
		String SAMPLE_INPUT_STRING = "{\"snippetID\": \"testSnippet\", \"commentText\": \"this is a test\", \"startLine\": 0, \"startIndex\": 0, \"endLine\": 1, \"endIndex\": 1, \"extraThing\": 7 }";
        
        CreateCommentResponse response = null;
        try {
        	response = testSuccessInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        DeleteCommentRequest dcr = new DeleteCommentRequest(response.list.get(0).snippetID, response.list.get(0).commentID);
        DeleteCommentResponse d_resp = new DeleteCommentHandler().handleRequest(dcr, createContext("delete"));
        Assert.assertEquals(d_resp.httpCode, 200);
    }
    
    @Test
    public void testBadJson() {
		String SAMPLE_INPUT_STRING = "{\"sdsd\": \"e3\", \"hgfgdfgdfg\": \"this is not a number\"}";
        
        CreateCommentResponse response = null;
        try {
        	testFailInput(SAMPLE_INPUT_STRING);
        } catch (IOException ioe) {
        	Assert.fail("Invalid:" + ioe.getMessage());
        }
        
        Assert.assertEquals(response.httpCode, 400);
    }
}
