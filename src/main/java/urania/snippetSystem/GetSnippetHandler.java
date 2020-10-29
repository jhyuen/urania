package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.http.GetSnippetRequest;
import urania.snippetSystem.http.GetSnippetResponse;
import urania.snippetSystem.model.Snippet;

import java.util.UUID;

public class GetSnippetHandler implements RequestHandler<GetSnippetRequest, GetSnippetResponse> {
	
	LambdaLogger logger;
	
	Snippet getSnippet (String uuid) throws Exception {
		if (logger != null) { logger.log("in getSnippet"); }
		SnippetDAO dao = new SnippetDAO();
		
		// check if snippet UUID exists
		return dao.getSnippet(uuid);
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
				response = new GetSnippetResponse(snippet);
        	} else {
        		response = new GetSnippetResponse(422);
        	}
        } catch (Exception e) {
        	response = new GetSnippetResponse("Unable to get a new snippet (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }


}
