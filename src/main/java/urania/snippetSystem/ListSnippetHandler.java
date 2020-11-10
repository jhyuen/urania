package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.ListSnippetRequest;
import urania.snippetSystem.http.ListSnippetResponse;
import urania.snippetSystem.model.Snippet;

import java.util.List;

public class ListSnippetHandler implements RequestHandler<ListSnippetRequest, ListSnippetResponse> {
	
	LambdaLogger logger;
	
	List<Snippet> getAllSnippets () throws Exception {
		if (logger != null) { logger.log("in getAllSnippets"); }
		SnippetDAO dao = new SnippetDAO();
		return dao.getAllSnippets();
	}

    @Override
    public ListSnippetResponse handleRequest(ListSnippetRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to list all snippets!");
        logger.log(req.toString());

        ListSnippetResponse response;
        try {
        	List<Snippet> snippets = getAllSnippets();
			response = new ListSnippetResponse(snippets);
        } catch (Exception e) {
        	response = new ListSnippetResponse("Unable to get all snippets (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }


}
