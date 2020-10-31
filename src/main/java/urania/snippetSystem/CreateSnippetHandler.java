package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.CreateSnippetRequest;
import urania.snippetSystem.http.CreateSnippetResponse;
import urania.snippetSystem.model.Snippet;

import java.util.UUID;

public class CreateSnippetHandler implements RequestHandler<CreateSnippetRequest, CreateSnippetResponse> {
	
	LambdaLogger logger;
	
	Snippet createSnippet () throws Exception {
		if (logger != null) { logger.log("in createSnippet"); }
		SnippetDAO dao = new SnippetDAO();
		
		// check if generated snippet UUID exists
		String newUUID = UUID.randomUUID().toString();
		Snippet exist = dao.getSnippet(newUUID);
		if (exist == null) {
			Snippet snippet = new Snippet(newUUID);
			if (dao.createSnippet(snippet)) {
				return snippet;
			} else {
				return null;
			}
			//return dao.createSnippet(snippet);
		} else {
			return null;
		}
	}

    @Override
    public CreateSnippetResponse handleRequest(CreateSnippetRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to create a new snippet!");
        logger.log(req.toString());

        CreateSnippetResponse response;
        try {
        	Snippet snippet = createSnippet();
        	if (snippet != null) {
        	  response = new CreateSnippetResponse(snippet);
        	} else {
        		response = new CreateSnippetResponse(422);
        	}
        } catch (Exception e) {
        	response = new CreateSnippetResponse("Unable to create a new snippet (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }

}
