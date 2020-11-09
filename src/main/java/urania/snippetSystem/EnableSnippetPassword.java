package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.EnableSnippetPasswordRequest;
import urania.snippetSystem.http.EnableSnippetPasswordResponse;
import urania.snippetSystem.model.Snippet;

public class EnableSnippetPassword implements RequestHandler<EnableSnippetPasswordRequest, EnableSnippetPasswordResponse> {
	
	LambdaLogger logger;
	
	Boolean enableSnippetPassword (String uuid, boolean enable) throws Exception {
		if (logger != null) { logger.log("in enableSnippetPassword"); }
		SnippetDAO dao = new SnippetDAO();
		
		// check if snippet UUID does not exist
		Snippet exist = dao.getSnippet(uuid);
		if (exist == null) {
			return false;
		} else {
			return dao.enableSnippetPassword(uuid, enable);
		}
	}

    @Override
    public EnableSnippetPasswordResponse handleRequest(EnableSnippetPasswordRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to create a new snippet!");
        logger.log(req.toString());

        EnableSnippetPasswordResponse response;
        try {
        	if (enableSnippetPassword(req.id, req.enable)) {
				response = new EnableSnippetPasswordResponse(req.id);
        	} else {
        		response = new EnableSnippetPasswordResponse(400);
        	}
        } catch (Exception e) {
        	response = new EnableSnippetPasswordResponse("Unable to update snippet (" + (e.getMessage() + ")."), 400);
        }
        return response;
    }

}
