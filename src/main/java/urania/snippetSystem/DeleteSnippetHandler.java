package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.DeleteSnippetRequest;
import urania.snippetSystem.http.DeleteSnippetResponse;

public class DeleteSnippetHandler implements RequestHandler<DeleteSnippetRequest, DeleteSnippetResponse> {
	
	LambdaLogger logger;
	
	boolean deleteSnippet (String uuid) throws Exception {
		if (logger != null) { logger.log("in deleteSnippet"); }
		SnippetDAO dao = new SnippetDAO();
		
		return dao.deleteSnippet(uuid);
	}
	
	boolean deleteComments (String uuid) throws Exception {
		if (logger != null) { logger.log("in deleteComments"); }
		CommentDAO dao = new CommentDAO();
		return dao.deleteCommentSnippetID(uuid);
	}

    @Override
    public DeleteSnippetResponse handleRequest(DeleteSnippetRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to delete a new snippet!");
        logger.log(req.toString());

        DeleteSnippetResponse response;
        try {
        	if (deleteSnippet(req.id)) {
        		deleteComments(req.id);
        		response = new DeleteSnippetResponse(req.id);
        	} else {
        		response = new DeleteSnippetResponse(400);
        	}
        } catch (Exception e) {
        	response = new DeleteSnippetResponse("Unable to delete a new snippet (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }

}
