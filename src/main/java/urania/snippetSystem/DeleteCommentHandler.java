package urania.snippetSystem;

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.LambdaLogger;
import com.amazonaws.services.lambda.runtime.RequestHandler;

import urania.snippetSystem.db.CommentDAO;
import urania.snippetSystem.http.DeleteCommentRequest;
import urania.snippetSystem.http.DeleteCommentResponse;

public class DeleteCommentHandler implements RequestHandler<DeleteCommentRequest, DeleteCommentResponse> {
    
    LambdaLogger logger;
    
    boolean deleteComment (String commentID) throws Exception {
        if (logger != null) { logger.log("in deleteComment"); }
        CommentDAO dao = new CommentDAO();

        if (dao.deleteComment(commentID)) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public DeleteCommentResponse handleRequest(DeleteCommentRequest req, Context context) {
        logger = context.getLogger();
        logger.log("Trying to create a new comment!");
        logger.log(req.toString());

        DeleteCommentResponse response;
        try {
            boolean success = deleteComment(req.commentID);
            
            if (success) {
              response = new DeleteCommentResponse(req.commentID);
            } else {
                response = new DeleteCommentResponse(400);
            }
        } catch (Exception e) {
            response = new DeleteCommentResponse("Unable to delete a comment (" + (e.getMessage() + ")."), 400);
        }

        return response;
    }
}
