package urania.snippetSystem;

import java.util.UUID;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.http.CreateCommentRequest;
import urania.snippetSystem.http.CreateCommentResponse;
import urania.snippetSystem.model.Comment;

public class CreateCommentHandler implements RequestHandler<CreateCommentRequest, CreateCommentResponse> {
	
	LambdaLogger logger;
	
	Comment createComment (String snippetID, String commentText, int sL, int sI, int eL, int eI) throws Exception {
		if (logger != null) { logger.log("in createComment"); }
		CommentDAO dao = new CommentDAO();
		
		// check if generated snippet UUID exists
		String newUUID = UUID.randomUUID().toString();
		Comment exist = dao.getComment(newUUID);
		if (exist == null) {
		  Comment comment = new Comment(snippetID, newUUID, commentText,  sL, sI, eL, eI);
			if (dao.createComment(comment)) {
				return comment;
			} else {
				return null;
			}
			//return dao.createSnippet(snippet);
		} else {
			return null;
		}
	}

    @Override
    public CreateCommentResponse handleRequest(CreateCommentRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to create a new comment!");
        logger.log(req.toString());

        CreateCommentResponse response;
        try {
        	Comment comment = createComment(req.snippetID, req.commentText, req.startLine, req.startIndex, req.endLine, req.endIndex);
        	if (comment != null) {
        	  response = new CreateCommentResponse(comment);
        	} else {
        		response = new CreateCommentResponse(422);
        	}
        } catch (Exception e) {
        	response = new CreateCommentResponse("Unable to create a new comment (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }

}
