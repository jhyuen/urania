package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.UpdateSnippetInfoRequest;
import urania.snippetSystem.http.UpdateSnippetInfoResponse;
import urania.snippetSystem.model.Snippet;

public class UpdateSnippetInfoHandler implements RequestHandler<UpdateSnippetInfoRequest, UpdateSnippetInfoResponse> {
	
	LambdaLogger logger;
	Boolean updateSnippetInfo (String uuid, String info) throws Exception {
		if (logger != null) { logger.log("in updateSnippetInfo"); }
		SnippetDAO dao = new SnippetDAO();
		
		// check if generated snippet UUID exists
		Snippet exist = dao.getSnippet(uuid);
		if (exist == null) {
			return false;
		} else {
			return dao.updateSnippetInfo(uuid, info);
		}
	}

    @Override
    public UpdateSnippetInfoResponse handleRequest(UpdateSnippetInfoRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to create a new snippet!");
        logger.log(req.toString());

        UpdateSnippetInfoResponse response;
        try {
        	if (updateSnippetInfo(req.id, req.info)) {
				response = new UpdateSnippetInfoResponse(req.id);
        	} else {
        		response = new UpdateSnippetInfoResponse(400);
        	}
        } catch (Exception e) {
        	response = new UpdateSnippetInfoResponse("Unable to update snippet (" + (e.getMessage() + ")."), 400);
        }
        return response;
    }	
	
}
