package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.GetSnippetRequest;
import urania.snippetSystem.http.GetSnippetResponse;
import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

import java.util.List;

public class GetSnippetHandler implements RequestHandler<GetSnippetRequest, GetSnippetResponse> {
	
	LambdaLogger logger;
	
	Snippet getSnippet (String uuid) throws Exception {
		if (logger != null) { logger.log("in getSnippet"); }
		SnippetDAO dao = new SnippetDAO();
		return dao.getSnippet(uuid);
	}
	
	List<Comment> getComments (String uuid) throws Exception {
		if (logger != null) { logger.log("in getComments"); }
		CommentDAO dao = new CommentDAO();
		return dao.getAllComments(uuid);
	}

    @Override
    public GetSnippetResponse handleRequest(GetSnippetRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to get a new snippet!");
        logger.log(req.toString());

        GetSnippetResponse response;
        try {
        	Snippet snippet = getSnippet(req.SnippetID);
        	if (snippet != null) {
        		List<Comment> comments = getComments(req.SnippetID);
				response = new GetSnippetResponse(snippet, comments);
        	} else {
        		response = new GetSnippetResponse(422);
        	}
        } catch (Exception e) {
        	response = new GetSnippetResponse("Unable to get a new snippet (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }


}
