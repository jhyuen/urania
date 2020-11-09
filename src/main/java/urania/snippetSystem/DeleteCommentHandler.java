package urania.snippetSystem;

import java.util.List;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.db.SnippetDAO;
import urania.snippetSystem.http.DeleteCommentRequest;
import urania.snippetSystem.http.DeleteCommentResponse;
import urania.snippetSystem.model.Comment;
import urania.snippetSystem.model.Snippet;

public class DeleteCommentHandler implements RequestHandler<DeleteCommentRequest, DeleteCommentResponse> {
    
    LambdaLogger logger;
    
    boolean deleteComment (String commentID) throws Exception {
        if (logger != null) { logger.log("in deleteComment"); }
        CommentDAO dao = new CommentDAO();

        if (dao.deleteCommentCommentID(commentID)) {
            return true;
        } else {
            return false;
        }
    }

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
    public DeleteCommentResponse handleRequest(DeleteCommentRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to delete a comment!");
        logger.log(req.toString());

        DeleteCommentResponse response;
        try {
            boolean success = deleteComment(req.commentID);
            
            if (success) {
            	Snippet snippet = getSnippet(req.snippetID);
            	List<Comment> comments = getComments(req.snippetID);
            	response = new DeleteCommentResponse(snippet, comments);
            } else {
                response = new DeleteCommentResponse(400);
            }
        } catch (Exception e) {
            response = new DeleteCommentResponse("Unable to delete a comment (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }
}
