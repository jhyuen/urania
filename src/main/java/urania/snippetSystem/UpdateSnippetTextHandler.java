package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.UpdateSnippetInfoRequest;
import urania.snippetSystem.http.UpdateSnippetInfoResponse;
import urania.snippetSystem.http.UpdateSnippetTextRequest;
import urania.snippetSystem.http.UpdateSnippetTextResponse;
import urania.snippetSystem.model.Snippet;

import java.util.UUID;

public class UpdateSnippetTextHandler implements RequestHandler<UpdateSnippetTextRequest, UpdateSnippetTextResponse> {
	
	LambdaLogger logger;
	
	Boolean updateSnippetText (String uuid, String text) throws Exception {
		if (logger != null) { logger.log("in updateSnippetText"); }
		SnippetDAO dao = new SnippetDAO();
		
		// check if generated snippet UUID exists
		Snippet exist = dao.getSnippet(uuid);
		if (exist == null) {
			return false;
		} else {
			return dao.updateSnippetText(uuid, text);
		}
	}

    @Override
    public UpdateSnippetTextResponse handleRequest(UpdateSnippetTextRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to create a new snippet!");
        logger.log(req.toString());

        UpdateSnippetTextResponse response;
        try {
        	if (updateSnippetText(req.id, req.text)) {
				response = new UpdateSnippetTextResponse(req.id);
        	} else {
        		response = new UpdateSnippetTextResponse(400);
        	}
        } catch (Exception e) {
        	response = new UpdateSnippetTextResponse("Unable to update snippet (" + (e.getMessage() + ")."), 400);
        }
        return response;
    }


}
