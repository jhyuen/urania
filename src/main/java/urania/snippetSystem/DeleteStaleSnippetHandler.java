package urania.snippetSystem;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.DeleteStaleSnippetRequest;
import urania.snippetSystem.http.DeleteStaleSnippetResponse;
import urania.snippetSystem.model.Snippet;

public class DeleteStaleSnippetHandler implements RequestHandler<DeleteStaleSnippetRequest, DeleteStaleSnippetResponse> {
	
	LambdaLogger logger;
	
	List<String> deleteStaleSnippet (int daysOld) throws Exception {
		if (logger != null) { logger.log("in deleteStaleSnippet"); }
		SnippetDAO dao = new SnippetDAO();
		return dao.deleteStaleSnippet(daysOld);
	}
	
	boolean deleteStaleComments (List<String> snippetIds) throws Exception {
		if (logger != null) { logger.log("in deleteStaleComments"); }
		CommentDAO dao = new CommentDAO();
		return dao.deleteStaleSnippetComments(snippetIds);
	}
	
	List<Snippet> getRemainingSnippets() throws Exception {
		if (logger != null) { logger.log("in getRemainingSnippets"); }
		SnippetDAO dao = new SnippetDAO();
		return dao.getAllSnippets();
	}

    @Override
    public DeleteStaleSnippetResponse handleRequest(DeleteStaleSnippetRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to delete stale snippets!");
        logger.log(req.toString());

        DeleteStaleSnippetResponse response;
        try {
        	if (deleteStaleComments(deleteStaleSnippet(req.daysOld))) {
        		List<Snippet> remainingSnippets = getRemainingSnippets(); 
        		response = new DeleteStaleSnippetResponse(String.valueOf(req.daysOld), remainingSnippets);
        	} else {
        		response = new DeleteStaleSnippetResponse(400);
        	}
        } catch (Exception e) {
        	response = new DeleteStaleSnippetResponse("Unable to delete stale snippets (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }

}
